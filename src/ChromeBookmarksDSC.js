import DataSourceConnector from './DataSourceConnector'
import Const from './constants'
import DataStore from './DataStore'
import Util from './Util'

const electron = window.require('electron').remote
const dialog = electron.dialog
const path = require('path')
const fs = electron.require('fs')
const BrowserWindow = electron.BrowserWindow

class ChromeBookmarksDSC extends DataSourceConnector {
    name
    _id
    bookmarksLocation
    browserWindow

    constructor(config) {
        super()

        if (config) {
            this.name = config.name
            this._id = config._id
            this.bookmarksLocation = config.customData.bookmarksLocation
        }
    }

    async configureDataSource() {
        const defaultPath = path.join(electron.app.getPath('home'), "/Library/Application Support/Google/Chrome/Default")
        const result = await dialog.showOpenDialog({ title: "Select Chrome bookmarks file", defaultPath, properties: ['openFile'] })
        const selectedPath = result.filePaths[0]

        if (!result.canceled) {
            this.name = "Chrome Bookmarks DS"
            this._id = Util.idFromPath(selectedPath)
            this.bookmarksLocation = selectedPath

            return true
        } else {

            return false
        }
    }

    async pullLatest() {    
        return await this.importChromeBookmarkData()
    }

    getName() {
        return this.name
    }

    async handleJob(job) {
        await this.copyWebResource(job)
    }

    handleQueueEmptiedEvent() {
        if (this.browserWindow) {
            this.browserWindow.destroy()
            this.browserWindow = null
        }
    }

    async handleMemChanges(addedMems, removedMems) {
        /**
         * Job object format:
         * {_id: string, dataSourceId: string, priority: number, customData: object}
         */

        // Make a job for each leaf not to capture the web resource it points to
        // as a screenshot and PDF pair
        const jobs = addedMems.filter(mem => mem.isLeaf).map(node => ({ _id: node._id, dataSourceId: this._id, priority: 10, customData: { location: node.location } }))
        await DataStore.addJobs(jobs)
    }

    export() {
        return {name: this.name, _id: this._id, type: Const.DS_TYPE_CHROME, customData: {bookmarksLocation: this.bookmarksLocation}}
    }

    watch() {
        
    }

    importChromeBookmarkData() {
        return fs.promises.readFile(this.bookmarksLocation, { encoding: "utf8" }).then(data => {
            const bookmarksJSON = JSON.parse(data)
            const memNodes = []

            this.processChromeBMNode(bookmarksJSON.roots.bookmark_bar, memNodes)

            return Util.uniq(memNodes, "_id")
        }, error => console.error(error))
    }

    processChromeBMNode(bmNode, memNodes) {
        const memNode = { name: bmNode.name, chrome_guid: bmNode.guid, dataSourceId: this._id }

        if (bmNode.type === "folder") {
            memNode._id = bmNode.guid
            memNode.isLeaf = false
            memNode.children = []
            memNodes.push(memNode)
            if (bmNode.children) {
                bmNode.children.forEach(child => {
                    const childMemNode = this.processChromeBMNode(child, memNodes)
                    memNode.children.push(childMemNode._id)
                    childMemNode.parent = memNode._id
                })
            }
        } else if (bmNode.type === "url") {
            memNode._id = Util.idFromPath(bmNode.url)
            memNode.location = bmNode.url
            memNode.isLeaf = true
            memNodes.push(memNode)
        }

        return memNode
    }

    async copyWebResource(job) {
        // This is a way of avoiding downloading PDFs since they
        // bring up a download prompt if the PDF plugin isn't working
        // correctly. In most Electron versions it does not work correctly.
        // However, as long as it's viable to use a beta version where it
        // is working correctly it should be disabled.
        // if (job.customData.location.endsWith(".pdf")) {
        //     return new Promise((resolve, reject) => resolve())
        // }

        // It's probably best not to reconstruct this for each page we load, however
        // re-constructing the BrowserWindow like this is the only way I've been able 
        // to find that avoids an issue with webContents.printToPDF(...), where it stalls after
        // the first capture. There are known bugs with this Electron feature and its behavior varies across
        // Electron versions. Until the feature is more reliable, it seems like this reconstructing like
        // this will be necessary.
        if (!this.browserWindow || true) {
            this.browserWindow = new BrowserWindow({
                show: false, webPreferences: {
                    plugins: true
                }
            })
        }

        this.browserWindow.webContents.loadURL(job.customData.location)
        this.browserWindow.webContents.audioMuted = true

        return new Promise((resolve, reject) => {
            const errorEvents = ['crashed', 'unresponsive', 'plugin-crashed', 'did-fail-load']
            const finish = () => {
                this.browserWindow.webContents.removeAllListeners('did-finish-load')
                errorEvents.forEach(event => this.browserWindow.webContents.removeAllListeners(event))
                resolve()
            }

            const timeoutCode = setTimeout(() => {
                console.log("web resource copy job timed out: ", job.customData.location)
                finish()
            }, 40000)

            const finishedLoadingHandler = () => {
                this.browserWindow.webContents.capturePage().then(screenshot => {
                    const pngScreenshot = screenshot.toPNG()
                    const thumbPath = path.join(electron.app.getPath("userData"), "/thumbnails")
                    fs.promises.mkdir(thumbPath, { recursive: true }).catch(console.error).then(() => {
                        fs.writeFileSync(path.join(thumbPath, job._id + ".png"), pngScreenshot)

                        const pdfPath = path.join(electron.app.getPath("userData"), "/local-mems")
                        fs.promises.mkdir(pdfPath, { recursive: true }).catch(console.error).then(() => {
                            this.browserWindow.webContents.printToPDF({}).then(pdfData => {
                                fs.writeFileSync(path.join(pdfPath, job._id + ".pdf"), pdfData)
                                clearTimeout(timeoutCode)
                                finish()
                            }).catch(error => console.log(error))
                        })
                    })
                })
            }

            this.browserWindow.webContents.once('did-finish-load', finishedLoadingHandler)
            errorEvents.forEach(event => this.browserWindow.webContents.once(event, e => {
                clearTimeout(timeoutCode)
                console.log("Browser error event", e)
                finish()
            }))
        })
    }
}

export default ChromeBookmarksDSC
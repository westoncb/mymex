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
        }
    }

    async pullLatest() {    
        return await this.importChromeBookmarkData()
    }

    getName() {
        return this.name
    }

    async handleJob(job) {
        await this.takeScreenshot(job)
    }

    handleQueueEmptiedEvent() {
        if (this.browserWindow) {
            this.browserWindow.destroy()
            this.browserWindow = null
        }
    }

    async handleMemChanges(addedMems, removedMems) {
        await this.queueScreenshotJobs(addedMems.filter(mem => mem.isLeaf))
    }

    export() {
        return {name: this.name, _id: this._id, type: Const.DS_TYPE_CHROME, customData: {bookmarksLocation: this.bookmarksLocation}}
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

    queueScreenshotJobs(nodes) {
        const jobs = nodes.map(node => ({ _id: node._id, dataSourceId: this._id, priority: 10, customData: { location: node.location} }))

        DataStore.addJobs(jobs)
    }

    async takeScreenshot(job) {
        // Not the best way of doing this, but the idea
        // is to prevent the download dialog that pops up
        // with urls pointing to pdfs (and other file types I'm sure)
        if (job.customData.location.endsWith(".pdf")) {
            return new Promise((resolve, reject) => resolve())
        }

        if (!this.browserWindow) {
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

            // A better solution would be to use a broswer timeout event, 
            // but I haven't been able to find one
            const timeoutCode = setTimeout(() => {
                console.log("screenshot job timed out: ", job.location)
                finish()
            }, 20000)

            const finishedLoadingHandler = async () => {
                // const screenshot = await this.browserWindow.webContents.capturePage()
                // const pngScreenshot = screenshot.toPNG()
                // const thumbPath = path.join(app.getPath("userData"), "/thumbnails")
                // await fs.promises.mkdir(thumbPath, { recursive: true }).catch(console.error)
                // await fs.writeFileSync(path.join(thumbPath, job._id + ".png"), pngScreenshot)

                const pdfPath = path.join(electron.app.getPath("userData"), "/local-mems")
                await fs.promises.mkdir(pdfPath, { recursive: true }).catch(console.error)
                this.browserWindow.webContents.printToPDF({}).then(pdfData => {
                    fs.writeFile(path.join(pdfPath, job._id + ".pdf"), pdfData, (error) => {
                        if (error) console.error(error)
                    })
                })
                clearTimeout(timeoutCode)
                finish()
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
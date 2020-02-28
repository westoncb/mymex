const NEDB = require('nedb-promises')
const path = require('path')
import C from './constants'
const md5 = require('md5')
const electron = window.require('electron').remote
const fs = electron.require('fs')
import Util from './Util'
const BrowserWindow = electron.BrowserWindow
const app = electron.app

class DataStore {
    static memDB
    static dataSourceDB
    static workDB
    static working = false
    static browserWindow

    static init() {
        
        // Note: This is using IndexedDB, not a local file: https://github.com/louischatriot/nedb/issues/531
        const userDataDir = electron.app.getPath("userData")

        this.memDB = NEDB.create({ filename: path.join(userDataDir, '/db/mems'), autoload: true })
        this.dataSourceDB = NEDB.create({ filename: path.join(userDataDir, '/db/dataSources'), autoload: true })
        this.workDB = NEDB.create({ filename: path.join(userDataDir, '/db/work'), autoload: true})

        setInterval(() => {
            this.doQueuedWork()
        }, 5000)

        // Clear data sources
        // this.dataSourceDB.remove({}, { multi: true })
        // this.memDB.remove({}, { multi: true })
        // this.workDB.remove({}, { multi: true })
    }

    static async refreshDataSource(dataSource) {
        const memNodes = await this.importDataSource(dataSource)
        const diff = await this.diffMemNodes(memNodes, dataSource)

        this.memDB.insert(diff.nodesToAdd)
        this.memDB.remove(diff.nodesToRemove)

        if (dataSource.type === C.DS_TYPE_CHROME) {
            await this.queueScreenshotJobs(diff.nodesToAdd.filter(node => node.isLeaf))
        }
    }

    static queueScreenshotJobs(nodes) {
        const jobs = nodes.map(node => ({_id: node._id, location: node.location}))

        this.workDB.insert(jobs)
    }

    static async doQueuedWork() {
        return

        if (!this.working) {
            this.working = true

            let job
            do {
                job = await this.workDB.findOne({})
                if (job) {
                    console.log("about to screenshot: ", job)
                    await this.takeScreenshot(job)
                    await this.workDB.remove({_id: job._id})
                }
            } while (job)

            this.working = false
            
            if (this.browserWindow) {
                this.browserWindow.destroy()
                this.browserWindow = null
            }
        }
    }

    static async takeScreenshot(job) {
        if (!this.browserWindow) {
            this.browserWindow = new BrowserWindow({
                show: false, webPreferences: {
                    plugins: true
                } })
        }

        this.browserWindow.loadURL(job.location)

        return new Promise((resolve, reject) => {
            this.browserWindow.webContents.on('did-finish-load', async () => {
                const screenshot = await this.browserWindow.webContents.capturePage()
                const pngScreenshot = screenshot.toPNG()

                const writePath = path.join(app.getPath("userData"), "/thumbnails")
                await fs.promises.mkdir(writePath, { recursive: true }).catch(console.error)
                await fs.writeFileSync(path.join(writePath, job._id + ".png"), pngScreenshot)

                resolve()
            })
        })
    }

    static async diffMemNodes(memNodes, dataSource) {
        const oldMems = await this.memDB.find({dataSource: dataSource._id})

        const nodesToAdd = this.memNodesDifference(memNodes, oldMems)
        const nodesToRemove = this.memNodesDifference(oldMems, memNodes)

        return {nodesToAdd, nodesToRemove}
    }

    static async importDataSource(dataSource) {
        let memNodes

        switch (dataSource.type) {
            case C.DS_TYPE_CHROME:

                memNodes = await this.importChromeBookmarks(dataSource);
                console.log("memNodes", memNodes)
                break;
            case C.DS_TYPE_DIRECTORY:

                break;
            default:
                break;
        }

        return memNodes
    }

    static async importChromeBookmarks(dataSource) {
        return fs.promises.readFile(dataSource.path, { encoding: "utf8" }).then(data => {
            const bookmarksJSON = JSON.parse(data)
            const memNodes = []
            this.handleChromeBMNode(bookmarksJSON.roots.bookmark_bar, memNodes, dataSource)
            

            return this.uniqMemNodes(memNodes)
        }, error => console.error(error))
    }

    static handleChromeBMNode(bmNode, memNodes, dataSource) {
        const memNode = {name: bmNode.name, chrome_guid: bmNode.guid, dataSource: dataSource._id}

        if (bmNode.type === "folder") {
            memNode._id = bmNode.guid
            memNode.isLeaf = false
            memNode.children = []
            memNodes.push(memNode)
            if (bmNode.children) {
                bmNode.children.forEach(child => {
                    const childMemNode = this.handleChromeBMNode(child, memNodes, dataSource)
                    memNode.children.push(childMemNode._id)
                    childMemNode.parent = memNode._id
                })
            }
        } else if (bmNode.type === "url") {
            memNode._id = this.idForPath(bmNode.url)
            memNode.location = bmNode.url
            memNode.isLeaf = true
            memNodes.push(memNode)
        }

        return memNode
    }

    static uniqMemNodes(array) {
        const seen = {}
        return array.filter(memNode => seen.hasOwnProperty(memNode._id) ? false : (seen[memNode._id] = true))
    }

    /**
     * Returns the elements in ar1 which are not in ar2
     */
    static memNodesDifference(array1, array2) {
        const ar2Set = new Set(array2.map(e => e._id))
        return array1.filter(element => !ar2Set.has(element._id))
    }

    static importDirectory(path) {

    }

    static idForPath(path) {
        return md5(path.toLowerCase())
    }

    static addDataSource(info, func) {
        this.dataSourceDB.insert({ _id: this.idForPath(info.path), ...info }).then(newDoc => func(newDoc), error => console.error(error))
    }

    static getDataSources(func) {
        this.dataSourceDB.find({}).then(docs => {
            const promises = docs.map(ds => this.refreshDataSource(ds))
            Promise.all(promises).then(result => {
                func(docs)
                this.doQueuedWork()
            })
        }, error => console.error(error))
    }

    static getMemNodesMatching(str) {
        return this.memDB.find({name: new RegExp(str, 'i')}).sort({parent: 1})
    }

    static getMem(id) {
        return this.memDB.findOne({ _id: id})
    }

    static getMems(idArray) {
        return this.memDB.find({ _id: { $in: idArray } } )
    }

    static async getNodeDepth(node) {
        let parentId = node.parent
        let parentObj
        let depth = 0

        while (parentId) {
            depth++
            parentObj = await this.getMem(parentId)
            parentId = parentObj.parent
        }

        return depth
    }
}

export default DataStore
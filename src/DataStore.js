const NEDB = require('nedb-promises')
const path = require('path')
import C from './constants'
const md5 = require('md5')
const electron = window.require('electron').remote
const fs = electron.require('fs')
import Util from './Util'

class DataStore {
    static memDB
    static dataSourceDB

    static init() {
        
        // Note: This is using IndexedDB, not a local file: https://github.com/louischatriot/nedb/issues/531
        this.memDB = NEDB.create({ filename: path.join(__dirname, 'db/mems'), autoload: true })
        this.dataSourceDB = NEDB.create({ filename: path.join(__dirname, 'db/dataSources'), autoload: true })

        // Clear data sources
        // this.dataSourceDB.remove({}, { multi: true })
    }

    static async refreshDataSource(dataSource) {
        const memNodes = await this.importDataSource(dataSource)
        const diff = await this.diffMemNodes(memNodes, dataSource)

        this.memDB.insert(diff.nodesToAdd)
        this.memDB.remove(diff.nodesToRemove)
    }

    static async diffMemNodes(memNodes, dataSource) {
        const oldMems = await this.memDB.find({dataSource: dataSource._id})
        const nodesToAdd = Util.arrayDifference(memNodes, oldMems)
        const nodesToRemove = Util.arrayDifference(oldMems, memNodes)

        return {nodesToAdd, nodesToRemove}
    }

    static async importDataSource(dataSource) {
        let memNodes

        switch (dataSource.type) {
            case C.DS_TYPE_CHROME:

                memNodes = await this.importChromeBookmarks(dataSource.path);
                break;
            case C.DS_TYPE_DIRECTORY:

                break;
            default:
                break;
        }

        return memNodes
    }

    static async importChromeBookmarks(path) {
        return fs.promises.readFile(path, { encoding: "utf8" }).then(data => {
            const bookmarksJSON = JSON.parse(data)
            const memNodes = []
            this.handleChromeBMNode(bookmarksJSON.roots.bookmark_bar, memNodes)
            

            return this.uniqMemNodes(memNodes)
        }, error => console.error(error))
    }

    static handleChromeBMNode(bmNode, memNodes) {
        const memNode = {name: bmNode.name, chrome_guid: bmNode.guid}

        if (bmNode.type === "folder") {
            memNode._id = bmNode.guid
            memNode.isLeaf = false
            memNode.children = []
            memNodes.push(memNode)
            if (bmNode.children) {
                bmNode.children.forEach(child => {
                    const childMemNode = this.handleChromeBMNode(child, memNodes)
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
            docs.forEach(ds => this.refreshDataSource(ds))
            func(docs)
        }, error => console.error(error))
    }
}

export default DataStore
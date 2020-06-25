import DataSourceConnector from './DataSourceConnector'

import Const from './constants'
import DataStore from './DataStore'
import Util from './Util'
const electron = window.require('electron').remote
const dialog = electron.dialog
const pathLib = electron.require('path')
const fs = electron.require('fs')
const walk = electron.require('walkdir')

class LocalDirectoryDSC extends DataSourceConnector {

    name
    _id
    path

    constructor(config) {
        super()

        if (config) {
            this.name = config.name
            this._id = config._id
            this.path = config.customData.path
        }
    }

    async configureDataSource() {
        const defaultPath = electron.app.getPath('home')
        const result = await dialog.showOpenDialog({ title: "Select Directory", defaultPath, properties: ['openDirectory'] })
        const selectedPath = result.filePaths[0]

        if (!result.canceled) {
            this.name = "Local File System DS"
            this._id = Util.idFromPath(selectedPath)
            this.path = selectedPath

            return true
        } else {

            return false
        }
    }

    watch() {
        
    }

    async pullLatest() {
        console.log("the path", this.path)
        const emitter = walk(this.path)
        const memNodes = []

        emitter.on("file", (path, stat) => {
            const obj = pathLib.parse(path)
            const memNode = {_id: Util.idFromPath(path), name: obj.name, isLeaf: true, location: path, dataSourceId: this._id }
            memNodes.push(memNode)
        })

        return Util.uniq(memNodes, "_id")
    }

    getName() {
        throw "All subclasses of DataSourceConnector must implement getName"
    }

    handleJob(job) {
        throw "All subclasses of DataSourceConnector must implement handleJob"
    }

    async handleMemChanges(addedMems, removedMems) {

        const jobs = addedMems.filter(mem => mem.isLeaf).map(node => ({ _id: node._id, dataSourceId: this._id, priority: 10, customData: { location: node.location } }))
        await DataStore.addJobs(jobs)
    }

    export() {
        return { name: this.name, _id: this._id, type: Const.DS_TYPE_DIRECTORY, customData: { path: this.path } }
    }
}

export default LocalDirectoryDSC
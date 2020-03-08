import NEDB from 'nedb-promises'
import path from 'path'
import ChromeBookmarksDSC from "./ChromeBookmarksDSC"
import LocalDirectoryDSC from "./LocalDirectoryDSC"
import Const from './constants'
import Util from './Util'
const electron = window.require('electron').remote

class DataStore {
    static memDB
    static dataSourceDB
    static workDB
    static activeJob = null
    static dataSourceConnectors = {}
    static connectorClassMap = { [Const.DS_TYPE_CHROME]: ChromeBookmarksDSC, [Const.DS_TYPE_DIRECTORY]: LocalDirectoryDSC }

    static init() {
        
        // Note: This is using IndexedDB, not a local file: https://github.com/louischatriot/nedb/issues/531
        const userDataDir = electron.app.getPath("userData")

        this.memDB = NEDB.create({ filename: path.join(userDataDir, '/db/mems'), autoload: true })
        this.dataSourceDB = NEDB.create({ filename: path.join(userDataDir, '/db/dataSources'), autoload: true })
        this.workDB = NEDB.create({ filename: path.join(userDataDir, '/db/work'), autoload: true})

        // Clear data bases
        // this.dataSourceDB.remove({}, { multi: true })
        // this.memDB.remove({}, { multi: true })
        // this.workDB.remove({}, { multi: true })

        this.refreshAllDataSources()
    }

    static async refreshAllDataSources() {
        this.dataSourceDB.find({}).then(dataSources => {
            dataSources.forEach(dataSource => {
                this.refreshDataSource(dataSource)
            })
        })
    }

    static async refreshDataSource(dataSource) {
        const dsConnector = this.getDataSourceConnector(dataSource)
        const mems = await dsConnector.pullLatest()

        const changes = await this.findMemChanges(mems, dataSource._id)

        this.memDB.insert(changes.memsToAdd)
        this.memDB.remove(changes.memsToRemove)

        dsConnector.handleMemChanges(changes.memsToAdd, changes.memsToRemove)
    }

    static async findMemChanges(memNodes, dataSourceId) {
        const oldMems = await this.memDB.find({ dataSourceId })

        const memsToAdd = Util.arrayDifference(memNodes, oldMems, "_id")
        const memsToRemove = Util.arrayDifference(oldMems, memNodes, "_id")

        return { memsToAdd, memsToRemove }
    }

    static getDSClassByName(name) {
        
    }

    static getDataSourceConnector(dataSource) {
        let dsConnector = this.dataSourceConnectors[dataSource._id]

        if (dsConnector)
            return dsConnector

        console.log("dataSource", dataSource)

        const connectorClass = this.connectorClassMap[dataSource.type]
        dsConnector = new connectorClass(dataSource)
        this.dataSourceConnectors[dataSource._id] = dsConnector

        return dsConnector
    }

    static getAllDataSourceConnectors() {
        const keys = Object.keys(this.dataSourceConnectors)
        return keys.map(key => this.dataSourceConnectors[key])
    }

    static addDataSource(dataSource, func) {
        this.dataSourceDB.insert(dataSource).then(newDataSource => {
            func(newDataSource)
            this.refreshDataSource(newDataSource)
        }, error => console.error(error))
    }

    static getAllDataSources(func) {
        this.dataSourceDB.find({}).then(dataSources => {
            func(dataSources)
        }, error => console.error(error))
    }

    static getDataSource(id) {
        return this.dataSourceDB.findOne({_id: id})
    }

    static getMemNodesMatching(str) {
        const pattern = new RegExp(str, 'i')
        const query = { $or: [{ name: pattern }, 
            { tags: { $elemMatch: pattern}},
            { notes: pattern},
            { url: pattern}] }
        return this.memDB.find(query).sort({parent: 1})
    }

    static getMem(id) {
        return this.memDB.findOne({ _id: id})
    }

    static getMems(idArray) {
        return this.memDB.find({ _id: { $in: idArray } } )
    }

    static setMemNotes(id, notes) {
        this.memDB.update({_id: id}, { $set: { notes }})
    }

    static setMemTags(id, tags) {
        this.memDB.update({ _id: id }, { $set: { tags } })
    }

    static getMemNotes(id) {
        return this.memDB.find({_id: id})
    }

    static getMemTags(id) {

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

    static nextJob() {
        return this.workDB.findOne({})
    }

    static jobCount() {
        return this.workDB.count({})
    }

    static removeJob(id) {
        this.workDB.remove({ _id: id })
    }

    static addJobs(jobs) {
        this.workDB.insert(jobs)
    }
}

export default DataStore
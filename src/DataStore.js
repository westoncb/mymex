const NEDB = require('nedb')
const path = require('path')
import C from './constants'

class DataStore {
    static memDB
    static dataSourceDB

    static init() {
        
        // Note: This is using IndexedDB, not a local file: https://github.com/louischatriot/nedb/issues/531
        this.memDB = new NEDB({ filename: path.join(__dirname, 'db/mems'), autoload: true });
        this.dataSourceDB = new NEDB({ filename: path.join(__dirname, 'db/dataSources'), autoload: true });
    }

    static refreshDataSource(dataSource) {
        // importDataSource
        // grab previous version of ds
        // diff the two and update database record
    }

    static importDataSource(dataSource) {
        switch (dataSource.type) {
            case C.DS_TYPE_CHROME:
                DataStore.importChromeBookmarks(dataSource.location)
                break;
            case C.DS_TYPE_DIRECTORY:

                break;
            default:
                break;
        }
    }

    static importChromeBookmarks(location) {

    }

    static importDirectory(location) {

    }
    
    static getDataSources() {
        return DataStore.dataSources
    }

    static addDataSource(info, func) {
        this.dataSourceDB.insert(info, (err, newDoc) => {
            if (!err)
                func(newDoc)
            else
                console.err(err)
        })
    }

    static getDataSources(func) {
        this.dataSourceDB.find({}, (err, docs) => {
            if (!err)
                func(docs)
            else
                console.err(err)
        })
    }
}

export default DataStore
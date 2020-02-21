class DataStore {
    static init() {
        DataStore.dataSources = []
    }
    
    static getDataSources() {
        return DataStore.dataSources
    }

    static addDataSource(info) {
        DataStore.dataSources = DataStore.dataSources.concat(info)
    }
}

export default DataStore
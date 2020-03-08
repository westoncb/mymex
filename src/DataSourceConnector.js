
class DataSourceConnector {
    async configureDataSource() {
        throw "All subclasses of DataSourceConnector must implement configureDataSource"
    }

    pullLatest() {
        throw "All subclasses of DataSourceConnector must implement pullLatest"
    }

    getName() {
        throw "All subclasses of DataSourceConnector must implement getName"
    }

    handleJob(job) {
        throw "All subclasses of DataSourceConnector must implement handleJob"
    }

    handleMemChanges(addedMems, removedMems) {
        throw "All subclasses of DataSourceConnector must implement handleMemChanges"
    }

    /**
     * Must return an object of the form:
     * {name: string, id: string, type: string, customData: object}
     * This object will later be used as the sole parameter
     * to constructors of implementing subclasses.
     */
    serialize() {
        throw "All subclasses of DataSourceConnector must implement serialize"
    }
}

export default DataSourceConnector
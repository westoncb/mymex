import DataSourceConnector from './DataSourceConnector'
const electron = window.require('electron').remote
const dialog = electron.dialog

class LocalDirectoryDSC extends DataSourceConnector {
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
}

export default LocalDirectoryDSC
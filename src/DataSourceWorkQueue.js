import DataStore from './DataStore'
import DataSourceConnector from './DataSourceConnector'

export default class DataSourceWorkQueue {
    dataSources = {}
    jobChangeSubscribers = []

    constructor(dataSourcesArray = []) {

        dataSourcesArray.forEach(ds => this.dataSources[ds._id] = ds)

        // setInterval(() => {
        //     if (!this.working) {
        //         this.working = true

        //         this.startQueuedWork()
        //     }
        // }, 5000)
    }

    async startQueuedWork() {
        do {
            this.activeJob = await DataStore.nextJob()
            this.jobCount = await DataStore.jobCount()

            if (this.activeJob) {
                this.jobChangeHandlers.forEach(handler => handler(this.activeJob))

                // Need to cache constructed connectors; or jobs need to store
                // connector IDs instead of just types; then we can grab the connect
                // object from the db and construct a DataSourceConnnector with it.
                // const connectorClass = DataSourceConnector.getDSClassByName(this.activeJob.type)
                // const connector = new connectorClass()

                await DataStore.removeJob(this.activeJob._id)
            }
        } while (this.activeJob)

        if (this.browserWindow) {
            this.browserWindow.destroy()
            this.browserWindow = null
        }

        this.working = false
    }

    pause() {

    }

    resume() {

    }

    subscribeToJobChanges(handler) {
        this.jobChangeSubscribers.push(handler)
    }
}
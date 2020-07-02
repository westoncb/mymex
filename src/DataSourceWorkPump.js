import DataStore from './DataStore'
import DSConnectorRegistry from './DSConnectorRegistry'

export default class DataSourceWorkPump {
    dataSources = {}
    jobChangeSubscribers = []
    paused = false

    init(dataSourcesArray = []) {
        dataSourcesArray.forEach(dataSource => {
            this.dataSources[dataSource._id] = dataSource
        })

        setInterval(() => {
            if (!this.working && !this.paused) {
                this.working = true

                this.doQueuedWork().then(result => {
                    if (result.didSomeWork && result.jobCount === 0) {
                        DataStore.getAllDataSourceConnectors(dsConnector => dsConnector.handleQueueEmptiedEvent())
                    }
                    this.working = false
                })
            }
        }, 3000)

        this.pause()
    }

    async doQueuedWork() {
        let didSomeWork = false
        let activeJob = await DataStore.nextJob()
        let jobCount = await DataStore.jobCount()

        while (activeJob && !this.paused) {   
            didSomeWork = true
            this.jobChangeSubscribers.forEach(handler => handler(activeJob, jobCount))

            const dsConnector = await DSConnectorRegistry.getDataSourceConnector(activeJob.dataSourceId)
            await dsConnector.handleJob(activeJob)

            await DataStore.removeJob(activeJob._id)
            activeJob = await DataStore.nextJob()
            jobCount = await DataStore.jobCount()
        }

        return { didSomeWork, jobCount}
    }

    pause() {
        this.paused = true
    }

    resume() {
        this.paused = false
    }

    subscribeToJobChangeEvents(handler) {
        this.jobChangeSubscribers.push(handler)
    }
}
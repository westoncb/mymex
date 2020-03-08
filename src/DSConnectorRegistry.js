import ChromeBookmarksDSC from "./ChromeBookmarksDSC"
import LocalDirectoryDSC from "./LocalDirectoryDSC"
import Const from './constants'

export default class DSConnectorRegistry {

    static dataSourceConnectors = {}
    static connectorClassMap = { [Const.DS_TYPE_CHROME]: ChromeBookmarksDSC, [Const.DS_TYPE_DIRECTORY]: LocalDirectoryDSC }

    static getDataSourceConnector(dataSource) {
        let dsConnector = this.dataSourceConnectors[dataSource._id]

        if (dsConnector)
            return dsConnector

        const connectorClass = this.connectorClassMap[dataSource.type]
        dsConnector = new connectorClass(dataSource)
        this.dataSourceConnectors[dataSource._id] = dsConnector

        return dsConnector
    }

    static getAllDataSourceConnectors() {
        const keys = Object.keys(this.dataSourceConnectors)
        return keys.map(key => this.dataSourceConnectors[key])
    }
}
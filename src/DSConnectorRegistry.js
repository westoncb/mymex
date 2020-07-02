import ChromeBookmarksDSC from "./ChromeBookmarksDSC"
import LocalDirectoryDSC from "./LocalDirectoryDSC"
import Const from './constants'
import DataStore from './DataStore'
import { IconNames } from "@blueprintjs/icons";

export default class DSConnectorRegistry {

    static dataSourceConnectors = {}
    static connectorClassMap = { [Const.DS_TYPE_CHROME]: ChromeBookmarksDSC, [Const.DS_TYPE_DIRECTORY]: LocalDirectoryDSC }
    static connectorIconMap = { [Const.DS_TYPE_CHROME]: IconNames.BOOKMARK, [Const.DS_TYPE_DIRECTORY]: IconNames.FOLDER_OPEN }
    static connectorIcons = {}

    static async getDataSourceConnector(dataSourceId) {
        let dsConnector = this.dataSourceConnectors[dataSourceId]

        if (dsConnector)
            return dsConnector
        
        const dataSource = await DataStore.getDataSource(dataSourceId)
        const connectorClass = this.connectorClassMap[dataSource.type]
        dsConnector = new connectorClass(dataSource)
        dsConnector.type = dataSource.type
        this.connectorIcons[dataSource._id] = this.connectorIconMap[dsConnector.type]
        this.dataSourceConnectors[dataSource._id] = dsConnector

        return dsConnector
    }

    static getDataSourceIcon(dataSourceId) {
        return this.connectorIcons[dataSourceId]
    }

    static getAllDataSourceConnectors() {
        const keys = Object.keys(this.dataSourceConnectors)
        return keys.map(key => this.dataSourceConnectors[key])
    }
}
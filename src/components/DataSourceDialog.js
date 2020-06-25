import React, { useState, useEffect } from "react";
import DataStore from "../DataStore"
import { Icon, Button, Dialog, Classes, AnchorButton, NonIdealState, Divider, ControlGroup, RadioGroup, Radio } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import './DataSourceDialog.css' 
import Const from '../constants'
import ChromeBookmarksDSC from "../ChromeBookmarksDSC"
import LocalDirectoryDSC from "../LocalDirectoryDSC"

export default function DataSourceDialog(props) {
    const [selectedSourceType, setSelectedSourceType] = useState(Const.DS_TYPE_CHROME)
    const [dataSources, setDataSources] = useState([])

    useEffect(() => {
        DataStore.getAllDataSources(dataSources => {
            setDataSources(dataSources)
        })
    }, [])

    const handleSourceTypeChange = event => setSelectedSourceType(event.target.value)

    const handleAddSourceButton = async () => {
        // const connectorClass = connectorClassMap[selectedSourceType]
        // const dataSourceConnector = new connectorClass()
        // await dataSourceConnector.configureDataSource()
        // DataStore.addDataSource(dataSourceConnector.serialize(), dataSource => {
        //     console.log("new data source", dataSource)
        //     setDataSources(dataSources.concat(dataSource))
        // })

        if (selectedSourceType === Const.DS_TYPE_CHROME) {
            const chromeBookmarksDSC = new ChromeBookmarksDSC()
            const success = await chromeBookmarksDSC.configureDataSource()
            if (success) {
                DataStore.addDataSource(chromeBookmarksDSC.export(), dataSource => {
                    console.log("dataSources", dataSource)
                    setDataSources(dataSources.concat(dataSource))
                })
            }
        } else if (selectedSourceType === Const.DS_TYPE_DIRECTORY) {
            const localDirectoryDSC = new LocalDirectoryDSC()
            const success = await localDirectoryDSC.configureDataSource()
            if (success) {
                DataStore.addDataSource(localDirectoryDSC.export(), dataSource => {
                    console.log("dataSources", dataSource)
                    setDataSources(dataSources.concat(dataSource))
                })
            }
        }
    }

    let mainSection

    if (dataSources.length === 0) {
        mainSection = <NonIdealState
            icon={IconNames.DIAGRAM_TREE}
            title="No data sources"
            description="No data sources have been added yet"
        />
    } else {
        mainSection =
            <div className="data-source-list">
                {dataSources.map(ds => <div className="data-source-item" key={ds._id}>{ds.name}:{ds.customData.bookmarksLocation}</div>)}
            </div>
    }

    return (
        <Dialog
            className="bp3-dark"
            icon={IconNames.DIAGRAM_TREE}
            onClose={props.handleClose}
            title="Manage data sources"
            isOpen={props.isOpen}
        >
            <div className={Classes.DIALOG_BODY}>
                {mainSection}
                <Divider />
                <ControlGroup className="data-source-control-group" fill={true}>
                    <RadioGroup
                        label="Data source type"
                        onChange={handleSourceTypeChange}
                        selectedValue={selectedSourceType}
                    >
                        <Radio label="Chrome bookmarks file" value={Const.DS_TYPE_CHROME}></Radio>
                        <Radio label="File system location" value={Const.DS_TYPE_DIRECTORY}></Radio>
                    </RadioGroup>
                    <Button onClick={handleAddSourceButton}><Icon icon={IconNames.ADD} iconSize={42} /></Button>
                </ControlGroup>
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <AnchorButton onClick={props.handleClose}>Done</AnchorButton>
                </div>
            </div>
        </Dialog>
    )
}
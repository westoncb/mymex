import React, { useState, useEffect } from "react";
import DataStore from "../DataStore"
import { Icon, Button, Dialog, Classes, AnchorButton, NonIdealState, Divider, ControlGroup, RadioGroup, Radio } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import './DataSourceDialog.css' 
import C from '../constants'
const path = require('path')
const electron = window.require('electron').remote
const dialog = electron.dialog


export default function DataSourceDialog(props) {
    const [selectedSourceType, setSelectedSourceType] = useState(C.DS_TYPE_CHROME)
    const [dataSources, setDataSources] = useState([])

    useEffect(() => {
        DataStore.getDataSources(freshDataSources => {
            setDataSources(freshDataSources)
        })
    }, [])

    const handleSourceTypeChange = event => setSelectedSourceType(event.target.value)

    const handleAddSourceButton = () => {
        let resultPromise

        if (selectedSourceType === C.DS_TYPE_CHROME) {
            const defaultPath = path.join(electron.app.getPath('home'), "/Library/Application Support/Google/Chrome/Default")
            resultPromise = dialog.showOpenDialog({title: "Select Chrome bookmarks file", defaultPath, properties: ['openFile'] })
        } else if (selectedSourceType === C.DS_TYPE_DIRECTORY) {
            resultPromise = dialog.showOpenDialog({title: "Choose folder", properties: ['openDirectory', 'showHiddenFiles', 'createDirectory'] })
        }

        resultPromise.then((result, err) => {
            if (!result.canceled) {
                const path = result.filePaths[0]
                DataStore.addDataSource({ name: selectedSourceType, path, selectedSourceType }, dataSource => {
                    console.log("dataSources", dataSource)
                    setDataSources(dataSources.concat(dataSource))
                })
            }
        })
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
                {dataSources.map(ds => <div className="data-source-item" key={ds._id}>{ds.name}:{ds.path}</div>)}
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
                        <Radio label="Chrome bookmarks file" value={C.DS_TYPE_CHROME}></Radio>
                        <Radio label="File system location" value={C.DS_TYPE_DIRECTORY}></Radio>
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
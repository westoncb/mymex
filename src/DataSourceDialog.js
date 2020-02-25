import React, { PureComponent } from "react";
import DataStore from "./DataStore"
import { Icon, Button, Dialog, Intent, Classes, Tooltip, AnchorButton, NonIdealState, Divider, ControlGroup, RadioGroup, Radio } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import './DataSourceDialog.css' 
import C from './constants'
const electron = window.require('electron').remote
const dialog = electron.dialog


class DataSourceDialog extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            selectedSourceType: C.DS_TYPE_CHROME,
            dataSources: []
        }

        DataStore.getDataSources(dataSources => {
            this.setState({dataSources})
        })
    }

    handleSourceTypeChange = event => this.setState({ selectedSourceType: event.target.value })

    handleAddSourceButton = () => {
        const type = this.state.selectedSourceType
        let resultPromise

        if (type === C.DS_TYPE_CHROME) {
            const defaultPath = electron.app.getPath('home') + "/Library/Application Support/Google/Chrome/Default"
            resultPromise = dialog.showOpenDialog({title: "Select Chrome bookmarks file", defaultPath, properties: ['openFile'] })
        } else if (type === C.DS_TYPE_DIRECTORY) {
            resultPromise = dialog.showOpenDialog({title: "Choose folder", properties: ['openDirectory', 'showHiddenFiles', 'createDirectory'] })
        }

        resultPromise.then((result, err) => {
            if (!result.canceled) {
                const path = result.filePaths[0]
                DataStore.addDataSource({ name: type, path, type }, dataSource => {
                    console.log("dataSources", dataSource)
                    this.setState({ dataSources: this.state.dataSources.concat(dataSource) })
                })
            }
        })
    }

    render() {
        let mainSection

        if (this.state.dataSources.length === 0) {
            mainSection = <NonIdealState
                icon={IconNames.DIAGRAM_TREE}
                title="No data sources"
                description="No data sources have been added yet"
            />
        } else {
            mainSection = 
                <div className="data-source-list">
                {this.state.dataSources.map(ds => <div className="data-source-item" key={ds._id}>{ds.name}:{ds.path}</div>)}
                </div>
        }

        return (
            <Dialog
                className="bp3-dark"
                icon={IconNames.DIAGRAM_TREE}
                onClose={this.handleClose}
                title="Manage data sources"
                isOpen={this.props.isOpen}
            >
                <div className={Classes.DIALOG_BODY}>
                    {mainSection}
                    <Divider/>
                    <ControlGroup className="data-source-control-group" fill={true}>
                        <RadioGroup
                            label="Data source type"
                            onChange={this.handleSourceTypeChange}
                            selectedValue={this.state.selectedSourceType}
                        >
                            <Radio label="Chrome bookmarks file" value={C.DS_TYPE_CHROME}></Radio>
                            <Radio label="File system location" value={C.DS_TYPE_DIRECTORY}></Radio>
                        </RadioGroup>
                        <Button onClick={this.handleAddSourceButton}><Icon icon={IconNames.ADD} iconSize={42}/></Button>
                    </ControlGroup>
                </div>

                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <AnchorButton onClick={this.props.handleClose}>Done</AnchorButton>
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default DataSourceDialog
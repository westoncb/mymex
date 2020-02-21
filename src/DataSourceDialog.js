import React, { PureComponent } from "react";
import DataStore from "./DataStore"
import { Icon, Button, Dialog, Intent, Classes, Tooltip, AnchorButton, NonIdealState, Divider, ControlGroup, RadioGroup, Radio } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import './DataSourceDialog.css'

class DataSourceDialog extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            dataSources: DataStore.getDataSources(),
            selectedSourceType: "chrome"
        }
    }

    handleSourceTypeChange = event => this.setState({ selectedSourceType: event.target.value })

    handleAddSourceButton = () => {
        DataStore.addDataSource({name: this.state.selectedSourceType})

        this.setState({ dataSources: [] })
        this.setState({dataSources: DataStore.getDataSources()})
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
                {this.state.dataSources.map(ds => <div className="data-source-item" key={ds}>{ds.name}</div>)}
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
                            <Radio label="Chrome bookmarks file" value="chrome"></Radio>
                            <Radio label="File system location" value="fs"></Radio>
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
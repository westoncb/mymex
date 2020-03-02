import React, { PureComponent } from "react";
import './ContentViewer.css'
import { Icon, Button, Tooltip, Position, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
const path = require('path')
const electron = window.require('electron').remote
const fs = electron.require('fs')

class ContentViewer extends PureComponent {

    state = {viewingLocal: true}

    handleGoBack = () => {
        this.props.goBackFunc()
    }

    handleSwitchVersion = () => {
        this.setState((state, props) => {
            return {viewingLocal: !state.viewingLocal}
        })
    }

    render() {
        const localPath = "memexdata://" + path.join("local-mems", this.props.content._id) + ".pdf"
        const remotePath = this.props.content.location
        const localPathAlt = path.join(electron.app.getPath("userData"), "local-mems", this.props.content._id + ".pdf")
        const localExists = fs.existsSync(localPathAlt)
        const url = this.state.viewingLocal ? localPath : remotePath

        const switchButtonMessage = `Switch to ${this.state.viewingLocal ? "live" : "local"} version`
        const versionIcon = this.state.viewingLocal ? IconNames.DATABASE : IconNames.GLOBE_NETWORK

        return (
            <div className="content-viewer">
                <div className="content-toolbar bp3-light">
                    <div style={{display: "flex"}}>
                        <Tooltip content="Go back to search results" position={Position.BOTTOM}>
                            <Button onClick={this.handleGoBack} className="toolbar-button"><Icon icon={IconNames.ARROW_LEFT} iconSize={42} /></Button>
                        </Tooltip>
                        <div style={{width: "5rem"}}></div> 
                        <Tooltip content="Show notes" position={Position.BOTTOM}>
                            <Button className="toolbar-button" style={{ marginRight: "1rem"}}><Icon icon={IconNames.ANNOTATION} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content={switchButtonMessage} position={Position.BOTTOM}>
                            <Button onClick={this.handleSwitchVersion} className="toolbar-button"><Icon icon={IconNames.EXCHANGE} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="Download fresh version" position={Position.BOTTOM}>
                            <Button className="toolbar-button"><Icon icon={IconNames.DOWNLOAD} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="View version history" position={Position.BOTTOM}>
                            <Button className="toolbar-button"><Icon icon={IconNames.HISTORY} iconSize={42} /></Button>
                        </Tooltip>
                    </div>
                    <div style={{display: "flex", alignItems: "flex-end"}}>
                        <div className="local-status-message">
                            <b>Viewing {this.state.viewingLocal ? " local " : " live "}</b>: {this.props.content.name}
                        </div>
                        <Icon className="version-icon" icon={versionIcon} iconSize={32} />
                    </div>
                </div>

                {(localExists || !this.state.viewingLocal) && 
                    <iframe className="content-iframe" src={url} />
                }

                {(!localExists && this.state.viewingLocal) &&
                    <NonIdealState
                        icon={IconNames.SEARCH}
                        title="No local copy found"
                        description="You might try using the button above to download a fresh copy!"
                        action={undefined}
                    />
                }

            </div>
        )
    }
}

export default ContentViewer
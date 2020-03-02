import React, { PureComponent } from "react";
import './ContentViewer.css'
import { Icon, Button, Tooltip, Position, ButtonGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
const path = require('path')

class ContentViewer extends PureComponent {

    state = {viewingLocal: true}

    handleGoBack = () => {
        // this.setState(viewingLocal)
    }

    handleSwitchVersion = () => {
        this.setState((state, props) => {
            return {viewingLocal: !state.viewingLocal}
        })
    }

    render() {
        const localPath = "memexdata://" + path.join("local-mems", this.props.content._id) + ".pdf"
        const remotePath = this.props.content.location
        const url = this.state.viewingLocal ? localPath : remotePath

        const switchButtonMessage = `Switch to ${this.state.viewingLocal ? "live" : "local"} version`
        const versionIcon = this.state.viewingLocal ? IconNames.DATABASE : IconNames.GLOBE_NETWORK

        return (
            <div className="content-viewer">
                <div className="content-toolbar bp3-light">
                    <div style={{display: "flex"}}>
                        <Tooltip content="Go back to search" position={Position.BOTTOM}>
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
                            Viewing {this.state.viewingLocal ? " local " : " live "}: {this.props.content.name}
                        </div>
                        <Icon className="version-icon" icon={versionIcon} iconSize={32} />
                    </div>
                </div>

                <iframe className="content-iframe" src={url} />

            </div>
        )
    }
}

export default ContentViewer
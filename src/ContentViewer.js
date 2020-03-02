import React, { PureComponent } from "react";
import './ContentViewer.css'
import { Icon, Button, Tooltip, Position, ButtonGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
const path = require('path')

class ContentViewer extends PureComponent {

    state = {}

    render() {
        const localPath = "memexdata://" + path.join("local-mems", this.props.contentId) + ".pdf"

        return (
            <div className="content-viewer">
                <div className="content-toolbar">
                    <div>
                        <Tooltip content="Go back to search" position={Position.BOTTOM}>
                            <Button className="toolbar-button" style={{marginRight: "5rem"}}><Icon icon={IconNames.ARROW_LEFT} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="Show notes" position={Position.BOTTOM}>
                            <Button className="toolbar-button" style={{ marginRight: "1rem" }}><Icon icon={IconNames.ANNOTATION} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="Switch to live version" position={Position.BOTTOM}>
                            <Button className="toolbar-button"><Icon icon={IconNames.EXCHANGE} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="Download fresh version" position={Position.BOTTOM}>
                            <Button className="toolbar-button"><Icon icon={IconNames.DOWNLOAD} iconSize={42} /></Button>
                        </Tooltip>
                        <Tooltip content="View version history" position={Position.BOTTOM}>
                            <Button className="toolbar-button"><Icon icon={IconNames.HISTORY} iconSize={42} /></Button>
                        </Tooltip>
                    </div>
                    <div className="local-status-message">
                        Viewing local copy of: {this.props.contentName}
                    </div>
                </div>
                <iframe className="content-iframe" src={localPath} />
            </div>
        )
    }
}

export default ContentViewer
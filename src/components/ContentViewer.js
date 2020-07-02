import React, { useState } from "react";
import './ContentViewer.css'
import AnnotationsPanel from './AnnotationsPanel'
import { Icon, Button, Tooltip, Position, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
const path = require('path')
const electron = window.require('electron').remote
const fs = electron.require('fs')

export default function ContentViewer(props) {

    const [viewingLocal, setViewingLocal] = useState(true)
    const [showingAnnotations, setshowingAnnotations] = useState(false)

    const handleGoBack = () => {
        props.setAnnotationItem(null)
        props.goBackFunc()
    }

    const handleToggleAnnotations = () => {
        if (!showingAnnotations) {
            props.setAnnotationItem(props.content)
        } else {
            props.setAnnotationItem(null)
        }

        setshowingAnnotations(!showingAnnotations)
    }
    const handleSwitchVersion = () => setViewingLocal(!viewingLocal)

    const localPath = "memexdata://" + path.join("local-mems", props.content._id) + ".pdf"
    const remotePath = props.content.location
    const localPathAbsolute = path.join(electron.app.getPath("userData"), "local-mems", props.content._id + ".pdf")
    const localExists = fs.existsSync(localPathAbsolute)
    const url = viewingLocal ? localPath : remotePath

    const switchButtonMessage = `Switch to ${viewingLocal ? "live" : "local"} version`
    const versionIcon = viewingLocal ? IconNames.DATABASE : IconNames.GLOBE_NETWORK

    return (
        <div className="content-viewer">
            <div className="content-toolbar bp3-light">
                <div style={{ display: "flex" }}>
                    <Tooltip content="Go back to search results" position={Position.BOTTOM}>
                        <Button onClick={handleGoBack} className="toolbar-button"><Icon icon={IconNames.ARROW_LEFT} iconSize={36} /></Button>
                    </Tooltip>
                    <div style={{ width: "5rem" }}></div>
                    <Tooltip content="Show annotations" position={Position.BOTTOM}>
                        <Button onClick={handleToggleAnnotations} className="toolbar-button" style={{ marginRight: "1rem" }}><Icon icon={IconNames.ANNOTATION} iconSize={36} /></Button>
                    </Tooltip>
                    <Tooltip content={switchButtonMessage} position={Position.BOTTOM}>
                        <Button onClick={handleSwitchVersion} className="toolbar-button"><Icon icon={IconNames.EXCHANGE} iconSize={36} /></Button>
                    </Tooltip>
                    <Tooltip content="Download fresh version" position={Position.BOTTOM}>
                        <Button className="toolbar-button"><Icon icon={IconNames.DOWNLOAD} iconSize={36} /></Button>
                    </Tooltip>
                    <Tooltip content="View version history" position={Position.BOTTOM}>
                        <Button className="toolbar-button"><Icon icon={IconNames.HISTORY} iconSize={36} /></Button>
                    </Tooltip>
                    <Tooltip content="Open in browser" position={Position.BOTTOM}>
                        <Button className="toolbar-button" onClick={() => electron.shell.openExternal(remotePath)} style={{ marginLeft: "1rem" }}><Icon icon={IconNames.APPLICATION} iconSize={36} /></Button>
                    </Tooltip>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <div className="local-status-message">
                        <b>Viewing {viewingLocal ? " local " : " live "}</b>: {props.content.name}
                    </div>
                    <Icon className="version-icon" icon={versionIcon} iconSize={32} />
                </div>
            </div>

            {(localExists || !viewingLocal) &&
                <iframe className="content-iframe" src={url} />
            }

            {(!localExists && viewingLocal) &&
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
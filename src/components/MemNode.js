import React from "react"
import './MemNode.css'
import MiniAnnotations from './MiniAnnotations'
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";
import DSConnectorRegistry from "../DSConnectorRegistry";
const path = require('path')

export default function MemNode(props) {

    const thumbnailPath = "memexdata://" + path.join("thumbnails", props.mem._id) + ".png"

    const handleClick = e => {
        props.setAnnotationItem(null) 
        props.openItemFunc(props.mem, false)
    }
    
    return (
        <div className="mem-node" onClick={handleClick}>

            <div className='mem-text'>
                <span className="ds-icon-container">
                    <Icon style={{ color: "#ced9e0"}} icon={DSConnectorRegistry.getDataSourceIcon(props.mem.dataSourceId)} iconSize={20} />
                </span>
                {props.mem.name}
            </div>
            <div className="mem-thumbnail" style={{backgroundImage: "url(" + thumbnailPath + ")"}}></div>
            
            {(props.mem.notes || props.mem.tags) && 
                <MiniAnnotations mem={props.mem} setAnnotationItem={props.setAnnotationItem} />
            }
        </div>
    )
}
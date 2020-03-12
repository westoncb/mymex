import React from "react"
import './MemNode.css'
import MiniAnnotations from './MiniAnnotations'
const path = require('path')

export default function MemNode(props) {
    
    return (
        <div className="mem-node" onClick={e => props.openItemFunc(props.mem, false)}>
            <div className='mem-text'>{props.mem.name}</div>
            <img className="mem-thumbnail" src={"memexdata://" + path.join("thumbnails", props.mem._id) + ".png"} alt="" />
            
            {(props.mem.notes || props.mem.tags) && 
                <MiniAnnotations mem={props.mem} />
            }
        </div>
    )
}
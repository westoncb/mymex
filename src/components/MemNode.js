import React from "react"
import './MemNode.css'
const path = require('path')

export default function MemNode(props) {
    
    return (
        <div className="node">
            <div className="leaf-label" onClick={e => props.openItemFunc(props.node, false)}>
                <img className="leaf-thumbnail" src={"memexdata://" + path.join("thumbnails", props.node._id) + ".png"} alt="" />
                <div className='leaf-text'>{props.node.name}</div>
                {/* <div className="meta-panel" style={{visibility: this.state.hasMouse ? "visible" : "hidden"}}>
                            <div className="meta-top">
                                <div className="notes-editor" contentEditable={true}>
                                    Here are some notes about this item.
                                    <br/>
                                    <br />
                                    It should be possible to refer to other items here with hypertext.
                                </div>
                            </div>
                            <div className="meta-bottom">
                                <div className="meta-bottom-left">
                                    {
                                    (props.node.tags || []).map((tag, i) => (
                                            <div className="tag" key={tag + "" + i}>{tag}</div>
                                        ))
                                    }
                                </div>
                                <div className="meta-bottom-right">
                                <button className="add-tag-button"><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            </div>
                        </div> */}
            </div>
        </div>
    )
}
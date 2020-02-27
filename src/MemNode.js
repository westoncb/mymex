import React, { PureComponent } from "react";
import './MemNode.css'

class FolderNode extends PureComponent {

    render() {
        return (

            <div className="node">
                <div className="leaf-label" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseExit} onClick={this.handleLeafClick}>
                    <div className="leaf-thumbnail"></div>
                    <div className='leaf-text'>{this.props.node.name}</div>
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
                                    (this.props.node.tags || []).map((tag, i) => (
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
}

export default FolderNode
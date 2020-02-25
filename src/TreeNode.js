import React, { PureComponent } from "react";
import './TreeNode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Util from "./Util";

export default class TreeNode extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node,
            collapsed: props.node.type === "folder",
            hasMouse: false
        };
    }

    handleFolderClick = (e) => {
        e.stopPropagation()

        this.setState((state, props) => {
            return { collapsed: !state.collapsed }
        })
    }

    handleLeafClick = (e) => {
        e.stopPropagation()

        this.props.openItemFunc(this.props.node)
    }

    isLeaf() {
        return Util.isLeaf(this.props.node)
    }

    mouseEnter = (e) => {
        this.setState({ hasMouse: true })
    }

    mouseExit = (e) => {
        this.setState({ hasMouse: false })
    }

    render() {
        let nodeIcon
        if (this.state.collapsed) {
            nodeIcon = <FontAwesomeIcon icon={faPlus} />
        } else if (!this.isLeaf()) {
            nodeIcon = <FontAwesomeIcon icon={faMinus} />
        }

        const folderChildren = [];
        const leafChildren = [];

        (this.props.node.children || []).forEach(child => {
            if (Util.isLeaf(child)) {
                leafChildren.push(child)
            } else {
                folderChildren.push(child)
            }
        })

        return (
            
        <div className="node" style={{marginLeft: this.props.depth*2 + "rem"}}>
                {this.isLeaf() && 
                    <div className="leaf-label" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseExit} onClick={this.handleLeafClick}>
                        <div className="leaf-thumbnail"></div>
                        <div className='leaf-text'>{this.props.node.name}</div>
                        <div className="meta-panel" style={{visibility: this.state.hasMouse ? "visible" : "hidden"}}>
                            <div className="meta-top">
                                <div className="notes-editor" contentEditable={true}>
                                    {/* Here are some notes about this item.
                                    <br/>
                                    <br />
                                    It should be possible to refer to other items here with hypertext. */}
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
                        </div>
                    </div>
                }

                {!this.isLeaf() && this.props.node.guid &&
                    <div className="node-label" onClick={this.handleFolderClick}>
                        <div className="left-section">
                            {nodeIcon}
                            <div className='node-text'>{this.props.node.name}</div>
                        </div>
                    </div>
                }

                {!this.state.collapsed &&
                    <div>
                        <div className="folder-children">
                            {folderChildren.map(child => (
                                <TreeNode
                                    key={child.guid}
                                    node={child}
                                    collapsed={child.type === 'folder'}
                                    depth={this.props.depth + 1}
                                    openItemFunc={this.props.openItemFunc}
                                />
                            ))}
                        </div>

                        <div className="leaf-children">
                            {leafChildren.map(child => (
                                <TreeNode
                                    key={child.guid}
                                    node={child}
                                    collapsed={child.type === 'folder'}
                                    depth={this.props.depth + 1}
                                    openItemFunc={this.props.openItemFunc}
                                />
                            ))}
                        </div>
                    </div>
                }
        </div>
        );
    }
}
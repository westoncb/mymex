import React, { PureComponent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './FolderNode.css'

class FolderNode extends PureComponent {

    handleClick = e => {
        e.stopPropagation()
        this.props.folderToggleFunc(this.props.node)
    }

    render() {
        let nodeIcon
        if (this.props.node.collapsed) {
            nodeIcon = <FontAwesomeIcon icon={faPlus} />
        } else {
            nodeIcon = <FontAwesomeIcon icon={faMinus} />
        }

        return (
            <div className="folder-node no-select" onClick={this.handleClick} style={{ marginLeft: this.props.node.depth * 2 + "rem" }}>
                <div className="left-section">
                    {nodeIcon}
                    <div className='node-text'>{this.props.node.name}</div>
                </div>
            </div>
        )
    }
}

export default FolderNode
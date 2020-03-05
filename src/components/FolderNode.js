import React, { PureComponent } from "react";
import './FolderNode.css'
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import DataStore from '../DataStore'
import MemNode from './MemNode'

class FolderNode extends PureComponent {

    state = {folderChildren: [], memChildren: [], collapsed: true}

    handleClick = async e => {
        e.stopPropagation()

        if (this.state.collapsed) {
            const children = await DataStore.getMems(this.props.node.children)
            const memChildren = []
            const folderChildren = []

            children.forEach(child => {
                child.isLeaf ? memChildren.push(child) : folderChildren.push(child)
            })

            this.setState({memChildren, folderChildren})
        } else {

            this.setState({ memChildren: [], folderChildren: [] })
        }

        this.setState((state, props) => ({ collapsed: !state.collapsed }))
    }

    render() {
        let nodeIcon
        if (this.state.collapsed) {
            nodeIcon = <Icon icon={IconNames.PLUS} />
        } else {
            nodeIcon = <Icon icon={IconNames.MINUS} />
        }

        return (
            <div>
                <div className="folder-node no-select" onClick={this.handleClick}>
                    <div className="left-section">
                        {nodeIcon}
                        <div className='node-text'>{this.props.node.name}</div>
                    </div>
                </div>

                <div className="folder-children" style={{ marginLeft: this.props.depth * 2 + "rem" }}>
                    {this.state.folderChildren.map(folder => (
                        <FolderNode
                            key={folder._id}
                            depth={this.props.depth + 1}
                            node={folder}
                            openItemFunc={this.props.openItemFunc}
                        />
                    ))}
                </div>

                <div className="leaf-children" style={{ marginLeft: this.props.depth * 2 + "rem" }}>
                    {this.state.memChildren.map(folder => (
                        <MemNode
                            key={folder._id}
                            depth={this.props.depth + 1}
                            node={folder}
                            openItemFunc={this.props.openItemFunc}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default FolderNode
import React, { useState } from "react";
import './FolderNode.css'
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import DataStore from '../DataStore'
import MemNode from './MemNode'

export default function FolderNode(props) {

    const [folderChildren, setFolderChildren] = useState([])
    const [memChildren, setMemChildren] = useState([])
    const [collapsed, setCollapsed] = useState(true)

    const handleClick = async e => {
        e.stopPropagation()

        if (collapsed) {
            const children = await DataStore.getMems(props.node.children)
            const memChildren = []
            const folderChildren = []

            children.forEach(child => {
                child.isLeaf ? memChildren.push(child) : folderChildren.push(child)
            })

            setMemChildren(memChildren)
            setFolderChildren(folderChildren)
        } else {

            setMemChildren([])
            setFolderChildren([])
        }

        setCollapsed(!collapsed)
    }

    const nodeIcon = collapsed ? <Icon icon={IconNames.PLUS} /> : <Icon icon={IconNames.MINUS} />

    return (
        <div>
            <div className="folder-node no-select" onClick={handleClick}>
                <div className="left-section">
                    {nodeIcon}
                    <div className='node-text'>{props.node.name}</div>
                </div>
            </div>

            <div className="folder-children" style={{ marginLeft: props.depth * 2 + "rem" }}>
                {folderChildren.map(folder => (
                    <FolderNode
                        key={folder._id}
                        depth={props.depth + 1}
                        node={folder}
                        openItemFunc={props.openItemFunc}
                        setAnnotationItem={props.setAnnotationItem}
                    />
                ))}
            </div>

            <div className="leaf-children" style={{ marginLeft: props.depth * 2 + "rem" }}>
                {memChildren.map(folder => (
                    <MemNode
                        key={folder._id}
                        depth={props.depth + 1}
                        mem={folder}
                        openItemFunc={props.openItemFunc}
                        setAnnotationItem={props.setAnnotationItem}
                    />
                ))}
            </div>
        </div>
    )
}
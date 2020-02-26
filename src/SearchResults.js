import React, { PureComponent } from "react";
import './SearchResults.css';
import TreeNode from './TreeNode'
import Util from './Util'

export default class SearchResults extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            visible: props.visible
        }
    }

    render() {

        return (
            <div>
                {(this.props.visible) &&
                    <div className="results-panel-parent">
                        <div className="results-panel">

                            {this.props.sections.map(section => (
                                <div key={section.id + "_section" + "_" + section.name} className="result-section">
                                    <div className="result-path">
                                        {section.title}
                                    </div>

                                    <div className="folder-children">
                                        {section.folders.map(child => (
                                            <TreeNode
                                                key={child._id}
                                                node={child}
                                                collapsed={!child.isLeaf}
                                                depth={this.props.depth + 1}
                                                openItemFunc={this.props.openItemFunc}
                                            />
                                        ))}
                                    </div>

                                    <div className="leaf-children">
                                        {section.mems.map(child => (
                                            <TreeNode
                                                key={child._id}
                                                node={child}
                                                collapsed={!child.isLeaf}
                                                depth={this.props.depth + 1}
                                                openItemFunc={this.props.openItemFunc}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
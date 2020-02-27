import React, { PureComponent } from "react";
import './SearchResults.css';
import FolderNode from './FolderNode'
import MemNode from './MemNode'

export default class SearchResults extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            visible: props.visible
        }
    }

    render() {
        const sections = Object.keys(this.props.sections).map(key => this.props.sections[key])

        return (
            <div>
                {(this.props.visible) &&
                    <div className="results-panel-parent">
                        <div className="results-panel">

                        {sections.map(section => (
                                <div key={section.id + "_section" + "_" + section.name} className="result-section">
                                    <div className="result-path">
                                        {section.title}
                                    </div>

                                    <div className="folder-children">
                                        {section.folders.map(folder => (
                                            <FolderNode
                                                key={folder._id}
                                                node={folder}
                                                depth={1}
                                            />
                                        ))}
                                    </div>

                                    <div className="leaf-children">
                                        {section.mems.map(child => (
                                            <MemNode
                                                key={child._id}
                                                node={child}
                                                depth={1}
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
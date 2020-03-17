import React from "react";
import './SearchResults.css';
import FolderNode from './FolderNode'
import MemNode from './MemNode'

export default function SearchResults(props) {

    const sections = Object.keys(props.sections).
        map(key => props.sections[key]).
        filter(section => typeof section === "object")

    return (
        <div>
            {(props.visible) &&
                <div className="results-panel">

                    {sections.filter(section => section.folders.length > 0 || section.mems.length > 0).map(section => (
                        <div key={section.id} className="result-section">
                            <div className="result-path">
                                {section.title}
                            </div>

                            <div className="folder-children">
                                {section.folders.map(folder => (
                                    <FolderNode
                                        key={folder._id}
                                        node={folder}
                                        depth={1}
                                        openItemFunc={props.openItemFunc}
                                        setAnnotationItem={props.setAnnotationItem}
                                    />
                                ))}
                            </div>

                            <div className="leaf-children">
                                {section.mems.map(child => (
                                    <MemNode
                                        key={child._id}
                                        mem={child}
                                        depth={1}
                                        openItemFunc={props.openItemFunc}
                                        setAnnotationItem={props.setAnnotationItem}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
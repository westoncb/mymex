import React, {useState} from "react"
import './MiniAnnotations.css'
import { Icon, OverflowList, Classes, Tag, Boundary } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { useSpring, animated } from 'react-spring'

export default function MiniAnnotations(props) {
    const [hasMouse, setHasMouse] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [flexDirection, setFlexDirection] = useState("row")
    const panelProps = useSpring({
            height: hasMouse ? "100%" : "3rem",
            backgroundColor: hasMouse ? "rgba(220, 220, 255, 0.3)" : "rgba(255, 255, 255, 0.2)",
            onRest: () => { setExpanded(hasMouse); setFlexDirection(hasMouse ? "column" : "row")},
            config: {duration: 200}
        })
    const notes = props.mem.notes
    const tags = props.mem.tags || []

    const notesElements = expanded 
                            ? <div><div className="notes-preview">{notes}</div> <hr /></div> 
                            : <Icon style={{ ...props, color: "#ddbc44", marginRight: "0.5rem" }} icon={IconNames.COMMENT} iconSize={20} />
    const tagsElements = !expanded 
                            ? <OverflowList
                                key="2"
                                items={tags}
                                overflowRenderer={overflowItems => {
                                    return <span className={Classes.BREADCRUMBS_COLLAPSED} />
                                }}
                                visibleItemRenderer={(item, index) => {
                                    return <Tag className="mini-tag" key={index}>{item}</Tag>
                                }}
                                collapseFrom={Boundary.END}
                                />
                            : 
                                <div className="tags-preview-list">
                                    {tags.map(tag => (<Tag className="mini-tag" key={tag}>{tag}</Tag>))}
                                </div>


    return (
        <animated.div 
            className="mini-annotations"
            style={{ ...panelProps, flexDirection }}
            onMouseEnter={e => setHasMouse(true)}
            onMouseLeave={e => { setHasMouse(false); setFlexDirection("row"); setExpanded(false)}}
            onClick={e => e.stopPropagation()}>

            {notes && 
                notesElements
            }
            {tags.length > 0 && 
                tagsElements
            }
        </animated.div>
    )
}
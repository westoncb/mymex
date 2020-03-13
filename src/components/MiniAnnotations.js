import React from "react"
import './MiniAnnotations.css'
import { Icon, OverflowList, Classes, Tag, Boundary } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";

export default function MiniAnnotations(props) {



    return (
        <div className="mini-annotations">

            {props.mem.notes &&
                <Icon style={{ color: "#ffed66", marginRight: "0.5rem"}} icon={IconNames.COMMENT} iconSize={20}/>
            }

            {props.mem.tags && 
                <OverflowList
                    items={props.mem.tags}
                    overflowRenderer={overflowItems => {
                        return <span className={Classes.BREADCRUMBS_COLLAPSED} />
                    }}
                    visibleItemRenderer={(item, index) => {
                        return <Tag className="mini-tag" key={index}>{item}</Tag>
                    }}
                    collapseFrom={Boundary.END}
                />
            }
        </div>
    )
}
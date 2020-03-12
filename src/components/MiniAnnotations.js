import React from "react"
import './MiniAnnotations.css'
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";

export default function MiniAnnotations(props) {

    return (
        <div className="mini-annotations">

            {props.mem.notes &&
                <Icon style={{ color: "#ccc"}} icon={IconNames.COMMENT} iconSize={16}/>
            }
        </div>
    )
}
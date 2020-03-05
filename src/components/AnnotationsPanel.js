import React, { useState, useEffect } from "react"
import './AnnotationsPanel.css'
import { TagInput, EditableText} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";
import DataStore from '../DataStore'

export default function AnnotationsPanel(props) {
    const [tags, setTags] = useState([])
    const [notes, setNotes] = useState("")

    useEffect(() => {
        const func = async () => {
            const mem = await DataStore.getMem(props.mem._id)
            setTags(mem.tags || tags)
            setNotes(mem.notes || notes)
        }
        func()
    }, [props.mem._id])

    const handleTagChange = tags => {
        setTags(tags)
        DataStore.setMemTags(props.mem._id, tags)
    }
    const handleNotesTextChange = notes => {
        setNotes(notes)
        DataStore.setMemNotes(props.mem._id, notes)
    }

    return (
        <div className="annotations-panel bp3-dark">
            <EditableText
                multiline
                alwaysRenderInput
                placeholder="Write notes here"
                minLines={1}
                maxLines={5}
                onChange={handleNotesTextChange}
                value={notes}
            />
            <TagInput
                leftIcon={IconNames.TAG}
                values={tags}
                onChange={handleTagChange}
            />
        </div>
    )
}
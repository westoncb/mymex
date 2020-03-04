import React, {PureComponent} from "react"
import './AnnotationsPanel.css'
import { TagInput, EditableText} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";
import DataStore from './DataStore'

class AnnotationsPanel extends PureComponent {

    constructor(props) {
        super(props)

        this.state = { tags: this.props.mem.tags || [], notes: this.props.mem.notes || ""}
    }

    handleTagChange = tags => {
        this.setState({tags})
        DataStore.setMemTags(this.props.mem._id, tags)
    }
    handleNotesTextChange = notes => {
        this.setState({ notes })
        DataStore.setMemNotes(this.props.mem._id, notes)
    }

    render() {
        const { tags } = this.state

        return (
            <div className="annotations-panel bp3-dark">
                <EditableText
                    multiline
                    alwaysRenderInput
                    placeholder="Write notes here"
                    minLines={1}
                    maxLines={5}
                    onChange={this.handleNotesTextChange}
                    value={this.state.notes}
                />
                <TagInput
                    leftIcon={IconNames.TAG}
                    values={this.state.tags}
                    onChange={this.handleTagChange}
                />
            </div>
        )
    }
}

export default AnnotationsPanel
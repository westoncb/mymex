import React, {PureComponent} from "react"
import './AnnotationsPanel.css'
import { TagInput, EditableText} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons";

class AnnotationsPanel extends PureComponent {

    state = {tags: [], notesString: ""}

    handleTagChange = tags => this.setState({ tags })
    handleNotesTextChange = notesString => this.setState({ notesString })

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

                />
                <TagInput
                    leftIcon={IconNames.TAG}
                    values={tags}
                    onChange={this.handleTagChange}
                />
            </div>
        )
    }
}

export default AnnotationsPanel
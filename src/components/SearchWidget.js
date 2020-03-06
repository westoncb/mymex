import React, { useState } from "react";
import DataSourceDialog from './DataSourceDialog';
import './SearchWidget.css'
import { Icon, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default function SearchWidget(props) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const textInput = React.createRef()

    const handleTextChange = e => {
        const string =  e.target.value || ""
        props.updateSearchString(string)
    }

    return (
        <div className="search-widget-container">
            <div className="input-results-group">
                <input autoFocus className="search-input" type="text" ref={textInput} onChange={handleTextChange} />
            </div>

            <Button style={{ flexShrink: 0 }} onClick={() => setIsDialogOpen(true)}>
                <Icon icon={IconNames.DIAGRAM_TREE} iconSize={42} />
            </Button>
            <DataSourceDialog isOpen={isDialogOpen} handleClose={() => setIsDialogOpen(false)}></DataSourceDialog>
        </div>
    )
}
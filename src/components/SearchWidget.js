import React, { useState } from "react";
import DataSourceDialog from './DataSourceDialog';
import './SearchWidget.css'
import { Icon, Button, InputGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default function SearchWidget(props) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleTextChange = e => {
        const string =  e.target.value || ""
        props.updateSearchString(string)
    }

    return (
        <div className="search-widget-container">
            <div className="input-results-group">
                <InputGroup
                    autoFocus
                    large={true}
                    leftIcon="search"
                    onChange={handleTextChange}
                    placeholder="Search..."
                />
            </div>

            <Button style={{ flexShrink: 0 }} onClick={() => setIsDialogOpen(true)}>
                <Icon icon={IconNames.DIAGRAM_TREE} iconSize={42} />
            </Button>
            <DataSourceDialog isOpen={isDialogOpen} handleClose={() => setIsDialogOpen(false)}></DataSourceDialog>
        </div>
    )
}
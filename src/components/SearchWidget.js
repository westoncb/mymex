import React, { PureComponent } from "react";
import DataSourceDialog from './DataSourceDialog';
import './SearchWidget.css'
import { Icon, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class SearchWidget extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputFocused: false,
            isDialogOpen: false
        }

        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

        this.textInput = React.createRef();        
    }

    handleFocus(e) {
        this.setState({ inputFocused: true })
    }

    handleBlur(e) {
        // this.setState({ inputFocused: false })
    }

   handleTextChange(e) {
      const string =  e.target.value || ""
      this.props.updateSearchString(string)
   }

   handleOpen = () => this.setState({ isDialogOpen: true })
   handleClose = () => this.setState({ isDialogOpen: false })

    render() {
        return (
            <div className="search-widget-container" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                <div className="input-results-group">
                  <input autoFocus className="search-input" type="text" ref={this.textInput} onChange={this.handleTextChange} />
                </div>

              <Button style={{flexShrink: 0}} onClick={this.handleOpen}>
                 <Icon icon={IconNames.DIAGRAM_TREE} iconSize={42} />
              </Button>
              <DataSourceDialog isOpen={this.state.isDialogOpen} handleClose={this.handleClose}></DataSourceDialog>
            </div>
        )
    }
}
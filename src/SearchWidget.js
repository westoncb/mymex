import React, { PureComponent } from "react";
import SearchResults from './SearchResults.js';
import DataSourceDialog from './DataSourceDialog';
import DataStore from './DataStore';
import './SearchWidget.css'
import { Icon, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class SearchWidget extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            resultSections: {},
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
        this.getResultSections(string).then(sections => {
           if (string !== "") {
              this.setState({ resultSections: sections })
           } else {
              this.setState({ resultSections: [] })
           }
        })
    }

    async getResultSections(string) {
        const results = await DataStore.getMemNodesMatching(string)
        return this.createResultSections(results)
    }

   async createResultSections(results) {
      const rootTitle = results.length === 0 ? "no results" : ""

      const sections = {}
      const rootSection = this.getSection("root", rootTitle, sections)
      const parentCache = {}

      for (const mem of results) {

         if (mem.parent) {
            const parent = await this.getParent(mem, parentCache)
            const sectionTitle = (parent.path || parent.name)
            const section = this.getSection(mem.parent, sectionTitle, sections)

            if (mem.isLeaf)
               section.mems.push({ depth: 0, ...mem})
            else
               section.folders.push({ depth: 0, collapsed: true, parentSection: section, ...mem })
         } else {
            rootSection.folders.push(mem)
         }
      }

      return sections
   }

   toggleFolderState = folderNode => {

      this.setState((state, props) => {
         const section = folderNode.parentSection
         const folders = [...section.folders]
         const folderIndex = folders.indexOf(folderNode)
         
         folders[folderIndex] = { ...folderNode, collapsed: !folderNode.collapsed}
         return { resultSections: { ...state.resultSections, [section.id]: { ...section, folders }} }
      })
   }

   async getParent(mem, cache) {
      const parent = cache[mem._id] || await DataStore.getMem(mem.parent)
      cache[mem._id] = parent

      return parent
   }

   getSection(id, title, sections) {
      const section = sections[id] || { id, title, mems: [], folders: []}
      sections[id] = section

      return section
   }

   handleOpen = () => this.setState({ isDialogOpen: true })
   handleClose = () => this.setState({ isDialogOpen: false })

    render() {
        return (
            <div className="search-widget-container" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                <div className="input-results-group">
                  <input className="search-input" type="text" ref={this.textInput} onChange={this.handleTextChange} />
                  <SearchResults sections={this.state.resultSections} visible={this.state.inputFocused} folderToggleFunc={this.toggleFolderState} openItemFunc={this.props.openItemFunc} />
                </div>

              <Button style={{flexShrink: 0}} onClick={this.handleOpen}>
                 <Icon icon={IconNames.DIAGRAM_TREE} iconSize={42} />
              </Button>
              <DataSourceDialog isOpen={this.state.isDialogOpen} handleClose={this.handleClose}></DataSourceDialog>
            </div>
        )
    }
}
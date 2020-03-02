import React, { Component } from 'react'
import './App.css'
import SearchWidget from './SearchWidget'
import SearchResults from './SearchResults'
import ContentViewer from './ContentViewer'
import OpenTray from './OpenTray'
import DataStore from './DataStore'
import { ProgressBar } from "@blueprintjs/core";

class App extends Component {

  state = { tabs: [], activeItem: null, resultSections: {}, activeJob: null}
  searchPromiseCount = 0

  constructor(props) {
    super(props)

    DataStore.init()

    setInterval(() => {
      this.setState((state, props) => {
        if (state.activeJob !== DataStore.activeJob) {
          return {activeJob: DataStore.activeJob}
        } else {
          return state
        }
      })
    }, 1500)
  }

  updateSearchString(string) {

    this.setState({activeItem: null})

    this.createResultSections(string).then(sections => {
      if (sections.promiseId === this.searchPromiseCount) {
        if (string !== "") {
          this.setState({ resultSections: sections })
        } else {
          this.setState({ resultSections: [] })
        }
      }
    })
  }

  async createResultSections(string) {
    const results = await DataStore.getMemNodesMatching(string)
    const rootTitle = results.length === 0 ? "no results" : ""

    const sections = { promiseId: ++this.searchPromiseCount }
    const rootSection = this.getSection("root", rootTitle, sections)
    const parentCache = {}

    for (const mem of results) {

      if (mem.parent) {
        const parent = await this.getParent(mem, parentCache)
        const sectionTitle = (parent.path || parent.name)
        const section = this.getSection(mem.parent, sectionTitle, sections)

        if (mem.isLeaf)
          section.mems.push(mem)
        else
          section.folders.push(mem)
      } else {
          rootSection.folders.push(mem)
      }
    }

    return sections
  }

  async getParent(mem, cache) {
    const parent = cache[mem._id] || await DataStore.getMem(mem.parent)
    cache[mem._id] = parent

    return parent
  }

  getSection(id, title, sections) {
    const section = sections[id] || { id, title, mems: [], folders: [] }
    sections[id] = section

    return section
  }

  openItem = (item, tabOnly) => {
    this.setState((state, props) => {
      const activeItem = tabOnly ? this.state.activeItem : item
      return {tabs: state.tabs.concat(item), activeItem}
    })
  }

  render() {

    return (
      <div className="App">
        <div className="app-top">
          <OpenTray openItems={this.state.tabs} />

          <div className="right-column">
            <div className="App-header">
              <SearchWidget openItemFunc={this.openItem} updateSearchString={this.updateSearchString.bind(this)} />
            </div>

            {this.state.activeItem &&
              <ContentViewer content={this.state.activeItem} />
            }

            {!this.state.activeItem &&
              <SearchResults sections={this.state.resultSections} visible={true} openItemFunc={this.openItem} />
            }
          </div>
        </div>
        {this.state.activeJob && 
          <div className="status-bar">
          <div style={{flexShrink: '0'}}>({DataStore.jobCount} remaining)</div>
            <div className="prog-container">
              <ProgressBar value={null} />
            </div>
          <div className="download-location-text">Downloading local copy: {this.state.activeJob.location}</div>
          </div>
        }
      </div>
    )
  }
}

export default App;

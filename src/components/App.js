import React, { useState } from 'react'
import './App.css'
import SearchWidget from './SearchWidget'
import SearchResults from './SearchResults'
import ContentViewer from './ContentViewer'
import OpenTray from './OpenTray'
import DataStore from '../DataStore'
import DataSourceWorkPump from '../DataSourceWorkPump'
import { ProgressBar } from "@blueprintjs/core";

let initialized = false
let searchPromiseCount = 0
const dsWorkPump = new DataSourceWorkPump()

export default function App(props) {

  const [tabs, setTabs] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [resultSections, setResultSections] = useState({})
  const [activeJob, setActiveJob] = useState(null)
  const [jobCount, setJobCount] = useState(0)

  if (!initialized) {
    initialized = true
    DataStore.init()
    DataStore.getAllDataSources(dataSources => {
      dsWorkPump.init(dataSources)
    })
    dsWorkPump.subscribeToJobChangeEvents((job, count) => {
      setActiveJob(job)
      setJobCount(count)
    })
  }

  const clearActiveItem = () => {
    setActiveItem(null)
  }

  const updateSearchString = (string) => {
    clearActiveItem()

    createResultSections(string).then(sections => {
      if (sections.promiseId === searchPromiseCount) {
        if (string !== "") {
          setResultSections(sections)
        } else {
          setResultSections([])
        }
      }
    })
  }

  const openItem = (item, tabOnly) => {
    setActiveItem( tabOnly ? activeItem : item )
    setTabs(tabs.concat(item))
  }

  return (
    <div className="App">
      <div className="app-top">
        {/* <OpenTray openItems={tabs} /> */}

        <div className="right-column">
          <div className="App-header">
            <SearchWidget openItemFunc={openItem} updateSearchString={updateSearchString} />
          </div>

          {activeItem &&
            <ContentViewer content={activeItem} goBackFunc={clearActiveItem} />
          }

          {!activeItem &&
            <SearchResults sections={resultSections} visible={true} openItemFunc={openItem} />
          }
        </div>
      </div>
      {activeJob &&
        <div className="status-bar">
          <div style={{ flexShrink: '0' }}>({jobCount} remaining)</div>
          <div className="prog-container">
            <ProgressBar value={null} />
          </div>
          <div className="download-location-text">Downloading local copy: {activeJob.customData.location}</div>
        </div>
      }
    </div>
  )
}

const createResultSections = async (string) => {
  const results = await DataStore.getMemNodesMatching(string)
  const rootTitle = results.length === 0 ? "no results" : ""

  const sections = { promiseId: ++searchPromiseCount }
  const rootSection = getSection("root", rootTitle, sections)
  const parentCache = {}

  for (const mem of results) {

    if (mem.parent) {
      const parent = await getParent(mem, parentCache)
      const sectionTitle = (parent.path || parent.name)
      const section = getSection(mem.parent, sectionTitle, sections)

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

const getParent = async (mem, cache) => {
  const parent = cache[mem._id] || await DataStore.getMem(mem.parent)
  cache[mem._id] = parent

  return parent
}

const getSection = (id, title, sections) => {
  const section = sections[id] || { id, title, mems: [], folders: [] }
  sections[id] = section

  return section
}
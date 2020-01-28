import React, { Component } from 'react';
import './App.css';
import SearchWidget from './SearchWidget';
import OpenTray from './OpenTray';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {openItems: []}
  }

  openItem = (item) => {
    this.setState((state, props) => {
      return {openItems: state.openItems.concat(item)}
    })
  }

  render() {

    return (
      <div className="App">
        <OpenTray openItems={this.state.openItems}/>
        
        <div className="right-column">
          <div className="App-header">
            <SearchWidget openItemFunc={this.openItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

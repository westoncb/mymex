import React, { Component } from 'react';
import './App.css';
import SearchWidget from './SearchWidget';

class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="App-header">
          <SearchWidget/>
        </div>
        
      </div>
    );
  }
}

export default App;

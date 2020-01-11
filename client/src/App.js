import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/navbar/index.js'
import List from './components/list/index.js'

function App() {
  return (
      <div className="App">
        <List name="test" />
      </div>
  );
}

export default App;

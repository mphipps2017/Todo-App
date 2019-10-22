import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar/index.js'

function App() {
  return (
    <HashRouter>
      <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={} />
            <Route path='/about' component={} />
          </Switch>
      </div>
    </HashRouter>
  );
}

export default App;

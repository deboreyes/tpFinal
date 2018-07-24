import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Item from './components/Item';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <Search/>
            <Switch>
              <Route exact path='/items/:id' component={Item} />
              <Route exact path='/items' component={Results} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

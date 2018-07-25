import React from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Item from './components/Item';
import { Message } from './components/Message';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const App = () =>
  <div className='App'>
    <Router>
      <div>
        <Search />
        <Switch>
          <Route exact path='/' />
          <Route exact path='/items/:id' component={Item} />
          <Route exact path='/items' component={Results} />
          <Route render={() => <Message data='404' />} />
        </Switch>
      </div>
    </Router>
  </div>

export default App;
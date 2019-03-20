import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CameraPage from './components/pages/CameraPage';
import FilePage from './components/pages/FilePage';
import RecordPage from './components/pages/RecordPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home}/>
          <Route exact path='/camera' component={CameraPage}/>
          <Route exact path='/file' component={FilePage}/>
          <Route exact path='/record' component={RecordPage}/>
        </Router>
      </div>
    );
  }
}

export default App;

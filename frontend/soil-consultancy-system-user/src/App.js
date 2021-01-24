import React from 'react'
import {Route,BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Home from './components/Home.js'
import reportForm from './components/reportForm';
import result from './components/result'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/reportForm" component={reportForm} />
        <Route path="/result" component={result} />
      </Router>
      
    </div>
  );
}

export default App;

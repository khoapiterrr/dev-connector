import React from 'react';
import { Navbar } from './components/layouts/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './components/layouts/Landing';
import './App.css';
import { Routes } from './components/routing/Routes';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;

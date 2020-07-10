import React, { useEffect } from 'react';
import { Navbar } from './components/layouts/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './components/layouts/Landing';
import './App.css';
import { Routes } from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './redux/Auth/AuthAction';
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log(process.env.REACT_APP_API_URI, 'ure');
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

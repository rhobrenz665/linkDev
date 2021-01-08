import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/shared/Navigation/NavBar';
import Landing from './components/shared/UIElements/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

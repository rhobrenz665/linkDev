import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../../components/auth/Login';
import Alert from '../shared/UIElements/Alert';
import Dashboard from '../../components/dashboard/Dashboard';
import NotFound from '../shared/UIElements/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

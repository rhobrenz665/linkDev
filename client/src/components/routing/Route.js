import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../../components/auth/Login';
import Alert from '../shared/UIElements/Alert';
import Dashboard from '../../components/dashboard/Dashboard';
import NotFound from '../shared/UIElements/NotFound';
import PrivateRoute from './PrivateRoute';
import ProfileForm from '../profile-forms/ProfileForm';
import AddEducation from '../profile-forms/AddEducation';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

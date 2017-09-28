import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './components/authentication/registration';
import Login from './components/authentication/login';
import Dashboard from './components/dashboard';
import PageNotFound from './components/page-not-found';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/registration" component={Registration} />
      <Route path="(/|/login)" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" exact={true} component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'https://erics-bucketlist-api.herokuapp.com/';

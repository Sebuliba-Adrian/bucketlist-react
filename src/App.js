import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/authentication/registration';
import Login from './components/authentication/login';
import Dashboard from './components/dashboard';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'https://erics-bucketlist-api.herokuapp.com/';

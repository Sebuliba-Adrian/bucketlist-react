import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/authentication/registration';
import Login from './components/authentication/login';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
    </div>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'http://127.0.0.1:5000/';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { requireAuthentication } from '../components/authenticatedComponent';
import App from '../components/app';
import Home from '../components/home';
import Login from '../components/login/login';
import Signup from '../components/login/signup'
import Dashboard from '../components/dashboard'

/******************************
 * Routes of application
 *****************************/
export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/dashboard' component={requireAuthentication(Dashboard)} />
  </Route>
);

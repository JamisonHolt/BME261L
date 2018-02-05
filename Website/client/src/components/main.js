import React from 'react';
import { Switch, Route, IndexRoute } from 'react-router-dom';

import Home from './home/index';
import Login from './login/index';
import Profile from './profile/index';

const Main = () => (
  <Switch>
    <Route exact path='/' component={ Home } />
    <Route path='/login' component={ Login } />
    <Route path='/profile' component={ Profile } />
  </Switch>
);

export default Main;

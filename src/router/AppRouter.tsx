import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { App, Room } from '../components';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ App } exact={ true } />  
      <Route path="/:room" component={ Room } exact={ true }/>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

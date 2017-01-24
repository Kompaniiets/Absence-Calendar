import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import LoginUser from './components/LoginUser';
import Calendar from './components/Calendar';

export default (
  <Route path="/" component={IndexPage}>
    <IndexRoute component={LoginUser} />
    <Route path="/login" component={LoginUser} />
    <Route path="/calendar" component={Calendar} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

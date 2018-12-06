import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/login/login';
import App from '../pages/app/app';

const router = (
    <Router>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/App' component={App} />
            <Route component={Login} />
        </Switch>
    </Router>
)

export default router;

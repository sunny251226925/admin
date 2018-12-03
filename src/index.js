import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import { Router, Route , browserHistory } from 'react-router';
import Login from './pages/login/login';
import Home from './pages/home/home';

const router = (
    <Router history={browserHistory} >
        <Route path='/' component={Login}/>
        <Route path='/Home' component={Home} />
    </Router>
)

ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();

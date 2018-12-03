import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Router, Route , browserHistory } from 'react-router';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { Provider } from 'react-redux';

const reducer = function(state=0, action) {
    return state;
}

const store = createStore(reducer);
// console.log(store.getState())
const router = (
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path='/' component={Login}/>
            <Route path='/Home' component={Home} />
        </Router>
    </Provider>
)

ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();

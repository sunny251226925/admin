import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Router, Route , browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Login from './pages/login/login';
import Home from './pages/home/home';
import achievementsRanking from './pages/achievements-ranking/achievements-ranking';

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
            <Route path='/achievements-ranking' component={achievementsRanking} />
            <Route component={Home} />
        </Router>
    </Provider>
)

ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();

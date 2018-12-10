import React from 'react';
import { Route, Switch } from 'react-router-dom';

import achievementsRanking from '../pages/achievements-ranking/achievements-ranking';
import welcome from '../pages/welcome/welcome';

class RouterSon extends React.Component{
    render(){
       return (
           <Switch>
               <Route path='/app/welcome' strict component={welcome} />
               <Route path='/app/achievements-ranking' strict component={achievementsRanking} />
           </Switch>
       );
    }
}

export default RouterSon;
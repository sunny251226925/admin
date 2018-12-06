import React from 'react';
import { Route, Switch } from 'react-router-dom';

import achievementsRanking from '../pages/achievements-ranking/achievements-ranking';

class RouterSon extends React.Component{
    render(){
       return (
           <Switch>
               <Route path='/app/achievements-ranking' strict component={achievementsRanking} />
           </Switch>
       );
    }
}

export default RouterSon;
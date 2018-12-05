import React from 'react'
import { Button } from 'antd'
import api from '../../utils/api'
import Home from '../home/home';

class achievementsRanking extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Home/>
            </div>
        );
    }
}

export default achievementsRanking;

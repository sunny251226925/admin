import React from 'react'
import { Input, Row, Col } from 'antd'

class achievementsRanking extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Row type="flex">
                    <Col>
                        <Input placeholder="mysite" maxLength={15}/>
                    </Col>
                    <Col>
                        <Input placeholder="mysite" maxLength={15}/>
                    </Col>
                    <Col>
                        <Input placeholder="mysite" maxLength={15}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default achievementsRanking;

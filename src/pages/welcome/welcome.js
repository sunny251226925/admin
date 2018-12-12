import React from 'react';
import { Row, Col, Select, Icon} from 'antd';
import { Link } from 'react-router-dom';
import { bar } from '../../utils/echarts';
import './welcome.css';

const Option = Select.Option;

class welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "欢迎光临"
        }
    }

    componentDidMount(){
        const Xdata = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
        const Ydata = [5, 20, 36, 10, 10, 20];
        bar('bar','',Xdata,Ydata);
        bar('bar2','',Xdata,Ydata);
        bar('bar3','',Xdata,Ydata);
    }

    render() {
        const levelOptions = [
            {id: 1, title: "在建"},
            {id: 2, title: "停工"},
            {id: 3, title: "竣工"},
            {id: 4, title: "延期"}
        ];

        return (
            <div className="welcome">
                <Row className='col-title'>项目管理</Row>
                <Row>
                    <Col span={8} className='padding'>
                        <div>
                            <span className="left">
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>项目进度
                            </span>
                            <Select value={levelOptions[0].id}
                                    size="small"
                                    className="right"
                                    onChange={this.scopeChange}>
                                {
                                    levelOptions.map( (item, index) =>
                                        <Option key={index} value={item.id}>{item.title}</Option>
                                    )
                                }
                            </Select>
                        </div>
                        <div id="bar" className="echarts" style={{ width: '100%', height: 300 }}></div>
                    </Col>
                    <Col span={8}  className='padding'>
                        <div>
                            <span className="left">
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>项目状态
                            </span>
                            <Link className="right" to="/app/achievements-ranking" >更多</Link>
                        </div>
                        <div id="bar2" className="echarts" style={{ width: '100%', height: 300 }}></div>
                    </Col>
                    <Col span={8} className='padding'>
                        <div>
                            <span className="left">
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>工程类别
                            </span>
                            <Link className="right" to="/app/engineeringSpeed" >更多</Link>
                        </div>
                        <div id="bar3" className="echarts" style={{ width: '100%', height: 300 }}></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default welcome;

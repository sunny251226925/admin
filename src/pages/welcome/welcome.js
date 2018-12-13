import React from 'react';
import { Row, Col, Select, Icon} from 'antd';
import { Link } from 'react-router-dom';
import { bar, strip, pie } from '../../utils/echarts';
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
        const bXdata = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
        const bYdata = [5, 20, 36, 10, 10, 20];
        bar('bar','',bXdata,bYdata);;

        const sYdata = ['周一','周二','周三','周四','周五','周六','周日'];
        const sXdata = [320, 302, 301, 334, 390, 330, 320];
        const slegend = ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎'];
        strip('strip','',sXdata,sYdata,slegend);

        const data = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ]
        const plegend = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];
        pie('pie','人员出勤占比','测试数据',data,plegend);
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
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>
                                <span>项目进度</span>
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
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>
                                <span>项目状态</span>
                            </span>
                            <Link className="right" to="/app/achievements-ranking" >更多</Link>
                        </div>
                        <div id="strip" className="echarts" style={{ width: '100%', height: 300 }}></div>
                    </Col>
                    <Col span={8} className='padding'>
                        <div>
                            <span className="left">
                                <Icon type="folder" theme="twoTone" style={{ fontSize: '20px'}}/>
                                <span>工程类别</span>
                            </span>
                            <Link className="right" to="/app/engineeringSpeed" >更多</Link>
                        </div>
                        <div id="pie" className="echarts" style={{ width: '100%', height: 300 }}></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default welcome;

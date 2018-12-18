import React from 'react';
import { Row, Col, Select, Icon} from 'antd';
import { Link } from 'react-router-dom';
import { bar, strip, pie } from '../../utils/echarts';
import MyIcon from '../../utils/myIcon';
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

        const sXdata2 = ['安全管理', '无尘施工','精准挖掘','安全帽佩戴','高压电工'];
        const sYdata2 = [20, 40, 60, 80, 100];
        bar('strip2','',sXdata2,sYdata2);
    }

    render() {
        const levelOptions = [
            {id: 1, title: "在建"},
            {id: 2, title: "停工"},
            {id: 3, title: "竣工"},
            {id: 4, title: "延期"}
        ];

        const commonly = [
            {icon: 'icon-headlines', name: '考核结果', url:'/app/achievements-ranking'},
            {icon: 'icon-barrage', name: '考核结果', url:'/app/achievements-ranking'},
            {icon: 'icon-document', name: '考核结果', url:'/app/achievements-ranking'},
            {icon: 'icon-dynamic', name: '考核结果', url:'/app/achievements-ranking'}
        ]

        return (
            <div >
                <div className="welcome-box">
                    <Row className='col-title'>常用模块</Row>
                    <Row className='border' type="flex" justify="start">
                        {
                            commonly.map( (item, index) =>
                                <Col span={2} className='text-center' key={index}>
                                    <p style={{height: '40px', lineHeight: '65px'}}>
                                        <MyIcon type={item.icon} className="MyIcon" style={{fontSize: 30 }}/>
                                    </p>
                                    <p style={{height: '40px', lineHeight: '25px'}}>
                                        <Link to={item.url}>{item.name}</Link>
                                    </p>
                                </Col>
                            )
                        }
                    </Row>
                </div>

                <div className="welcome-box">
                    <Row className='col-title'>项目管理</Row>
                    <Row className='border'>
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

                <div className="welcome-box">
                    <Row className='col-title'>安全管理</Row>
                    <Row className='border'>
                        <Col span={8} className='padding'>
                            <div>
                                <span className="left">
                                    <Icon type="tool" theme="twoTone" style={{ fontSize: '20px'}}/>
                                    <span>安全绩效</span>
                                </span>
                                <Link className="right" to="/app/achievements-ranking" >更多</Link>
                            </div>
                            <Row style={{margin: '30px 0 60px 0'}}>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />个人得分
                                    </p>
                                    <h1 className="color-3">123</h1>
                                </Col>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />个人排名
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                            </Row>
                            <Row style={{margin: '0 0 28px 0'}}>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />机构得分
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />机构得分
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}  className='padding'>
                            <div>
                                <span className="left">
                                    <Icon type="tool" theme="twoTone" style={{ fontSize: '20px'}}/>
                                    <span>隐患总数</span>
                                </span>
                                <Link className="right" to="/app/achievements-ranking" >更多</Link>
                            </div>
                            <Row style={{margin: '30px 0 60px 0'}}>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />个人得分
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />个人排名
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                            </Row>
                            <Row style={{margin: '0 0 28px 0'}}>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />机构得分
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                                <Col span={12} className='text-center'>
                                    <p>
                                        <Icon type="tag" theme="twoTone" />机构得分
                                    </p>
                                    <h1 className="color-3">0</h1>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} className='padding'>
                            <div>
                                <span className="left">
                                    <Icon type="tool" theme="twoTone" style={{ fontSize: '20px'}}/>
                                    <span>隐患类型Top5</span>
                                </span>
                                <Link className="right" to="/app/engineeringSpeed" >更多</Link>
                            </div>
                            <div id="strip2" className="echarts" style={{ width: '100%', height: 300 }}></div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default welcome;

import React from 'react';
import { Form, Button, TreeSelect, Row, Col, Select, Table, DatePicker, Modal} from 'antd';

import './achievements-ranking.css';
import api from '../../utils/api';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker } = DatePicker;

const cycle = [
    {period: 0, name: '月'},
    {period: 1, name: '季度'},
    {period: 2, name: '半年度'},
    {period: 3, name: '年度'}
];

let that = this;

class achievementsRanking extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scope: '', // 指标范围id
            scopeId: '', // 项目id
            planId: '', // 方案id
            period: cycle[0].period, //周期
            year: '2018', //年
            interval: 7, //月
            range: [], //指标范围list
            plan: [], //选择方案list
            value: null, //选择项目
            list: [], //搜索列表
            treeData: [], //选择项目树,
            visible: false, //模态窗口  状态
            confirmLoading: false, // 模态窗口  确定按钮执行状态
            currentPage: 1, //分页 - 当前页
            pageSize: 10, //分页 - 条数
            totalRecord: 0, //分页 - 总条数
            planList: [] //考核明细 list
        }

        this.getFields = this.getFields.bind(this);
        that = this;
    }

    //指标范围
    scopeChange = (value) => {
        this.setState({
            scope: Number(value)
        })
    }

    //选择项目
    projectChange = (value) => {
        this.setState({
            scopeId: value
        })
    }

    //选择方案
    planChange = (value) => {
        this.setState({
            planId: Number(value)
        })
    }

    //选择周期
    cycleChange = (value) => {
        this.setState({
            period: Number(value)
        })
    }

    //考核时间
    timeChange = (date,dateString) => {
        let dates = dateString.split('-');
        this.setState({
            year: dates[0], //年
            interval: Number(dates[1]) //月
        })
    }

    //重置
    handleReset = () => {
        this.setState((state)=>({
            scope: Number(state.range[0].type), // 指标范围id
            scopeId: state.treeData[0].id + '-' + state.treeData[0].uuid, // 项目id
            planId: state.plan[0].id, // 方案id
            period: cycle[0].period, //周期
            year: '2018', //年
            interval: 7 //月
        }))
    }

    //递归树
    recursionThee = (list) => {
        if( list.length > 0){
            list.forEach(function (item) {
                item.title= item.name;
                item.value= item.id +'-' +item.uuid;
                item.key= item.uuid;
                that.recursionThee(item.children)
            })
        }
    }

    //搜索
    handleSearch = () => {
        const params = {
            currentPage: this.state.currentPage,
            pageSize: this.state.pageSize,
            whereMap: {
                scope: this.state.scope, // 指标范围id
                scopeId: Number(this.state.scopeId.split("-")[0]), // 项目id
                planId: this.state.planId, // 方案id
                period: this.state.period, //周期
                year: this.state.year, //年
                interval: this.state.interval, //月
            }
        }
        api.searchList(params).then( res => {
            this.setState({
                list: res.resultObject,
                currentPage: res.currentPage,
                pageSize: res.pageSize,
                totalRecord: res.totalRecord
            })
        })
    }

    //页码选择
    pageChange = (currentPage, pageSize) => {
        this.setState({
            currentPage: currentPage,
            pageSize: pageSize
        }, () => {
            this.handleSearch();
        })
    }

    //分页size选择
    pageSizeChange = (currentPage, pageSize) =>{
        this.setState({
            currentPage: currentPage,
            pageSize: pageSize
        }, () => {
            this.handleSearch();
        })
    }

    //创建 表单
    getFields = () => {
        const children = [];
        children.push(
            <Col span={8} key="1" >
                <FormItem label={`指标范围`} >
                    {
                        this.state.range.length > 0 && this.state.scope ?
                            <Select value={this.state.scope + ''}
                                    onChange={this.scopeChange}
                                    placeholder='请选择指标范围'>
                            {
                                this.state.range.map( (item, index) =>
                                    <Option key={index} value={item.type}>{item.name}</Option>
                                )
                            }
                        </Select> : null
                    }
                </FormItem>
            </Col>
        );

        children.push(
            <Col span={8} key="2" >
                <FormItem label={`选择项目`} >
                    {
                        this.state.treeData.length > 0 && this.state.scopeId?
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                dropdownStyle={{ height: 300, overflow: 'auto' }}
                                placeholder="请选择项目"
                                value={this.state.scopeId}
                                treeData={this.state.treeData}
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.projectChange}>
                            </TreeSelect> : null
                    }
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={8} key="3" >
                <FormItem label={`选择方案`} >
                    {
                        this.state.plan.length > 0 && this.state.planId ?
                            <Select value={ this.state.planId}
                                    onChange={this.planChange}
                                    placeholder='请选择方案'>
                                {
                                    this.state.plan.map( (item, index) =>
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    )
                                }
                            </Select> : null
                    }
                </FormItem>
            </Col>
        );

        children.push(
            <Col span={8} key="4" >
                <FormItem label={`选择周期`} >
                    <Select value={ this.state.period}
                            onChange={this.cycleChange}
                            disabled={true}
                            placeholder='请选择周期'>
                        {
                            cycle.map( (item, index) =>
                                <Option key={index} value={item.period}>{item.name}</Option>
                            )
                        }
                    </Select>
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={8} key="5" >
                <FormItem label={`考核时间`} >
                    <MonthPicker value={moment( this.state.year + '/' + this.state.interval, 'YYYY/MM')} onChange={this.timeChange} placeholder="请选择年月" />
                </FormItem>
            </Col>
        );
        return children;
    }

    showModal = (item) => {
        const params = {
            currentPage: 1,
            pageSize: 9999,
            whereMap: {
                resultId: item.id
            }
        }
        api.searchDetail(params).then( res => {
            res.resultObject.forEach( (item,index) => {
                item.index = res.currentPage + index
            })
            this.setState({
                planList: res.resultObject,
                visible: true
            });
        })
    }

    confirmModal = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    cancelModal = () => {
        this.setState({
            visible: false,
        });
    }

    componentDidMount(){
        api.searchRangeAndPlan().then( res => {
            if(res){
                this.setState({
                    range: res.range,
                    plan: res.plan,
                    scope: Number(res.range[0].type),
                    planId: Number(res.plan[0].id)
                })
            }
        })

        api.getTreeProject().then( res => {
            if(res){
                const tree = [res];
                this.recursionThee(tree)
                this.setState({
                    treeData: tree,
                    scopeId: tree[0].value
                })
            }

        })
    }

    render() {
        const columns = [{
            title: '排名',
            dataIndex: 'currRank',
            width: 80,
            key: '1'
        }, {
            title: '被考核项目名称',
            dataIndex: 'name',
            key: '2'
        }, {
            title: '总得分',
            dataIndex: 'totalScore',
            width: 100,
            key: '3'
        }, {
            title: '排名趋势',
            dataIndex: 'address',
            width: 150,
            key: '4'
        }, {
            title: '操作',
            width: 100,
            key: '5',
            render: (item) => (
                <span>
                    <Button type='primary' onClick={this.showModal.bind(this,item)}>查看明细</Button>
                </span>
            )
        }];


        const columns_2 = [{
            title: '序号',
            dataIndex: 'index',
            width: 100,
            key: '1'
        }, {
            title: '平均得分',
            dataIndex: 'assessmentScore',
            width: 150,
            key: '2'
        }, {
            title: '被考核项目',
            dataIndex: "assessmentProject",
            width: 300,
            key: '3'
        }];

        return (
            <div>
                <div className="ant-advanced-search-form">
                    <Row gutter={8}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className="list-box">
                    <Table dataSource={this.state.list}
                           bordered
                           rowKey="id"
                           columns={columns}
                           pagination={{  // 分页
                               simple: false,
                               showQuickJumper: true,
                               showSizeChanger: true,
                               pageSizeOptions: ['5','10','25','50'],
                               current: this.state.currentPage,
                               total: this.state.totalRecord,
                               onShowSizeChange: this.pageSizeChange,
                               onChange: this.pageChange
                           }}>
                    </Table>
                    <Modal
                        title="考核明细"
                        visible={this.state.visible}
                        onOk={this.confirmModal}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.cancelModal}>
                        <Table dataSource={this.state.planList}
                               bordered
                               rowKey="id"
                               pagination={false}
                               columns={columns_2}>
                        </Table>
                    </Modal>
                </div>
            </div>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create()(achievementsRanking);
export default WrappedAdvancedSearchForm;

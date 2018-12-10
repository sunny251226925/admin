import React from 'react';
import { Form, Button, TreeSelect, Row, Col, Select, Input, Table, Divider, Tag, Pagination} from 'antd';

import './achievements-ranking.css';
import api from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
const { Column, ColumnGroup } = Table;

let that = this;

class achievementsRanking extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: {},
            range: [], //指标范围
            plan: [], //选择方案
            value: null, //选择项目
            list: [], //列表
            listPage: {}, //列表分页
            treeData: [], //选择项目树,
            projectTreeData: []
        }
        this.getFields = this.getFields.bind(this);
        that = this;
    }

    //指标范围
    scopeChange = (value) => {
        this.state.search.scope = Number(value);
    }

    //选择项目
    projectChange = (value) => {
        console.log(value)
        this.state.search.scopeId = Number(value);
    }

    //选择方案
    planChange = (value) => {
        this.state.search.planId = Number(value);
    }

    //重置
    handleReset = () => {
        this.props.form.resetFields();
    }

    //递归树
    recursionThee = (list) => {
        if( list.length > 0){
            list.forEach(function (item) {
                item.title= item.shortName;
                item.value= item.id;
                item.key= item.uuid;
                that.recursionThee(item.children)
            })
        }
    }


    //搜索
    handleSearch = (e) => {
        e.preventDefault();
            const params = {
                currentPage: "1",
                pageSize: "10",
                whereMap: this.state.search
                // whereMap: {
                //     planId: 9,
                //     scope: 2,
                //     scopeId: 2,
                //     period: 0,
                //     year: "2018",
                //     interval: 6
                // }
            }
            api.searchList(params).then( res => {
                this.setState({
                    list: res.resultObject,
                    listPage: res
                })
            })

    }

    //页码选择
    pageChange = (page, pageSize) => {
        console.log(page, pageSize);
    }

    //分页size选择
    pageSizeChange = (current, pageSize) =>{
        console.log(current, pageSize);
    }

    //创建 表单
    getFields = () => {
        const children = [];
        children.push(
            <Col span={8} key="1" >
                <FormItem label={`指标范围`} >
                        <Select initialValue={this.state.range.length>0 ? this.state.range[0].name : null}
                                onChange={this.scopeChange}
                                placeholder='请选择指标范围'>
                            {
                                this.state.range.length > 0 ?
                                this.state.range.map( (item, index) =>
                                    <Option key={index} value={item.type}>{item.name}</Option>
                                ) : null
                            }
                        </Select>
                </FormItem>
            </Col>
        );

        children.push(
            <Col span={8} key="2" >
                <FormItem label={`选择项目`} >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ height: 300, overflow: 'auto' }}
                            placeholder="Please select"
                            treeData={this.state.treeData}
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.projectChange}>
                        </TreeSelect>
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={8} key="3" >
                <FormItem label={`选择方案`} >
                        <Select initialValue={ this.state.plan.length > 0 ?this.state.plan[0].name : null}
                                onChange={this.planChange}
                                placeholder='请选择方案'>
                            {
                                this.state.plan.length > 0 ?
                                this.state.plan.map( (item, index) =>
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ) : null
                            }
                        </Select>
                </FormItem>
            </Col>
        );
        return children;
    }

    query = (item) => {
        console.log(item)
    }

    componentDidMount(){
        api.searchRangeAndPlan().then( res => {
            this.setState({
                range: res.range,
                plan: res.plan
            })
        })

        api.getTreeProject().then( res => {
            const tree = [res];
            this.recursionThee(tree)
            this.setState({
                treeData: tree
            })
        })
    }

    render() {
        const columns = [{
            title: '排名',
            dataIndex: 'currRank',
            key: '1'
        }, {
            title: '被考核项目名称',
            dataIndex: 'name',
            key: '2'
        }, {
            title: '总得分',
            dataIndex: 'totalScore',
            key: '3'
        }, {
            title: '排名趋势',
            dataIndex: 'address',
            key: '4'
        }, {
            title: '操作',
            key: '5',
            render: tags => (
                <span>
                    <Button type='primary' onClick={this.query}>查看明细</Button>
                </span>
            )
        }];

        return (
            <div>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
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
                               current: this.state.listPage.currentPage,
                               total: this.state.listPage.totalPages,
                               onShowSizeChange: this.pageSizeChange,
                               onChange: this.pageChange
                           }}
                    >
                    </Table>
                </div>
            </div>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create()(achievementsRanking);
export default WrappedAdvancedSearchForm;

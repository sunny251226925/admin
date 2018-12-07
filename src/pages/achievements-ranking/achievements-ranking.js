import React from 'react';
import { Form, Button, TreeSelect, Row, Col, Select, Input } from 'antd';
import './achievements-ranking.css';
import api from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class achievementsRanking extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            range: [], //指标范围
            plan: [], //选择方案
            value: null, //选择项目
            list: [], //列表
            projectThree: [] //选择项目树
        }
        this.getFields = this.getFields.bind(this);
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            const params = {
                currentPage: "1",
                pageSize: "10",
                whereMap: {
                    planId: 9,
                    scope: 2,
                    scopeId: 2,
                    period: 0,
                    year: "2018",
                    interval: 6
                }
            }
            api.searchList(params).then( res => {
                console.log(res)
            })
        });

    }

    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    getFields = () => {
        const { getFieldDecorator } = this.props.form;
        const children = [];

        children.push(
            <Col span={8} key="1" >
                <FormItem label={`指标范围`} >
                    {getFieldDecorator(`scope`, {
                        rules: [{
                            required: false,
                            message: 'Input something!'
                        }],
                    })(
                        <Select initialValue={this.state.range.length>0 ? this.state.range[0].name : null}
                                onChange={this.handleChange}
                                placeholder='请选择指标范围'>
                            {
                                this.state.range.length > 0 ?
                                this.state.range.map( (item, index) =>
                                    <Option key={index} value={item.type}>{item.name}</Option>
                                ) : null
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        // children.push(
        //     <Col span={8} key="2" >
        //         <FormItem label={`选择项目`} >
        //             {getFieldDecorator(`选择项目`, {
        //                 rules: [{
        //                     required: false,
        //                     message: 'Input something!',
        //                     setFieldsValue: ''
        //                 }],
        //             })(
        //                 <TreeSelect
        //                     showSearch
        //                     style={{ width: '100%' }}
        //                     dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        //                     placeholder="Please select"
        //                     treeData={this.state.projectThree}
        //                     allowClear
        //                     treeDefaultExpandAll
        //                     onChange={this.onChange}>
        //                 </TreeSelect>
        //             )}
        //         </FormItem>
        //     </Col>
        // );
        children.push(
            <Col span={8} key="3" >
                <FormItem label={`选择方案`} >
                    {getFieldDecorator(`选择方案`, {
                        rules: [{
                            required: false,
                            message: 'Input something!',
                        }],
                    })(
                        <Select initialValue={ this.state.plan.length > 0 ?this.state.plan[0].name : null} onChange={this.handleChange} placeholder='请'>
                            {
                                this.state.plan.length > 0 ?
                                this.state.plan.map( (item, index) =>
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ) : null
                            }
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={8} key="4" >
                <FormItem label={`选择目标`} >
                    {getFieldDecorator(`选择目标`, {
                        rules: [{
                            required: false,
                            message: 'Input something!',
                        }],
                    })(
                        <Input placeholder="placeholder" />
                    )}
                </FormItem>
            </Col>
        );
        return children;
    }

    // iterator = (tree) => {
    //     console.log(tree,'xxx')
    //     tree.forEach(function (item) {
    //         if(item.children.length > 0){
    //             tree.value = tree.id;
    //             tree.title = tree.shortName;
    //             tree.key = tree.uuid;
    //
    //             this.iterator(item);
    //         }
    //     })
    // }

    componentDidMount(){
        api.searchRangeAndPlan().then( res => {
            this.setState({
                range: res.range,
                plan: res.plan
            })
        })

        api.getTreeProject().then( res => {
            const tree = [res];

            this.setState({
                projectThree: tree
            })
        })
    }

    render() {
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
                <div className="search-result-list">Search Result List</div>
            </div>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create()(achievementsRanking);
export default WrappedAdvancedSearchForm;

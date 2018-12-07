import React from 'react';
import {  Layout, Menu, Breadcrumb, Icon, message, Dropdown } from 'antd';
import api from '../../utils/api';
import RouterSon from '../../utils/routerSon';
import {cookie} from '../../utils/common';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

message.config({
    top: 100,
    duration: 2
});

class App extends React.Component {
    constructor(props){
        super(props);

        let sidebarSelected = cookie.get("sidebarSelected");
            sidebarSelected = sidebarSelected ? JSON.parse(sidebarSelected) : {};
        let sidebarOpen = cookie.get("sidebarOpen");
            sidebarOpen = sidebarOpen ? JSON.parse(sidebarOpen) : {};

        this.state = {
            menuList: [], // 一级菜单
            sidebarList: [], // 二级菜单及以下
            navIndex: cookie.get('navIndex') ? cookie.get('navIndex') : 0, // 已选中的一级菜单坐标
            sidebarSelected: sidebarSelected, // 已选中的二级菜单
            sidebarOpen: sidebarOpen, // 已打开的二级菜单  二级菜单下如有还有菜单,  需要折叠
            collapsed: false, // sidebar展开开关
            user: null, // 用户信息
            person: null // 人员角色
        }
    }

    //sidebar展开函数
    sidebarToggle = (collapsed) => {
        console.log(collapsed)
        this.setState({
            collapsed: collapsed
        });
    }

    // 选中一级菜单
    navChange = (item) => {
        const {history} = this.props;
        const index = this.state.menuList.indexOf(item);
        this.setState({
            sidebarList: item.children,
            navIndex: index
        })
        if( item.children.length > 0){
            if( item.children[0].children && item.children[0].children.length > 0){
                this.setState({
                    sidebarSelected: item.children[0].children[0],
                    sidebarOpen: item.children[0]
                })
                cookie.put('sidebarSelected',JSON.stringify(item.children[0].children[0]));
                cookie.put('sidebarOpen',JSON.stringify(item.children[0]));
                history.push('/app/' + item.children[0].children[0].href);
            } else {
                this.setState({
                    sidebarSelected: item.children[0],
                    sidebarOpen: {}
                })
                cookie.put('sidebarSelected',JSON.stringify(item.children[0]));
                cookie.put('sidebarOpen',JSON.stringify({}));
                history.push('/app/' + item.children[0].href);
            }
        } else {
            this.setState({
                sidebarSelected: {},
                sidebarOpen: {}
            })
            cookie.put('sidebarSelected',JSON.stringify({}));
            cookie.put('sidebarOpen',JSON.stringify({}));
        }
        cookie.put('navIndex', index);
    }

    // 选中二级菜单
    sidebarChange = (item) => {
        const {history} = this.props;
        if(item.children && item.children.length > 0 ){
            this.setState({
                sidebarSelected: item.children[0],
                sidebarOpen: item
            })
            cookie.put('sidebarSelected',JSON.stringify(item.children[0]));
            cookie.put('sidebarOpen',JSON.stringify(item));
            history.push('/app/' + item.children[0].href);
        } else {
            if(item.code.split("_")[2] === '2'){
                this.setState({
                    sidebarSelected: item,
                    sidebarOpen: {}
                })
                cookie.put('sidebarSelected',JSON.stringify(item));
                cookie.put('sidebarOpen',JSON.stringify({}));
            } else {
                this.setState({
                    sidebarSelected: item
                })
                cookie.put('sidebarSelected',JSON.stringify(item));
            }
            history.push('/app/' + item.href);
        }
    }

    dropDownClick = (item) =>{
        const {history} = this.props;
        if(item.key === '3'){
            cookie.clear();
            history.push("/");
        }
    }

    componentWillMount(){
        const {history} = this.props;
        if(!cookie.get("token")){
            history.push("/");
            cookie.remove('navIndex');
        }
    }

    componentDidMount(){
        //获取菜单list
        api.getMenu().then( res => {
            if(res instanceof Array){
                res[0].children = [];
                this.setState({
                    menuList: res,
                    sidebarList: res[this.state.navIndex].children
                })
            }
        })

        //获取用户详情
        api.getUserInfo().then( res => {
            this.setState({
                user: res.user,
                person: res.person
            })
        })
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    {
                        this.state.menuList.length > 0 ?
                        <Menu theme="dark"
                              mode="horizontal"
                              selectedKeys={[this.state.menuList[this.state.navIndex].code]}
                              defaultSelectedKeys={[this.state.menuList[this.state.navIndex].code]}
                              style={{ lineHeight: '64px' }}>
                            {
                                this.state.menuList.map( (item) =>
                                    <Menu.Item key={item.code} onClick={ this.navChange.bind(this,item)}>{item.name}</Menu.Item>
                                )
                            }
                        </Menu> : null
                    }
                    <div className="userInfo">
                        <Dropdown overlayStyle={{width:180}}
                                  overlay={
                                      <Menu onClick={this.dropDownClick}>
                                        <Menu.Item key="1"><Icon type="user"/>个人信息</Menu.Item>
                                        <Menu.Item key="2"><Icon type="unlock" />修改密码</Menu.Item>
                                        <Menu.Item key="3"><Icon type="poweroff" />退出</Menu.Item>
                                      </Menu>}>
                            <span>
                                {this.state.user ? <p>{this.state.user.userName}</p> : null}
                                {this.state.person ? <p>{this.state.person.name}<Icon type="down" /></p> : null}
                            </span>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider collapsed={this.state.collapsed} onCollapse={this.sidebarToggle} collapsible>
                        {
                            this.state.sidebarList.length > 0 ?
                            <Menu mode="inline"
                                  selectedKeys={[this.state.sidebarSelected.code]}
                                  openKeys={[this.state.sidebarOpen.code]}
                                  defaultSelectedKeys={[this.state.sidebarSelected.code]}
                                  defaultOpenKeys={[this.state.sidebarOpen.code]}
                                  style={{ height: '100%', borderRight: 0 }}>
                                {
                                    this.state.sidebarList.map( (item) =>
                                        item.children && item.children.length > 0 ?
                                        <SubMenu key={item.code}
                                                 onTitleClick={this.sidebarChange.bind(this,item)}
                                                 title={<span><Icon type="team" />{item.name}</span>}>
                                            {
                                                item.children.map( (m) =>
                                                    <Menu.Item key={m.code} onClick={this.sidebarChange.bind(this,m)}>{m.name}</Menu.Item>
                                                )
                                            }
                                        </SubMenu> :
                                        <Menu.Item key={item.code} onClick={this.sidebarChange.bind(this,item)}>
                                            <Icon type="pie-chart" />
                                            <span>{item.name}</span>
                                        </Menu.Item>
                                    )
                                }
                            </Menu> : null
                        }
                    </Sider>
                    <Layout style={{ padding: '0 24px 0 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                this.state.menuList.length > 0 ?
                                    <Breadcrumb.Item>{this.state.menuList[this.state.navIndex].name}</Breadcrumb.Item> : null
                            }
                            {
                                this.state.menuList.length > 0 && this.state.sidebarOpen ?
                                    <Breadcrumb.Item>{this.state.sidebarOpen.name}</Breadcrumb.Item> : null
                            }
                            {
                                this.state.menuList.length > 0 ?
                                    <Breadcrumb.Item>{this.state.sidebarSelected.name}</Breadcrumb.Item> : null
                            }
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            <RouterSon />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;

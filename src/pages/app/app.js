import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, message, Dropdown, LocaleProvider } from 'antd';
import api from '../../utils/api';
import RouterSon from '../../utils/routerSon';
import {cookie} from '../../utils/common';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

message.config({
    top: 100,
    duration: 2
});

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            menuList: [], // 一级菜单
            navIndex: '', // 已选中的一级菜单坐标
            sidebarSelected: '', // 已选中的二级菜单
            sidebarOpen: '', // 已打开的二级菜单  二级菜单下如有还有菜单,  需要折叠
            collapsed: false, // sidebar展开开关
            user: null, // 用户信息
            person: null // 人员角色
        }

    }

    //sidebar展开函数
    sidebarToggle = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    }

    // 选中一级菜单
    navChange = (item) => {
        const {history} = this.props;
        if( item.children.length > 0){
            if( item.children[0].children && item.children[0].children.length > 0){
                history.push('/app/' + item.children[0].children[0].href);
            } else {
                history.push('/app/' + item.children[0].href);
            }
        } else {
            history.push('/app/' + item.href);
        }
    }

    // 选中二级菜单
    sidebarChange = (item) => {
        const {history} = this.props;
        if(item.children && item.children.length > 0 ){
            history.push('/app/' + item.children[0].href);
        } else {
            history.push('/app/' + item.href);
        }
    }

    //用户信息下拉列表
    dropDownClick = (item) =>{
        const {history} = this.props;
        if(item.key === '3'){
            cookie.clear();
            history.push("/");
        }
    }

    //渲染菜单选中
    renderSidebar = () => {
        const {history} = this.props;
        const url = history.location.pathname.split('/')[2];
        this.state.menuList.forEach((aitem) => {
            if(aitem.href === url){
                this.setState({
                    navIndex: aitem,
                    sidebarSelected: {},
                    sidebarOpen: {}
                })
            } else {
                if(aitem.children){
                    aitem.children.forEach( (bitem) => {
                        if(bitem.href === url){
                            this.setState({
                                navIndex: aitem,
                                sidebarSelected: bitem,
                                sidebarOpen: {}
                            })
                        } else {
                            if(bitem.children){
                                bitem.children.forEach((citem) => {
                                    if(citem.href === url){
                                        this.setState({
                                            navIndex: aitem,
                                            sidebarSelected: citem,
                                            sidebarOpen: bitem
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    componentWillMount(){
        const {history} = this.props;
        if(!cookie.get("token")){
            history.push("/");
            cookie.remove('navIndex');
        }
    }

    componentWillReceiveProps () {
        this.renderSidebar();
    }

    componentDidMount(){
        //获取菜单list
        api.getMenu().then( res => {
            if(res instanceof Array){
                res[0].children = [];
                this.setState({
                    menuList: res
                })
                this.renderSidebar();
            }
        })

        //获取用户详情
        api.getUserInfo().then( res => {
            if(res){
                this.setState({
                    user: res.user,
                    person: res.person
                })
            }
        })
    }

    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout>
                    <Header className="header">
                        <div className="logo">
                            <Icon type="github" style={{ fontSize: '30px', color: '#fff',marginRight:'5px' }}/>
                            <span style={{ fontSize: '26px', color: '#fff' }}>github</span>
                        </div>
                        {
                            this.state.menuList.length > 0 ?
                            <Menu theme="dark"
                                  mode="horizontal"
                                  selectedKeys={[this.state.navIndex.code]}
                                  defaultSelectedKeys={[this.state.navIndex.code]}
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
                        {
                            this.state.navIndex.children ?
                                <Sider style={{display:this.state.navIndex.children.length > 0 ? 'block': 'none'}}
                                       collapsed={this.state.collapsed}
                                       onCollapse={this.sidebarToggle}
                                       collapsible>
                                    {
                                        this.state.navIndex.children && this.state.navIndex.children.length > 0 ?
                                            <Menu mode="inline"
                                                  selectedKeys={[this.state.sidebarSelected.code]}
                                                  openKeys={[this.state.sidebarOpen.code]}
                                                  defaultSelectedKeys={[this.state.sidebarSelected.code]}
                                                  defaultOpenKeys={[this.state.sidebarOpen.code]}
                                                  style={{ height: '100%', borderRight: 0 }}>
                                                {
                                                    this.state.navIndex.children.map( (item) =>
                                                        item.children && item.children.length > 0 ?
                                                            <SubMenu key={item.code}
                                                                     onTitleMouseEnter={this.sidebarChange.bind(this,item)}
                                                                     title={<span><Icon type="team" /><span>{item.name}</span></span>}>
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
                                </Sider> : null
                        }

                        <Layout style={{ padding: '0 24px 0 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {
                                    this.state.navIndex?
                                        <Breadcrumb.Item>{this.state.navIndex.name}</Breadcrumb.Item> : null
                                }
                                {
                                    this.state.sidebarOpen?
                                        <Breadcrumb.Item>{this.state.sidebarOpen.name}</Breadcrumb.Item> : null
                                }
                                {
                                    this.state.sidebarSelected?
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
             </LocaleProvider>
        );
    }
}

export default App;

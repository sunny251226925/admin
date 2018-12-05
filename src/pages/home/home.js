import React from 'react'
import {  Layout, Menu, Breadcrumb, Icon, message } from 'antd'
import api from '../../utils/api'
import {browserHistory} from 'react-router'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

message.config({
    top: 100,
    duration: 2
});

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuList: [], // 一级菜单
            sidebarList: [], // 二级菜单及以下
            navIndex: 0, // 已选中的一级菜单坐标
            sidebarSelected: {}, // 已选中的二级菜单
            sidebarOpen: {}, // 已打开的二级菜单  二级菜单下如有还有菜单,  需要折叠
            collapsed: false // sidebar展开开关
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
        const index = this.state.menuList.indexOf(item);
        this.setState({
            sidebarList: item.children,
            navIndex: index
        })
        console.log(item)
        if( item.children[0].children && item.children[0].children.length > 0){
            console.log("111")
            this.setState({
                sidebarSelected: item.children[0].children[0],
                sidebarOpen: item.children[0]
            })
            browserHistory.push('/' + item.children[0].children[0].href);
        } else {
            this.setState({
                sidebarSelected: item.children[0],
            })
            browserHistory.push('/' + item.children[0].href);
        }
    }

    // 选中二级菜单
    sidebarChange = (item) => {
        if(item.children && item.children.length > 0 ){
            this.setState({
                sidebarSelected: item.children[0],
                sidebarOpen: item
            })
            browserHistory.push('/' + item.children[0].href);
        } else {
            if(item.code.split("_")[2] === '2'){
                this.setState({
                    sidebarSelected: item,
                    sidebarOpen: {}
                })
            } else {
                this.setState({
                    sidebarSelected: item
                })
            }
            browserHistory.push('/' + item.href);
        }
    }

    componentDidMount(){
        //获取菜单list
        api.getMenu().then(res => {
            this.setState({
                menuList: res,
                sidebarList: res[0].children,
                sidebarSelected: res[0].children[0],
            })
        })
    }

    render() {
        return (
            <Layout>
                <Header className="header" >
                    <div className="logo"></div>
                    {
                        this.state.menuList.length > 0 ?
                        <Menu theme="dark" mode="horizontal" selectedKeys={[this.state.menuList[this.state.navIndex].code]}  defaultSelectedKeys={[this.state.menuList[this.state.navIndex].code]} style={{ lineHeight: '64px' }}>
                            {
                                this.state.menuList.map( (item) =>
                                    <Menu.Item key={item.code} onClick={ this.navChange.bind(this,item)}>{item.name}</Menu.Item>
                                )
                            }
                        </Menu> : null
                    }
                    <div className="userInfo">
                        xxx
                    </div>
                </Header>
                <Layout>
                    <Sider collapsed={this.state.collapsed} onCollapse={this.sidebarToggle} collapsible>
                        {
                            this.state.sidebarList.length > 0 ?
                            <Menu mode="inline"
                                  selectedKeys={[this.state.sidebarSelected.code]}
                                  openKeys={[this.state.sidebarOpen.code]}
                                  defaultSelectedKeys={[this.state.sidebarList[0].code]}
                                  defaultOpenKeys={[this.state.sidebarList[0].code]}
                                  style={{ height: '100%', borderRight: 0 }}>
                                {
                                    this.state.sidebarList.map( (item) =>
                                        item.children ?
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
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
                            {this.state.navIndex}
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

export default Home;

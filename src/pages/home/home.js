import React from 'react'
import {  Layout, Menu, Breadcrumb, Icon, message } from 'antd'
import api from '../../utils/api'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

message.config({
    top: 100,
    duration: 2
});

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuList: [],
            sidebarList: []
        }

        this.getSidebar = this.getSidebar.bind(this);
    }

    getSidebar = () => {
       console.log('111')
    }

    componentDidMount(){
        api.getMenu().then(res => {
            this.setState({
                menuList: res,
                sidebarList: res[0].children
            })
            console.log(this.state.menuList[0].code,this.state.menuList)
        })
    }

    render() {
        return (
            <Layout>
                <Header className="header" >
                    <div className="logo" />
                    {
                        this.state.sidebarList.length > 0 ?
                        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={[this.state.menuList[0].code]} style={{ lineHeight: '64px' }}>
                            {
                                this.state.menuList.map( (item) =>
                                    <Menu.Item key={item.code} onClick={this.getSidebar = () => {
                                        this.setState({
                                            sidebarList: item.children
                                        })
                                    }
                                    }>{item.name}</Menu.Item>
                                )
                            }
                        </Menu> : null
                    }
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }} >
                        {
                            this.state.sidebarList.length > 0 ?
                            <Menu mode="inline" defaultSelectedKeys={[this.state.sidebarList[0].code]} defaultOpenKeys={[this.state.sidebarList[1].code]} style={{ height: '100%', borderRight: 0 }}>

                                {
                                    this.state.sidebarList.map( (item) =>
                                        item.children.length > 0 ?
                                        <SubMenu key={item.code} title={<span><Icon type="user" />{item.name}</span>}>
                                            {
                                                item.children.map( (m) =>
                                                    <Menu.Item key={m.code}>{m.name}</Menu.Item>
                                                )
                                            }
                                        </SubMenu> :
                                        <Menu.Item key={item.code}>
                                            <Icon type="pie-chart" />
                                            <span>{item.name}</span>
                                        </Menu.Item>
                                    )
                                }

                            </Menu> : null
                        }

                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Home;

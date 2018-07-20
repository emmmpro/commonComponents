"use strict";
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Breadcrumb, Button, Layout, Menu, Switch, Icon, LocaleProvider, message } from 'antd';
import './style';
import './images/favicon.ico';
import Top from './layout/header';
import Footer from './layout/bottom';
import _g from 'g2';
import zhCN from 'antd/lib/locale-provider/zh_CN';

document.getElementById('_loading').style.display = 'none';
//关闭g2的打点请求
_g.track(false);


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { Sider, Content } = Layout;

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('THEME_VAL') || 'dark',
            current: '',
            collapsed: false,
            mode: 'inline',  // 水平垂直展现
        };
    }

    componentDidMount() {
        this.handleClick([], 'index')
    }
    changeTheme = (value) => {
        const theme = value ? 'dark' : 'light';
        this.setState({ theme });
        localStorage.setItem('THEME_VAL', theme);//设置主题颜色
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: this.state.collapsed ? 'inline' : 'vertical',
        });
    }
    clear = () => {
        this.setState({
            current: '',
        });
    }
    handleClick = (e, special) => {
        this.setState({
            current: e.key || special,
        });
    }

    //返回上一步
    backup() {
        history.go(-1);
    }

    render() {
        const { routes, params, children } = this.props;
        const paths = routes.map(item => item.path).filter(item => item);
        paths.length > 1 && paths.shift();
        //登录的缓存地址
        return (
            <Layout className="containAll">
                <Sider style={{ overflowY: 'auto', overflowX: 'hidden' }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    className="leftMenu"
                >
                    <span className="logo"></span>
                    {this.state.theme === 'light' ? <span className="author">emmmpro</span> : <span className="author white">emmmpro</span>}

                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        className="menu"
                        mode={this.state.mode}
                        selectedKeys={paths}
                        defaultOpenKeys={[paths[0]]}
                    >
                        <MenuItem key="/">
                            <Link to="/"><Icon type='home' /><span className="nav-text">动态表单解决方案</span></Link>
                        </MenuItem>
                    </Menu>
                    <div className="switch">
                        <Switch
                            checked={this.state.theme === 'dark'}
                            onChange={this.changeTheme}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                        />
                    </div>
                </Sider>
                <Layout>
                    <Top toggle={this.toggle} collapsed={this.state.collapsed} clear={this.clear} />
                    <Content className="main-content">
                        {children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

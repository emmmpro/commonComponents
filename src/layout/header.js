import React from 'react'
import { hashHistory } from 'react-router'
import { Menu, Icon, Layout, Modal, Select, Dropdown, Tooltip, Tag } from 'antd'
import { Link } from 'react-router-dom'
import * as screenfull from 'screenfull'

const SubMenu = Menu.SubMenu
const { Header } = Layout
const Option = Select.Option
let dataUser = localStorage.getItem('user_claims')
try {
    dataUser = JSON.parse(dataUser)
} catch (e) {
    console.log(e)
}

export default class Top extends React.Component {

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    }

    //路由跳转
    gotoLink = (path) => {
        hashHistory.push(path);
    }

    //退出登录
    onhandleLoginOut = () => {
        Modal.confirm({
            title: "你确定要退出吗？",
            content: '',
            onOk: () => this.localeLoginOut()
        })
    }
    //本地登出
    localeLoginOut() {
    }



    render() {
        //操作菜单
        const opts = (
            <Menu className="opt-menus" style={{ width: 150, marginTop: '-8px' }}>
                <Menu.Item key='person' style={{ lineHeight: '37px' }}><a onClick={this.gotoLink.bind(this, "/UserInfo")}><i className="icon-users"></i><span className="user-span">用户信息</span></a></Menu.Item>
                <Menu.Item key='out' style={{ lineHeight: '37px' }}><a onClick={this.onhandleLoginOut.bind(this)}><i className="icon-switch2"></i><span className="user-span">退出</span></a></Menu.Item>
            </Menu>
        );
        const optMenu = (
            <Dropdown overlay={opts} trigger={['click']} placement="bottomRight">
                <li>
                    <i className="icon-users" />
                    <span className="user-span">{dataUser && dataUser.name ? dataUser.name : ''}</span>
                </li>
            </Dropdown>
        );
        return (
            <Header style={{ background: '#fff' }} className="header">
                <Icon
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                 <Icon
                    type="arrows-alt"
                    style={{ marginRight: '20px' }}
                    onClick={this.screenFull}
                />
                <div className="login-message fr">
                    {optMenu}
                </div>
            </Header>
        );
    }
}
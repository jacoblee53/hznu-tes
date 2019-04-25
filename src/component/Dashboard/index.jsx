import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Row, Col, Dropdown, Icon, Menu, Avatar, Modal } from 'antd'

import DashMenu from '../Menu/index'
import config from '../../util/config'
import './index.less'

@inject('userActions', 'userStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore

    this.state = {
      collapsed: false
    }
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  logout = async() => {
    await this.actions.logout()
    window.location.assign(
      location.origin + location.pathname + '#' + '/login'
    )
  }

  showPersonalInfo = () => {
    const { user } = this.store
    {user && Modal.info({
      title: '个人信息',
      onOk() {},
      content: (
        <div className='userinfo'>
          <p>账号：{user.account}</p>
          <p>姓名：{user.userName}</p>
          <p>角色：{config.userType[user.role]}</p>
        </div>
      )
    })}
  }

  render() {
    const { collapsed } = this.state
    const { user } = this.store
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.showPersonalInfo}>
            <Icon type='user' /> <span>个人信息</span>
          </span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.logout}>
            <Icon type='poweroff' /> <span>退出登录</span>
          </span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout className='dashboard'>
        <DashMenu collapsed={collapsed} items={[]} />
        <Layout>
        <div className='header'>
          <Row type='flex' justify='space-between' align='middle'>
            <Col className='header-left'>
              <Icon
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Col>
            <Col className='header-right'>
              <Dropdown overlay={menu}>
                <span className='account'>
                  <Avatar className='avatar' icon='user' />
                  <span>{user && user.userName} | {user && config.userType[user.role]}</span>
                </span>
              </Dropdown>
            </Col>
          </Row>
        </div>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard

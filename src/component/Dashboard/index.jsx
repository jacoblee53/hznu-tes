import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Row, Col, Dropdown, Icon, Menu, Avatar, Modal, BackTop } from 'antd'

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
      collapsed: false,
      menu: [],
      isShowModal: false
    }

    this.fetchMenu()
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

  fetchMenu = async() => {
    const { user } = this.store
    let r = user ? await this.actions.fetchMenu({
      role: user.role
    }) : []
    this.setState({ menu: r })
  }

  showPwdModal = () => {
    this.setState({ isShowModal: true })
  }

  render() {
    const { collapsed, menu } = this.state
    const { user } = this.store
    const dropdownMenu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.showPwdModal}>
            <Icon type='lock' /> <span>修改密码</span>
          </span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.logout}>
            <Icon type='poweroff' /> <span>退出登录</span>
          </span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={() => {window.open('https://github.com/oddisland/hznu-tes/issues/new')}}>
            <Icon type='question' /> <span>问题反馈</span>
          </span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout className='dashboard'>
        <DashMenu collapsed={collapsed} items={menu} />
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
                <Dropdown overlay={dropdownMenu}>
                  <span className='account'>
                    <Avatar className='avatar' icon='user' />
                    <span>{user && user.userName}</span>
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <Layout.Content className='content'>
            {this.props.children}
          </Layout.Content>
        </Layout>
        <BackTop />
      </Layout>
    )
  }
}

export default Dashboard

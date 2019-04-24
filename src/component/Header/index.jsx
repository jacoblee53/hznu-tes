import React from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col, Dropdown, Icon, Menu, Avatar, Modal } from 'antd'

import Logo from '../../constant/image/logo.png'
import './index.less'

@inject('userActions', 'userStore')
@observer
class Header extends React.Component {
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
  }

  showPersonalInfo = () => {
    Modal.info({
      title: '个人信息',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
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
                <span>李帆顺 | 学生</span>
              </span>
            </Dropdown>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header

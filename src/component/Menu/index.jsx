import React from 'react'
import { Menu, Layout, Icon  } from 'antd'
import { version } from '../../../package.json'
import { NavLink } from 'react-router-dom'

import Logo from '../../constant/image/logo.png'
import './index.less'

const { Sider } = Layout
class DashMenu extends React.Component {
  render() {
    const { collapsed, items } = this.props

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        theme='dark'
      >
        <div className='logo'>
          <a href='/'>
            <img src={Logo} />
            <h1>学科竞赛评价系统</h1>
          </a>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          className='menu'
        >
          {items.map(item => (
            <MenuItem key={item.path}>
              <NavLink to={item.path}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Sider>
    )
  }
}

export default DashMenu
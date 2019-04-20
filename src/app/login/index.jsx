import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Button, Input, Alert, Icon } from 'antd'

const FormItem = Form.Item

@inject('userActions', 'userStore')
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore
  }

  handleLogin = async() => {
    let r = await this.actions.login({
      account: '1000',
      password: '1'
    })
    console.log(r)
  }

  render() {
    return (
      <div className='root'>
        <Button onClick={this.handleLogin}>登录</Button>
      </div>
    )
  }
}

export default Form.create()(LoginForm)
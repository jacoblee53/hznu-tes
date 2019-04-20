import React from 'react'
import { Form, Button, Input, Alert, Icon } from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
  render() {
    return (
      <div className='root'>
        <Button>登录</Button>
      </div>
    )
  }
}

export default Form.create()(LoginForm)
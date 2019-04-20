import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Button, Input, Alert, Icon } from 'antd'
import Logo from './constant/image/logo.png'
import './index.less'

const FormItem = Form.Item

@inject('userActions', 'userStore')
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields( (err, values) => {
      if (!err) {
        this.actions.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className='login__container'>
        <div className='login__content'>
          <div className='login__header'>
            <img alt='logo' src={Logo} />
            <span>学科竞赛评价系统</span>
          </div>
          <div className='login__desc'>
            <a href='https://github.com/oddisland/hznu-tes' target='_blank'>https://github.com/oddisland/hznu-tes</a>
          </div>

          <div className='login__form'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入账号' }]
                })(
                  <Input
                    size='large'
                    name='account'
                    prefix={<Icon type='user' />}
                    placeholder='请输入账号'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }]
                })(
                  <Input.Password
                    size='large'
                    name='password'
                    prefix={<Icon type='lock' />}
                    type='password'
                    placeholder='请输入密码'
                  />
                )}
              </FormItem>

              <Form.Item>
                <Button
                  className='login__btn'
                  type='primary'
                  size='large'
                  htmlType='submit'
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(LoginForm)

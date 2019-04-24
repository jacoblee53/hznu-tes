import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Button, Input, Alert, Icon } from 'antd'
import { GlobalFooter } from 'ant-design-pro'

import Logo from './constant/image/logo.png'
import './index.less'

const FormItem = Form.Item

@Form.create()
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
    let footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/oddisland/hznu-tes',
        blankTarget: true,
      },
    ]

    return (
      <div className='login__container'>
        <div className='login__content'>
          <div className='login__header'>
            <img alt='logo' src={Logo} />
            <span>学科竞赛评价系统</span>
          </div>

          <div className='login__form'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem hasFeedback>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入账号' }]
                })(
                  <Input
                    name='account'
                    prefix={<Icon type='user' />}
                    placeholder='请输入账号'
                  />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }]
                })(
                  <Input
                    name='password'
                    type='password'
                    placeholder='请输入密码'
                  />
                )}
              </FormItem>

              <Form.Item>
                <Button
                  className='login__btn'
                  type='primary'
                  htmlType='submit'
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className='login__footer'>
          <GlobalFooter links={footerLinks} copyright='hznu tes © 2019 oddisland' />
        </div>
      </div>
    )
  }
}

export default LoginForm

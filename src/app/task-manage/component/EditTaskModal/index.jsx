import React from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
  message
} from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'

import './index.less'

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 }
}

function isCreate(status) {
  return status === 'create'
}

function isEdit(status) {
  return status === 'edit'
}

@inject(
  'classManageActions',
  'classManageStore',
  'userActions',
  'userStore',
  'taskManageActions'
)
@observer
@Form.create()
class EditTaskModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpert: false
    }
  }

  componentDidMount() {
    this.props.classManageActions.fetch()
    this.props.userActions.fetch({ role: 0 })
  }

  handleCheck = () => {
    this.setState({ isExpert: !this.state.isExpert })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { user } = this.props.userStore
    const { status, data } = this.props

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let taskData = {
          ...values,
          taskId: isCreate(status) ? null : data._id,
          owner: user.id,
          experts: values.isExpert ? values.experts : [],
          expertRatio: values.isExpert ? values.expertRatio : 0
        }

        let r = isCreate(status)
          ? await this.props.taskManageActions.create(taskData)
          : await this.props.taskManageActions.update(taskData)
        if (r.code === 200) {
          message.success(isCreate(status) ? '新建任务成功' : '更新任务成功')
          this.props.onCancel()
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      status,
      data,
      visible,
      onCancel,
      classManageStore,
      userStore
    } = this.props
    const { classes } = classManageStore
    const { experts } = userStore
    const isChecked =
      data && data.experts && data.experts.length > 0 ? true : false

    return (
      <Modal
        title={isCreate(status) ? '新建任务' : '编辑任务'}
        okText={isCreate(status) ? '新建' : '更新'}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onCancel}
        width={640}
        destroyOnClose
        style={{ top: 20 }}
      >
        <Form className='edit-form' onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label='任务标题'>
            {getFieldDecorator('taskName', {
              rules: [{ required: true, message: '请输入任务标题' }],
              initialValue: data.taskName || null
            })(<Input placeholder='请输入任务标题' />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='任务描述'>
            {getFieldDecorator('taskDesc', {
              rules: [{ required: true, message: '请输入任务描述' }],
              initialValue: data.taskDesc || null
            })(<Input.TextArea placeholder='请输入任务描述' rows={3} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='班级'>
            {getFieldDecorator('taskClass', {
              rules: [{ required: true, message: '请选择班级' }],
              initialValue: data.taskClass || []
            })(
              <Select
                mode='multiple'
                placeholder='请选择班级'
                disabled={isEdit(status)}
              >
                {classes &&
                  classes.map(item => (
                    <Select.Option value={item._id} key={item._id}>
                      {item.className}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='有效期'>
            {getFieldDecorator('taskDate', {
              rules: [{ required: true, message: '请选择有效期' }],
              initialValue: [moment(data.startDate), moment(data.endDate)]
            })(
              <DatePicker.RangePicker
                placeholder={['起始日期', '截止日期']}
                ranges={{
                  一周: [moment(), moment().add(1, 'w')],
                  十天: [moment(), moment().add(10, 'd')],
                  两周: [moment(), moment().add(2, 'w')],
                  一月: [moment(), moment().add(1, 'M')],
                  两月: [moment(), moment().add(2, 'M')]
                }}
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='教师占比'>
            {getFieldDecorator('teacherRatio', {
              rules: [{ required: true, message: '请输入教师占比' }],
              initialValue: data.teacherRatio || 0
            })(<InputNumber min={0} max={1} step={0.05} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='自评占比'>
            {getFieldDecorator('selfRatio', {
              rules: [{ required: true, message: '请输入自评占比' }],
              initialValue: data.selfRatio || 0
            })(<InputNumber min={0} max={1} step={0.05} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='组员占比'>
            {getFieldDecorator('mateRatio', {
              rules: [{ required: true, message: '请输入组员占比' }],
              initialValue: data.mateRatio || 0
            })(<InputNumber min={0} max={1} step={0.05} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='分组大小'>
            {getFieldDecorator('taskSize', {
              rules: [{ required: true, message: '请输入分组大小' }],
              initialValue: data.taskSize || 3
            })(
              <InputNumber disabled={isEdit(status)} min={3} max={5} step={1} />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='添加专家'>
            {getFieldDecorator('isExpert', {
              initialValue: isChecked
            })(
              <Checkbox
                disabled={isEdit(status)}
                defaultChecked={isChecked}
                onChange={this.handleCheck}
              />
            )}
          </Form.Item>

          <div className='expert-container'>
            <Form.Item {...formItemLayout} label='选择专家'>
              {getFieldDecorator('experts', {
                initialValue: data.experts || []
              })(
                <Select
                  mode='multiple'
                  placeholder='请选择专家'
                  disabled={isEdit(status)}
                >
                  {experts &&
                    experts.map(item => (
                      <Select.Option value={item._id} key={item._id}>
                        {item.userName}
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label='专家占比'>
              {getFieldDecorator('expertRatio', {
                initialValue: data.expertRatio || 0
              })(<InputNumber min={0} max={1} step={0.05} />)}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default EditTaskModal

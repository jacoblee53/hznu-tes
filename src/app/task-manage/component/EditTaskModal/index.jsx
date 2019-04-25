import React from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import moment from 'moment'

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 }
}

@Form.create()
class EditTaskModal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { status, data = [], visible, onCancel } = this.props

    return (
      <Modal
        title={status === 'edit' ? '编辑任务' : '新建任务'}
        okText={status === 'edit' ? '更新' : '新建'}
        visible={visible}
        onCancel={onCancel}
        width={640}
        style={{ top: 20 }}
        destroyOnClose
      >
        <Form>
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
                mode="multiple"
                placeholder="请选择班级"
              />
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
        </Form>
      </Modal>
    )
  }
}

export default EditTaskModal

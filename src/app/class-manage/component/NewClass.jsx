import React from 'react'
import { Modal, Input } from 'antd'

class NewClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      className: ''
    }
  }

  hanleChange = e => {
    this.setState({
      className: e.target.value
    })
  }

  render() {
    const { onOk, onCancel, visible } = this.props
    const { className } = this.state

    return (
      <Modal
        title='新建班级'
        visible={visible}
        onCancel={onCancel}
        onOk={() => onOk(className)}
        destroyOnClose
      >
        <Input
          placeholder='请输入班级名称'
          onChange={this.hanleChange}
        />
      </Modal>
    )
  }
}

export default NewClass
import React from 'react'
import { Modal, Input } from 'antd'

class NewStandard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  hanleChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    const { onOk, onCancel, visible } = this.props
    const { title } = this.state

    return (
      <Modal
        style={{ width: 200 }}
        title='新建标准'
        visible={visible}
        onCancel={onCancel}
        onOk={() => onOk(title)}
        destroyOnClose
      >
        <Input
          placeholder='请输入标准'
          onChange={this.hanleChange}
        />
      </Modal>
    )
  }
}

export default NewStandard
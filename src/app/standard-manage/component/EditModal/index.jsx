import React from 'react'
import { Modal } from 'antd'

import SingleTable from '../SingleTable'

class EditModal extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    const { visible, onCancel, standardManageStore } = this.props
    const { singles } = standardManageStore

    return (
      <Modal
        title='编辑标准'
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        style={{ top: 20 }}
        width={'90%'}
      >
        <SingleTable
          dataSource={singles}
        />
      </Modal>
    )
  }
}

export default EditModal
import React from 'react'
import { Modal, Table } from 'antd'

import parseExcel from '../../../../util/parseExcel'
import Excel from './Excel'
import './index.less'

class ImportExcel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  handleGetExcelData = data => {
    this.setState({
      data: parseExcel(data)
    }, () => console.log(this.state.data))
  }

  render() {
    const { visible = false, onCancel, onOk } = this.props
    const { data } = this.state
    const columns = [{
      title: '学号',
      dataIndex: 'account',
      key: 'account'
    }, {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
    }]

    return (
      <Modal
        title='批量导入学生'
        destroyOnClose
        visible={visible}
        onCancel={onCancel}
        style={{top: 20}}
        onOk={() => onOk(data)}
        okText='导入'
      >
        <div className='excel-container'>
          <Excel getExcelData={this.handleGetExcelData} />
        </div>
        <Table
          rowKey='account'
          size='small'
          bordered
          columns={columns}
          dataSource={data}
        />
      </Modal>
    )
  }
}

export default ImportExcel
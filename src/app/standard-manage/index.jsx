import React from 'react'
import { Card, Table, Button } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('standardManageActions', 'standardManageStore')
@observer
class StandardManage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.standardManageActions
    this.store = props.standardManageStore
  }

  componentDidMount() {
    this.actions.fetch()
  }

  render() {
    const { standards } = this.store
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    }, {
      title: '操作',
      render: (text, record) => (
        <div>

        </div>
      )
    }]

    return (
      <Card title='标准管理' bordered={false}>
        <Button type='primary' className='new-btn'>新建标准</Button>
        <Table
          rowKey='_id'
          bordered
          size='middle'
          dataSource={standards}
          columns={columns}
        />
      </Card>
    )
  }
}

export default StandardManage
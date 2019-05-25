import React from 'react'
import { Card, Table, Button, Icon, message, Popconfirm } from 'antd'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

import NewStandard from './component/NewStandard'
import './index.less'

const mr = {
  marginRight: 24
}

@inject('standardManageActions', 'standardManageStore')
@observer
class StandardManage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.standardManageActions
    this.store = props.standardManageStore

    this.state = {
      isNewStandardModal: false
    }
  }

  componentDidMount() {
    this.actions.fetch()
  }

  createStandard = async title => {
    let r = await this.actions.create({ title })
    if (r.code === 200) {
      message.success('新建成功')
      this.setState({ isNewStandardModal: false })
    }
  }

  handleEdit = record => {

  }

  handleDelete = record => {
    console.log(record)
    const id = record._id
    this.actions.delete({ id })
  }

  render() {
    const { standards } = this.store
    const { isNewStandardModal } = this.state
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '35%'
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '35%',
      render: (text) => (
        <span>{moment(text).format('YYYY-MM-DD hh:mm')}</span>
      )
    }, {
      title: '操作',
      width: '30%',
      render: (text, record) => (
        <div>
           <Button
              size='small'
              type='dashed'
              onClick={() => this.handleEdit(record)}
              style={mr}
            >
              <Icon type='edit' />
              编辑
            </Button>
            <Popconfirm
              title='确定删除该标准么？'
              onConfirm={() => this.handleDelete(record)}
            >
              <Button
                size='small'
                type='dashed'
              >
                <Icon type='delete' />
                删除
              </Button>
            </Popconfirm>
        </div>
      )
    }]

    const extraContent = (
      <Button
        type='primary'
        onClick={() => this.setState({ isNewStandardModal: true})}
      >
        新建标准
      </Button>
    )

    return (
      <Card title='标准管理'
        bordered={false}
        extra={extraContent}
        className='main-content-card'
      >
        <Table
          rowKey='_id'
          bordered
          size='small'
          dataSource={standards}
          columns={columns}
        />

        <NewStandard
          visible={isNewStandardModal}
          onOk={this.createStandard}
          onCancel={() => this.setState({ isNewStandardModal: false })}
        />
      </Card>
    )
  }
}

export default StandardManage
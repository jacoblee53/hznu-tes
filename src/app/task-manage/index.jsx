import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Button, List, Modal, Radio, Input } from 'antd'
import moment from 'moment'

import EditTaskModal from './component/EditTaskModal'
import './index.less'

@inject('taskManageActions', 'taskManageStore')
@observer
class TaskManage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false,
      status: '',
      listLoading: false,
      listdata: [],
    }
  }

  handleRadioChange  = e => {
    console.log(e.target.value)
  }

  handleSearch = e => {
    console.log(e)
  }

  render() {
    const { listLoading, listdata, status, isModalVisible } = this.state

    const ListContent = ({ data: {startDate, endDate} }) => (
      <div className='list-content'>
        <div>
          <span>起始日期：</span>
          {moment(startDate).format('YYYY-MM-DD')}
        </div>
        <div>
          <span>截止日期：</span>
          {moment(endDate).format('YYYY-MM-DD')}
        </div>
      </div>
    )

    const extraContent = (
      <div className='extraContent'>
        <Radio.Group
          defaultValue='on'
          onChange={e => this.handleRadioChange(e)}
        >
          <Radio.Button value='0'>进行中</Radio.Button>
          <Radio.Button value='1'>已完成</Radio.Button>
          <Radio.Button value='2'>全部</Radio.Button>
        </Radio.Group>
        <Input.Search className='extraContentSearch' placeholder='请输入任务名称检索' onSearch={this.handleSearch} />
      </div>
    );

    return (
      <Card
        title='任务管理'
        bordered={false}
        extra={extraContent}
      >
        <Button
          type='dashed'
          icon='plus'
          className='create-btn'
          onClick={() => this.setState({ isModalVisible: true, status: 'create' })}
        >
          新建
        </Button>

        <List
          size='middle'
          rowKey='id'
          loading={listLoading}
          dataSource={listdata}
          pagination={{
            pageSize: 5,
            showQuickJumper: true
          }}
          renderItem={item => (
            <List.Item
              key={item._id}
              actions={[
                <a>编辑</a>,
                <a>删除</a>
              ]}
            >
              <List.Item.Meta
                title={item.taskName}
                description={item.taskDesc}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />

        <EditTaskModal
          status={status}
          visible={isModalVisible}
          onCancel={() => this.setState({ isModalVisible: false })}
        />
      </Card>
    )
  }
}

export default TaskManage
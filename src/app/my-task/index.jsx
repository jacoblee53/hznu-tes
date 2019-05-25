import React from 'react'
import { Card, List, Button, Tag } from 'antd'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

import './index.less'

@inject('myTaskActions', 'myTaskStore')
@observer
class Evaluate extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = () => {
    this.props.myTaskActions.fetchMyTask()
  }

  getTag = endDate => {
    return moment() > moment(endDate) ?
      <Tag color='#e85600'>已截止</Tag> :
      <Tag color='#32b643'>进行中</Tag>
  }

  getButton = item => {
    return (
      <Button onClick={() => this.doTask(item)} type='primary'>
        {moment() > moment(item.endDate) ? '查看' : '提交'}
      </Button>
    )
  }

  doTask = item => {
    window.location.assign(
      location.origin + location.pathname + '#/mytask/' + item._id
    )
  }

  render() {
    const { myTaskStore } = this.props
    const { myTasks, isLoading } = myTaskStore
    const ListFooter = <div />
    const ListContent = ({ data: { startDate, endDate } }) => (
      <div className='list-content'>
        <div>
          <span>起始日期：</span>
          {moment(startDate).format('YYYY-MM-DD hh:mm')}
        </div>
        <div>
          <span>截止日期：</span>
          {moment(endDate).format('YYYY-MM-DD hh:mm')}
        </div>
      </div>
    )

    return (
      <Card title='我的任务' bordered={false} className='main-content-card'>
        <List
          loading={isLoading}
          size='small'
          pagination={{ pageSize: 6 }}
          dataSource={myTasks}
          footer={ListFooter}
          renderItem={item => (
            <List.Item
              key={item._id}
              key={item._id}
              actions={[this.getButton(item)]}
            >
              <List.Item.Meta
                title={
                  <>
                    {this.getTag(item.endDate)}
                    {item.taskName}
                  </>
                }
                description={item.taskDesc}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

export default Evaluate

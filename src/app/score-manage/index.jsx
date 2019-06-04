import React from 'react'
import { Card, Table } from 'antd'
import { inject, observer } from  'mobx-react'

import './index.less'

@inject('userStore', 'scoreManageStore', 'scoreManageActions')
@observer
class ScoreManage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.scoreManageActions.fetchResult()
  }


  render() {
    const { userStore, scoreManageStore } = this.props
    const { user } = userStore
    const role = getValue(user, 'role', false)
    const id = getValue(user, 'id', '')
    var { results } = scoreManageStore

    if (role === 2) {
      results = results.filter(item => item.owner._id === id)
    }

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      render: (text, record) => {
        const name = getValue(record, 'owner.userName', '')
        return <span>{name}</span>
      }
    }, {
      title: '班级',
      dataIndex: 'className',
      render: (text, record) => {
        const className = getValue(record, 'owner.classId.className', '')
        return <span>{className}</span>
      }
    }, {
      title: '任务名',
      dataIndex: 'taskName',
      render: (text, record) => {
        const taskName = getValue(record, 'task.taskName', '')
        return <span>{taskName}</span>
      }
    }, {
      title: '专家',
      dataIndex: 'isExpert',
      render: (text, record) => {
        const isExpert = getValue(record, 'task.isExpert', false)
        return <span>{isExpert?'有':'无'}</span>
      }
    }, {
      title: '分组人数',
      dataIndex: 'taskSize',
      render: (text, record) => {
        const taskSize = getValue(record, 'task.taskSize', 0)
        return <span>{taskSize}人</span>
      }
    }, {
      title: '总分',
      dataIndex: 'score',
      render: (text) => <span style={{fontWeight: 'bold', color: 'red'}}>{text}</span>
    }]

    if (role !== 2) {
      columns.push({
        title: '评价详情',
        dataIndex: 'detail',
        render: (text, record) => {
          const values = getValue(record, 'value', [])
          const cnt = values.map(item => {
            const score = item.score
            const name = item.owner.userName
            return (
              <div key={item._id}>{name}：{score}</div>
            )
          })
          return cnt
        }
      })
    }

    return (
      <Card className='main-content-card' title={role === 2 ? '我的成绩' : '成绩统计'} bordered={false}>
        <Table
          rowKey={(record, i) => i}
          size='small'
          bordered
          dataSource={results}
          columns={columns}
        />
      </Card>
    )
  }
}

export default ScoreManage
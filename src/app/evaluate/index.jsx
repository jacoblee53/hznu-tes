import React, { Fragment } from 'react'
import { Card, Tag, Icon, Table, Button } from 'antd'
import { inject, observer } from 'mobx-react'
import { API_SERVER } from '../../constant/apis'
import moment from 'moment'

import './index.less'
import { calculateGrade } from '../../util/grade'
@inject('evalStore', 'evalActions', 'userStore')
@observer
class Evaluate extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    this.props.evalActions.fetch()
  }

  doEval = item => {
    window.location.assign(
      location.origin + location.pathname + '#/evaluate/' + item._id
    )
  }

  render() {
    const { evals, isLoading } = this.props.evalStore
    const { user } = this.props.userStore
    const role = getValue(user, 'role', '')

    let columns = [{
      title: '任务标题',
      key: 'taskName',
      render: (record) => {
        const taskName = getValue(record, 'dotaskId.task.taskName', '')
        const id = getValue(record, 'owner', '')
        const userId = getValue(record, 'dotaskId.owner._id', '')
        return (
          <span>{id === userId ? (<Tag color='#5755d9'>自</Tag>):''}{taskName}</span>
        )
      }
    }, {
      title: '使用标准',
      key: 'standards',
      render: (record) => {
        const standards = getValue(record, 'dotaskId.task.standards', [])
        return (
          <div>
            {standards.map((item, idx) => (
              <div key={idx}>
                <Tag>{item.title}</Tag>
              </div>
            ))}
          </div>
        )
      }
    }, {
      title: '提交内容',
      key: 'uploadContent',
      render: (record) => {
        const docPath = getValue(record, 'dotaskId.docPath', '')
        const pptPath = getValue(record, 'dotaskId.pptPath', '')
        const mediaPath = getValue(record, 'dotaskId.mediaPath', '')
        return (
          <Fragment>
            <Tag color={docPath?'blue':''} >
              <a href={API_SERVER + '/' + docPath} target='_blank'>
              <Icon type='file-word' />
              </a>
            </Tag>
            <Tag color={pptPath?'orange':''} >
              <a href={API_SERVER + '/' + pptPath} target='_blank'>
              <Icon type='file-ppt' />
              </a>
            </Tag>
            <Tag color={mediaPath?'green':''} >
              <a href={API_SERVER + '/' + mediaPath} target='_blank'>
              <Icon type='video-camera'/>
              </a>
            </Tag>
          </Fragment>
        )
      }
    }, {
      title: '截止日期',
      key: 'endDate',
      render: (record) => {
        const endDate = getValue(record, 'dotaskId.task.endDate', '')
        return (
          <span>{moment(endDate).format('YYYY-MM-DD HH:MM')}</span>
        )
      }
    }, {
      title: '评分',
      key: 'grade',
      render: (record) => {
        const grade = getValue(record, 'grade', null)
        return (
          <span>{calculateGrade(grade).toFixed(0)}</span>
        )
      }
    }, {
      title: '操作',
      key: 'operator',
      render: (record) => {
        return (
          <Button size='small' type='dashed' onClick={() => this.doEval(record)}><Icon type='edit' /> 去评价</Button>
        )
      }
    }]

    let nameCol = [{
      title: '学生姓名',
      key: 'userName',
      render: (record) => {
        const userName = getValue(record, 'dotaskId.owner.userName', '')
        return (
          <span>{userName}</span>
        )
      }
    }]

    if (role !== 2) columns = nameCol.concat(columns)

    return (
      <Card title='打分评价' className='main-content-card' bordered={false}>
        <Table
          loading={isLoading}
          size='small'
          dataSource={evals}
          bordered
          columns={columns}
          rowKey='_id'
        />
      </Card>
    )
  }
}

export default Evaluate
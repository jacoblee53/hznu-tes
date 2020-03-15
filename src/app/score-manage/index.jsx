import React, { Fragment } from 'react'
import { Card, Table, Select, Button, Modal } from 'antd'
import { inject, observer } from 'mobx-react'

import ScoreChart from './component/ScoreChart'
import './index.less'

@inject(
  'userStore',
  'scoreManageStore',
  'scoreManageActions',
  'classManageStore',
  'classManageActions',
  'taskManageActions',
  'taskManageStore'
)
@observer
class ScoreManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isChartModal: false,
      currentData: [],
      currentTask: '',
      currentClass: ''
    }
  }

  componentDidMount() {
    this.fetch()
  }

  async fetch() {
    const { user } = this.props.userStore
    const role = getValue(user, 'role', false)
    const id = getValue(user, 'id', '')
    const classId = getValue(user, 'classId', '')
    role !== 2 && (await this.props.classManageActions.fetch())
    await this.props.scoreManageActions.fetchResult()
    await this.props.taskManageActions.fetch()
    const { tasks } = this.props.taskManageStore
    const { classes } = this.props.classManageStore
    if (tasks && tasks.length > 0) {
      const currentTask = tasks[0]._id
      if (role === 2) {
        const currentData = this.props.scoreManageStore.results.filter(
          i => i.task._id === currentTask && i.owner._id === id
        )
        this.setState({ currentData, currentTask, currentClass: classId })
      } else {
        if (classes && classes.length > 0) {
          const currentClass = classes[0]._id
          const currentData = this.props.scoreManageStore.results.filter(
            i =>
              i.task._id === currentTask &&
              i.task.taskClass.indexOf(value) !== -1
          )
          this.setState({ currentData, currentTask, currentClass })
        }
      }
    }
  }

  onSelectTaskChange = value => {
    const { tasks } = this.props.taskManageStore
    const { user } = this.props.userStore
    const role = getValue(user, 'role', false)
    const id = getValue(user, 'id', '')
    if (tasks && tasks.length > 0) {
      if (role === 2) {
        const currentData = this.props.scoreManageStore.results.filter(
          i =>
            i.owner._id === id &&
            i.task._id === value &&
            i.task.taskClass.indexOf(this.state.currentClass) !== -1
        )
        this.setState({ currentData, currentTask: value })
      } else {
        const currentData = this.props.scoreManageStore.results.filter(
          i =>
            i.task._id === value &&
            i.task.taskClass.indexOf(this.state.currentClass) !== -1
        )
        this.setState({ currentData, currentTask: value })
      }
    }
  }

  onSelectClassChange = value => {
    const { classes } = this.props.classManageStore
    if (classes && classes.length > 0) {
      const currentData = this.props.scoreManageStore.results.filter(
        i =>
          i.task._id === this.state.currentTask &&
          i.task.taskClass.indexOf(value) !== -1
      )
      this.setState({ currentData, currentClass: value })
    }
  }

  exportGrade = () => {}

  render() {
    const {
      userStore,
      scoreManageStore,
      classManageStore,
      taskManageStore
    } = this.props
    const { isChartModal } = this.state
    const { user } = userStore
    const { classes } = classManageStore
    const { tasks } = taskManageStore
    const role = getValue(user, 'role', false)

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        render: (text, record) => {
          const name = getValue(record, 'owner.userName', '')
          return <span>{name}</span>
        }
      },
      {
        title: '总分',
        dataIndex: 'score',
        render: text => (
          <span
            style={{ fontWeight: 'bold', color: '#0070cc', letterSpacing: 1 }}
          >
            {text}
          </span>
        )
      }
    ]

    if (role !== 2) {
      columns.push({
        title: '评价详情',
        dataIndex: 'detail',
        width: '70%',
        render: (text, record) => {
          const values = getValue(record, 'value', [])
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {values.sort().map(i => (
                <div style={{ width: '23%', textAlign: 'left' }} key={i._id}>
                  {i.owner.userName}: {i.score}
                </div>
              ))}
            </div>
          )
        }
      })
    }

    const extraContent = (
      <Fragment>
        {tasks && tasks.length > 0 && (
          <Fragment>
            <Select
              size='default'
              style={{ width: 200 }}
              defaultValue={tasks[0]._id}
              onChange={this.onSelectTaskChange}
            >
              {tasks.map(i => (
                <Select.Option key={i._id} value={i._id}>
                  {i.taskName}
                </Select.Option>
              ))}
            </Select>
            {classes && classes.length > 0 && role !== 2 && (
              <Select
                size='default'
                defaultValue={classes[0]._id}
                style={{ width: 100, marginLeft: 14 }}
                onChange={this.onSelectClassChange}
              >
                {classes.map(i => (
                  <Select.Option key={i._id} value={i._id}>
                    {i.className}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Fragment>
        )}
        {role !== 2 && (
          <Button
            type='primary'
            style={{ marginLeft: 14 }}
            onClick={() => {
              this.setState({ isChartModal: true })
            }}
          >
            统计导出
          </Button>
        )}
      </Fragment>
    )

    return (
      <Card
        className='main-content-card'
        title='成绩统计'
        bordered={false}
        extra={extraContent}
      >
        <Table
          rowKey={(record, i) => i}
          size='small'
          pagination={false}
          bordered
          dataSource={this.state.currentData}
          columns={columns}
        />
        {isChartModal && (
          <Modal
            width={600}
            visible
            onCancel={() => this.setState({ isChartModal: false })}
          >
            <ScoreChart data={this.state.currentData} />
          </Modal>
        )}
      </Card>
    )
  }
}

export default ScoreManage

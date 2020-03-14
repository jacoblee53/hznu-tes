import React, { Fragment } from 'react'
import { Card, Tag, Icon, Table, Button, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { API_SERVER } from '../../constant/apis'

import './index.less'
import { calculateGrade } from '../../util/grade'

const StandardButton = styled(Button)`
  display: block;
  text-align: center;
  width: 29%;
`
const GradeSpan = styled.span`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
`

@inject(
  'taskManageActions',
  'taskManageStore',
  'evalStore',
  'evalActions',
  'userStore'
)
@observer
class Evaluate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentData: []
    }
  }

  async componentDidMount() {
    await this.fetch()
    const { tasks } = this.props.taskManageStore
    if (tasks && tasks.length > 0) {
      const currentData = this.props.evalStore.evals.filter(
        i => i === tasks[0]._id
      )
      this.setState({ currentData })
    }
  }

  onSelectChange = value => {
    const { tasks } = this.props.taskManageStore
    if (tasks && tasks.length > 0) {
      const currentData = this.props.evalStore.evals.filter(
        i => i.dotaskId.task._id === value
      )
      this.setState({ currentData })
    }
  }

  fetch() {
    this.props.evalActions.fetch()
    this.props.taskManageActions.fetch()
  }

  doEval = item => {
    window.location.assign(
      location.origin + location.pathname + '#/evaluate/' + item._id
    )
  }

  exportGrade = () => {}

  generateStandardButton = (icon, path) => {
    const gotoLocation = path => {
      if (path) {
        path = API_SERVER + '/' + path
        window.open(path)
      }
    }
    const getType = path => (path ? 'primary' : 'default')
    const getDisabled = path => (path ? false : true)
    return (
      <StandardButton
        onClick={() => gotoLocation(path)}
        disabled={getDisabled(path)}
        type={getType(path)}
        size='small'
      >
        <Icon type={icon} />
      </StandardButton>
    )
  }

  render() {
    const { isLoading } = this.props.evalStore
    const { user } = this.props.userStore
    const { tasks } = this.props.taskManageStore
    const { currentData } = this.state
    const role = getValue(user, 'role', '')

    let columns = [
      {
        title: '提交内容',
        key: 'uploadContent',
        width: '28%',
        render: record => {
          const docPath = getValue(record, 'dotaskId.docPath', '')
          const pptPath = getValue(record, 'dotaskId.pptPath', '')
          const mediaPath = getValue(record, 'dotaskId.mediaPath', '')
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {this.generateStandardButton('file-word', docPath)}
              {this.generateStandardButton('file-ppt', pptPath)}
              {this.generateStandardButton('video-camera', mediaPath)}
            </div>
          )
        }
      },
      {
        title: '评分',
        key: 'grade',
        render: record => {
          const grade = getValue(record, 'grade', null)
          return <GradeSpan>{calculateGrade(grade).toFixed(1)}</GradeSpan>
        }
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <Button
              size='small'
              type='dashed'
              onClick={() => this.doEval(record)}
            >
              <Icon type='edit' /> 去打分
            </Button>
          )
        }
      }
    ]

    let nameCol = [
      {
        title: '学生姓名',
        key: 'userName',
        render: record => {
          const userName = getValue(record, 'dotaskId.owner.userName', '')
          return <span>{userName}</span>
        }
      }
    ]

    if (role !== 2) columns = nameCol.concat(columns)

    return (
      <Card
        title='打分评价'
        className='main-content-card'
        bordered={false}
        extra={
          <Fragment>
            {tasks && tasks.length > 0 && (
              <Select
                size='default'
                defaultValue={tasks && tasks.length > 0 && tasks[0]._id}
                style={{ width: 200 }}
                onChange={this.onSelectChange}
              >
                {tasks.map(i => (
                  <Select.Option key={i._id} value={i._id}>
                    {i.taskName}
                  </Select.Option>
                ))}
              </Select>
            )}
            {role === 1 && (
              <Button
                type='primary'
                onClick={this.exportGrade}
                style={{ marginLeft: 10 }}
              >
                导出成绩
              </Button>
            )}
          </Fragment>
        }
      >
        {tasks && tasks.length > 0 && (
          <Table
            loading={isLoading}
            size='small'
            dataSource={currentData}
            bordered
            pagination={{
              pageSize: 12
            }}
            columns={columns}
            rowKey='_id'
          />
        )}
      </Card>
    )
  }
}

export default Evaluate

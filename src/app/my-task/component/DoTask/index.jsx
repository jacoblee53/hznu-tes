import React from 'react'
import { Card, Upload, Icon, Divider, Row, Col, Tag, Statistic } from 'antd'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

import './index.less'

@inject('myTaskActions', 'myTaskStore', 'userStore')
@observer
class DoTask extends React.Component {
  constructor(props) {
    super(props)
    this.taskId = props.match && props.match.params.id
  }

  async componentDidMount() {
    this.fetchCurrentTask()
    this.fetchDotask()
  }

  fetchCurrentTask = () => {
    this.props.myTaskActions.fetchCurrentTask({
      id: this.taskId
    })
  }

  fetchDotask = () => {
    this.props.myTaskActions.fetchCurrentDotask({
      taskId: this.taskId
    })
  }

  componentWillUnmount() {
    this.props.myTaskActions.setCurrentTask({})
  }

  render() {
    const { currentDotask, currentTask } = this.props.myTaskStore
    const { taskDesc, taskName, endDate } = currentTask
    const isEnd = moment() >moment(endDate)
    const extraContent = (
      <div style={{display: 'flex'}}>
        {isEnd ?  <Tag color='#e85600'>已截止</Tag> : <Tag color='#32b643'>进行中</Tag>}
        <Statistic.Countdown className='countdown' value={endDate} format='D天H时m分' />
      </div>
    )

    return (
      <Card
        title={taskName || ''}
        bordered
        extra={extraContent}
      >
        <Divider orientation='left'>任务描述</Divider>
        <pre>{taskDesc}</pre>

        <Divider orientation='right'>任务提交</Divider>
        <Row type='flex' justify='space-around'>
          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='file-word' />
              </p>
              <p className='ant-upload-hint'>点击提交word文档</p>
            </Upload.Dragger>
          </Col>
          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='file-ppt' />
              </p>
              <p className='ant-upload-hint'>点击提交ppt文档</p>
            </Upload.Dragger>
          </Col>
          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='video-camera' />
              </p>
              <p className='ant-upload-hint'>点击提交视频压缩文件</p>
            </Upload.Dragger>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default DoTask
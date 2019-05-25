import React from 'react'
import { Card, Upload, Icon, Divider, Row, Col, Tag } from 'antd'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

import { getUploadAction } from '../../../../util/getUploadAction'
import { API_SERVER } from '../../../../constant/apis'
import './index.less'

@inject('myTaskActions', 'myTaskStore', 'userStore')
@observer
class DoTask extends React.Component {
  constructor(props) {
    super(props)
    this.taskId = props.match && props.match.params.id

    this.state = {
      docFileList: [],
      pptFileList: [],
      mediaFileList: [],
    }
  }

  componentDidMount() {
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

  handleUpload = (info, type) => {
    const types = ['docFileList', 'pptFileList', 'mediaFileList']
    const path = ['docPath', 'pptPath', 'mediaPath']

    let fileList = [...info.fileList]
    fileList = fileList.slice(-1)

    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url =  API_SERVER + '/' + file.response.data[path[type]]
      }
      return file
    })

    this.setState({ [types[type]]: fileList })
    this.fetchDotask()
  }

  render() {
    const { myTaskStore, userStore } = this.props
    const { currentDotask, currentTask } = myTaskStore
    const { taskDesc, taskName, endDate } = currentTask
    const { docPath, pptPath, mediaPath } = currentDotask
    const userId = getValue(userStore, 'user.id', '')
    const taskId = currentTask && currentTask._id
    const isEnd = moment() > moment(endDate)

    const extraContent = (
      <div style={{display: 'flex'}}>
        {isEnd ?  <Tag color='#e85600'>已截止</Tag> : <Tag color='#32b643'>进行中</Tag>}
        {moment(endDate).format('YYYY-MM-DD hh:mm')}
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
        <Row type='flex' justify='space-around' style={{marginBottom: 60}}>
          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
              name='doc'
              onChange={info => this.handleUpload(info, 0)}
              action={getUploadAction('doc', taskId, userId)}
              fileList={this.state.docFileList}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='file-word' />
              </p>
              <p className='ant-upload-hint'>点击提交word文档</p>
            </Upload.Dragger>
            <a className='url' href={API_SERVER + '/' + docPath} target='_blank'>{docPath}</a>
          </Col>

          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
              name='ppt'
              onChange={info => this.handleUpload(info, 1)}
              action={getUploadAction('ppt', taskId, userId)}
              fileList={this.state.pptFileList}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='file-ppt' />
              </p>
              <p className='ant-upload-hint'>点击提交ppt文档</p>
            </Upload.Dragger>
            <a className='url' href={API_SERVER + '/' + pptPath} target='_blank'>{pptPath}</a>
          </Col>

          <Col span={7}>
            <Upload.Dragger
              disabled={isEnd}
              multiple={false}
              name='media'
              onChange={info => this.handleUpload(info, 2)}
              action={getUploadAction('media', taskId, userId)}
              fileList={this.state.mediaFileList}
            >
              <p className='ant-upload-drag-icon'>
                <Icon style={{fontSize:25}} type='video-camera' />
              </p>
              <p className='ant-upload-hint'>点击提交视频压缩文件</p>
            </Upload.Dragger>
            <a className='url' href={API_SERVER + '/' + mediaPath} target='_blank'>{mediaPath}</a>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default DoTask
import React, { Fragment } from 'react'
import {
  Card,
  Button,
  Icon,
  message,
  Popconfirm,
  Tabs,
  Tooltip
} from 'antd'
import { inject, observer } from 'mobx-react'

import { API_SERVER } from '../../constant/apis'
import NewStandard from './component/NewStandard'
import SingleTable from './component/SingleTable'
import './index.less'

const mr = {
  marginRight: 14
}

@inject('standardManageActions', 'standardManageStore')
@observer
class StandardManage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.standardManageActions
    this.store = props.standardManageStore

    this.state = {
      isNewStandardModal: false,
      current: {}
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

  handleDelete = record => {
    console.log(record)
    const id = record._id
    this.actions.delete({ id })
  }

  onTabChange = value => {
    console.log(value)
  }

  handleDownload = () => {
    window.open(API_SERVER + '/public/sample/sample2.xlsx', '_blank')
  }

  render() {
    const { standards } = this.store
    const { isNewStandardModal, current } = this.state

    const extraContent = (
      <Fragment>
        <Tooltip placement='top' title='下载示例'>
          <Button
            size='small'
            style={{ marginRight: 14 }}
            onClick={this.handleDownload}
          >
            <Icon type='download' />
          </Button>
        </Tooltip>
        <Tooltip placement='top' title='新建标准'>
          <Button
            type='default'
            size='small'
            onClick={() => this.setState({ isNewStandardModal: true })}
          >
            <Icon type='plus' />
          </Button>
        </Tooltip>
      </Fragment>
    )

    return (
      <Card bordered={false} className='main-content-card'>
        <Tabs
          size='small'
          tabBarExtraContent={extraContent}
          onChange={this.onTabChange}
          animated={false}
        >
          {standards &&
            standards.map(i => (
              <Tabs.TabPane tab={i.title} key={i._id}>
                <div style={{ marginBottom: 15, textAlign: 'right' }}>
                  <Button
                    size='small'
                    type='primary'
                    onClick={() => {}}
                    style={mr}
                  >
                    <Icon type='import' />
                    导入
                  </Button>
                  <Popconfirm
                    title='确定删除该标准么？'
                    onConfirm={() => this.handleDelete(i)}
                  >
                    <Button size='small' type='primary'>
                      <Icon type='delete' />
                      删除
                    </Button>
                  </Popconfirm>
                </div>
                <SingleTable data={i} {...this.props} />
              </Tabs.TabPane>
            ))}
        </Tabs>

        {isNewStandardModal && (
          <NewStandard
            visible={isNewStandardModal}
            onOk={this.createStandard}
            onCancel={() => this.setState({ isNewStandardModal: false })}
          />
        )}
      </Card>
    )
  }
}

export default StandardManage

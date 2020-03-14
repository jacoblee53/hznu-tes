import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Tooltip, Button, Icon, Popconfirm, message, Tabs } from 'antd'
import styled from 'styled-components'

import { API_SERVER } from '../../constant/apis'
import NewClass from './component/NewClass'
import ImportExcel from './component/ImportExcel'
import ClassMemberTable from './component/ClassMemberTable'
import './index.less'

const TabButton = styled(Button)`
  margin-right: 14px;
`

@inject('classManageStore', 'classManageActions')
@observer
class ClassManage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.classManageActions
    this.store = props.classManageStore

    this.state = {
      isLoading: false,
      isImportModal: false,
      isNewClassModal: false,
      currentClass: null,
      searchText: ''
    }
  }

  componentDidMount() {
    this.fetch()
  }

  async fetch() {
    this.setState({ isLoading: true })
    await this.actions.fetch()
    this.setState({ isLoading: false })
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => () => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  handleDelete = record => {
    const id = record._id
    this.actions.delete({ id })
  }

  createClass = async className => {
    let r = await this.actions.create({ className })
    if (r.code === 200) {
      message.success('创建成功')
      this.setState({ isNewClassModal: false })
    }
  }

  importStudent = async (data, currentClass = this.state.currentClass) => {
    let r = await this.actions.import({
      students: data.map(item => ({
        ...item,
        role: 2,
        classId: currentClass._id
      }))
    })
    if (r.code === 200) {
      message.success(r.msg)
      this.setState({ isImportModal: false })
    }
  }

  handleDownload = () => {
    window.open(API_SERVER + '/public/sample/sample.xlsx', '_blank')
  }

  render() {
    const { isNewClassModal, isImportModal, currentClass } = this.state
    const { classes } = this.store

    const extraContent = (
      <Fragment>
        <Tooltip placement='top' title='下载示例'>
          <TabButton size='small' onClick={this.handleDownload}>
            <Icon type='download' />
          </TabButton>
        </Tooltip>
        <Tooltip placement='top' title='新建班级'>
          <Button
            size='small'
            onClick={() => this.setState({ isNewClassModal: true })}
          >
            <Icon type='plus' />
          </Button>
        </Tooltip>
      </Fragment>
    )

    return (
      <Card bordered={false} className='main-content-card'>
        <Tabs size='small' animated={false} tabBarExtraContent={extraContent}>
          {classes &&
            classes.map(i => (
              <Tabs.TabPane tab={i.className} key={i._id}>
                <div style={{ marginBottom: 15, textAlign: 'right' }}>
                  <TabButton
                    size='small'
                    type='primary'
                    onClick={() =>
                      this.setState({
                        isImportModal: true,
                        currentClass: i
                      })
                    }
                  >
                    <Icon type='import' />
                    导入
                  </TabButton>
                  <Popconfirm
                    title='确定删除该班级么？'
                    okText='确认'
                    cancelText='取消'
                    onConfirm={() => this.handleDelete(i)}
                  >
                    <Button size='small' type='primary'>
                      <Icon type='delete' />
                      移除
                    </Button>
                  </Popconfirm>
                </div>
                <ClassMemberTable currentClass={i} />
              </Tabs.TabPane>
            ))}
        </Tabs>

        {isNewClassModal && (
          <NewClass
            visible={isNewClassModal}
            onOk={this.createClass}
            onCancel={() => this.setState({ isNewClassModal: false })}
          />
        )}

        {isImportModal && (
          <ImportExcel
            visible={isImportModal}
            onOk={this.importStudent}
            onCancel={() => this.setState({ isImportModal: false })}
          />
        )}
      </Card>
    )
  }
}

export default ClassManage

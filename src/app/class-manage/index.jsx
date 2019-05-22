import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Table, Input, Button, Icon, Popconfirm, message } from 'antd'

import NewClass from './component/NewClass'
import ImportExcel from './component/ImportExcel'
import EditDrawer from './component/EditDrawer'
import './index.less'

const mr = {
  marginRight: 24
}

@inject('classManageStore', 'classManageActions')
@observer
class ClassManage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.classManageActions
    this.store = props.classManageStore

    this.state = {
      isLoading: false,
      searchText: '',
      isNewClassModal: false,
      isImportModal: false,
      isEditDrawer: false,
      currentClass: null,
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
    this.actions.download()
  }

  render() {
    const { isLoading, isNewClassModal, isImportModal, isEditDrawer, currentClass } = this.state
    const { classes } = this.store

    const columns = [
      {
        title: '班级名称',
        dataIndex: 'className',
        width: '30%',
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div className='custom-filter-dropdown'>
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder='查询班级'
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button
              type='primary'
              onClick={this.handleSearch(selectedKeys, confirm)}
            >
              查询
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>重置</Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type='search'
            style={{ color: filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        onFilter: (value, record) =>
          record.className.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
        render: text => {
          const { searchText } = this.state
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
                .map((fragment, i) =>
                  fragment.toLowerCase() === searchText.toLowerCase() ? (
                    <span key={i} className='highlight'>
                      {fragment}
                    </span>
                  ) : (
                    fragment
                  )
                )}
            </span>
          ) : (
            text
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '40%',
        render: (text, record) => (
          <div>
            <Button
              size='small'
              type='dashed'
              style={mr}
              onClick={() => this.setState({ isImportModal: true, currentClass: record })}
            >
              <Icon type='import' />
              导入
            </Button>
            <Button
              size='small'
              type='dashed'
              onClick={() => this.setState({ isEditDrawer: true, currentClass: record })}
              style={mr}
            >
              <Icon type='edit' />
              编辑
            </Button>
            <Button
              size='small'
              type='dashed'
              style={mr}
            >
              <Icon type='download' />
              下载
            </Button>
            <Popconfirm
              title='确定删除该班级么？'
              okText='确认'
              cancelText='取消'
              onConfirm={() => this.handleDelete(record)}
            >
              <Button
                size='small'
                type='dashed'
              >
                <Icon type='delete' />
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    ]

    const extraContent = (
      <Fragment>
        <Button
          type='primary'
          style={mr}
          onClick={() => this.setState({ isNewClassModal: true})}
        >
          新建班级
        </Button>
        <Button type='primary' onClick={this.handleDownload}>下载示例</Button>
     </Fragment>
    )

    return (
      <Card
        title='班级管理'
        bordered={false}
        extra={extraContent}
      >

        <Table
          rowKey='_id'
          bordered
          size='small'
          loading={isLoading}
          dataSource={classes}
          columns={columns}
        />

        {isNewClassModal && <NewClass
          visible={isNewClassModal}
          onOk={this.createClass}
          onCancel={() => this.setState({ isNewClassModal: false })}
        />}

        {isImportModal && <ImportExcel
          visible={isImportModal}
          onOk={this.importStudent}
          onCancel={() => this.setState({ isImportModal: false })}
        />}

        {isEditDrawer && <EditDrawer
          currentClass={currentClass}
          visible={isEditDrawer}
          onClose={() => this.setState({ isEditDrawer: false})}
        />}
      </Card>
    )
  }
}

export default ClassManage

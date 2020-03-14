import React from 'react'
import { Drawer, Table, Input, Icon, Button } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('classManageActions', 'classManageStore')
@observer
class EditDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.classManageActions
    this.store = props.classManageStore

    const { currentClass } = this.props
    this.classId = getValue(currentClass, '_id', false)
  }

  componentDidMount() {
    this.classId && this.actions.fetchMember({ classId: this.classId })
  }

  handleRemove = uid => {
    this.actions.removeMember({
      id: uid,
      classId: this.classId
    })
  }

  handleResetPwd = uid => {
    this.actions.resetPwd({
      id: uid
    })
  }

  handleAddMember = account => {
    this.actions.addMember({
      account,
      classId: this.classId
    })
  }

  render() {
    const { visible, currentClass, onClose } = this.props
    const { currentStudents } = this.store

    const columns = [
      {
        title: '学号',
        dataIndex: 'account',
        width: '40%'
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        width: '30%'
      },
      {
        title: '编辑',
        width: '30%',
        render: (text, record) => {
          return (
            <div>
              <Button.Group>
                <Button
                  size='small'
                  onClick={() => this.handleResetPwd(record._id)}
                >
                  重置
                </Button>
                <Button
                  size='small'
                  onClick={() => this.handleRemove(record._id)}
                >
                  移除
                </Button>
              </Button.Group>
            </div>
          )
        }
      }
    ]

    return (
      <Drawer
        title={
          (currentClass &&
            `${currentClass.className} (${currentStudents.length}人)`) ||
          ''
        }
        width={550}
        destroyOnClose
        visible={visible}
        onClose={onClose}
      >
        <Table
          className='stu-list-table'
          dataSource={currentStudents}
          columns={columns}
          bordered
          pagination={false}
          rowKey='_id'
          size='small'
        />
        <div className='drawer-bottom-block'>
          <Button size='default' type='primary' onClick={this.handleAddMember}>
            添加
          </Button>
        </div>
      </Drawer>
    )
  }
}

export default EditDrawer

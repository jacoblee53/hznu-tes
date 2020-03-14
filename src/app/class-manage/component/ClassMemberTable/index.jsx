import React from 'react'
import { Table, Divider } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('classManageActions', 'classManageStore')
@observer
class ClassMemberTable extends React.Component {
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
        title: '操作',
        width: '30%',
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.handleResetPwd(record._id)}>重置</a>
              <Divider type='vertical' />
              <a onClick={() => this.handleRemove(record._id)}>删除</a>
            </div>
          )
        }
      }
    ]

    return (
      <Table
        title={() =>
          (currentClass &&
            `${currentClass.className} (${currentStudents.length}人)`) ||
          ''
        }
        className='stu-list-table'
        dataSource={currentStudents}
        columns={columns}
        bordered
        pagination={false}
        rowKey='_id'
        size='small'
      />
    )
  }
}

export default ClassMemberTable

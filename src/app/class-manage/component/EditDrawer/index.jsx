import React from 'react'
import { Drawer, Table } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('classManageActions')
@observer
class EditDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.classManageActions
  }

  handleRemove = uid => {

  }

  handleResetPwd = uid => {

  }

  render() {
    const { visible, currentClass, students = [] } = this.props

    const columns = [
      {
        title: '学号',
        dataIndex: 'account',
        width: '40%'
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        width: '26%'
      },
      {
        title: '编辑',
        width: '34%',
        render: (text, record) => {
          return (
            <div>
              <Button.Group>
                <Button size='small' onClick={() => handleResetPwd(record._id)}>
                  重置
                </Button>
                <Button size='small' onClick={() => handleRemove(record._id)}>
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
        title={`${currentClass.className}（共${students.length}人）`}
        width={400}
        destroyOnClose
        visible={visible}
      >
        <Table
          dataSource={students}
          columns={columns}
          rowKey='_id'
          size='small'
        />
      </Drawer>
    )
  }
}

export default EditDrawer

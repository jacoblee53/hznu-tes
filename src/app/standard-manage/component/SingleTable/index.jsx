import React, { Fragment } from 'react'
import { Table, Button, Input, Form, Divider } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title}不能为空`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onBlur={this.save} onPressEnter={this.save}/>)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

@inject('standardManageStore', 'standardManageActions')
@observer
class SingleTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      count: 0
    }

    this.columns = [{
      title: '评价标题',
      dataIndex: 'title',
      editable: true,
      width: '18%',
    }, {
      title: '评价内容',
      dataIndex: 'content',
      editable: true,
      width: '58%',
    }, {
      title: '分值',
      dataIndex :'point',
      editable: true,
      width: '12%',
    }, {
      title: '操作',
      width: '12%',
      dataIndex: 'operation',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.save(record)}>保存</a>
          <Divider type='vertical' />
          <a>删除</a>
        </Fragment>
      )
    }]
    this.fetchSingle()
  }

  fetchSingle = async () => {
    const standardId = getValue(this.props.data, '_id', '')
    let r = await this.props.standardManageActions.fetchSingle({ standardId })
    this.setState({
      dataSource: r
    })
  }

  handleSave = row => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row._id === item._id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ dataSource: newData })
  }

  delete = record => {

  }

  save = async record => {
    const standardId = getValue(this.props.data, '_id', '')
    await this.props.standardManageActions.updateSingle({...record, standardId})
    this.fetchSingle()
  }

  // TODO: ADD NEW SINGLE
  // addRow = () => {

  // }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      }
    }
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    const { dataSource } = this.state

    return (
      <Fragment>
        {/* <Button type='primary' onClick={this.addRow} style={{marginBottom: 12}}>新建</Button> */}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          size='small'
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record, idx) => idx}
        />
      </Fragment>
    )
  }
}

export default SingleTable
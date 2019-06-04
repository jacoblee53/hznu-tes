import React from 'react'
import { Card, Table, InputNumber, Button, Spin } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('evalStore', 'evalActions')
@observer
class DoEval extends React.Component {
  constructor(props) {
    super(props)
    this.doevalId = props.match && props.match.params.id
    this.tables = {}
    this.state = {
      loading: false,
      grade: {}
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.props.evalActions.fethCurrentEval({ id: this.doevalId })
    let { currentEval } = this.props.evalStore
    let grade = currentEval.grade && JSON.parse(currentEval.grade)
    this.setState({ loading: false, grade })
  }

  submit = () => {
    this.props.evalActions.grade({
      id: this.doevalId,
      grade: this.state.grade
    })
  }

  handleInput = (e, record) => {
    this.setState({
      grade: {
        ...this.state.grade,
        [record._id]: e.target.value || '0'
      }
    })
  }

  render() {
    const { currentEval } = this.props.evalStore
    let grade = currentEval.grade && JSON.parse(currentEval.grade)

    const standards = getValue(currentEval, 'dotaskId.task.standards', [])
    const columns = [{
      dataIndex: 'title',
      title: '评价标题',
      width: 200
    }, {
      dataIndex: 'content',
      title: '评价内容'
    }, {
      dataIndex: 'point',
      title: '分值',
      width: 80
    }, {
      dataIndex: 'grade',
      title: '打分',
      render: (text, record) => {
        let max = parseFloat(getValue(record, 'point', 0))
        let value = (grade && grade[record._id]) || 0

        return (
          <InputNumber
            onBlur={(e) => this.handleInput(e, record)}
            min={0}
            max={max}
            defaultValue={value}
          />
        )
      }
    }]

    return (
      <Card bordered>
        <Spin spinning={this.state.loading}>
          {standards.length > 0 && standards.map(item => (
            <Table
              key={getValue(item, '_id', '')}
              title={() => <h3 style={{marginLeft: 7}}>{getValue(item, 'title', '')}</h3>}
              style={{marginTop: 20}}
              ref={c => this.tables[item._id] = c}
              pagination={false}
              rowKey='_id'
              size='small'
              columns={columns}
              dataSource={getValue(item, 'singles', [])}
            />
          ))}
          {standards.length > 0 && <Button style={{marginTop: 20, float: 'right'}} type='primary' onClick={this.submit}>提交评分</Button>}
        </Spin>
      </Card>
    )
  }
}

export default DoEval
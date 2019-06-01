import React from 'react'
import { Card, Table, Tabs } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('evalStore', 'evalActions')
@observer
class DoEval extends React.Component {
  constructor(props) {
    super(props)
    this.doevalId = props.match && props.match.params.id
  }

  componentDidMount() {
    this.props.evalActions.fethCurrentEval({ id: this.doevalId })
  }

  render() {
    const { currentEval } = this.props.evalStore
    const standards= getValue(currentEval, 'dotaskId.task.standards', [])


    return (
      <Card bordered>
        {/* {standards.length > 0 && standards.map(item => (

        ))} */}
      </Card>
    )
  }
}

export default DoEval
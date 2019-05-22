import React from 'react'
import { Card, Table } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('myTaskActions', 'myTaskStore')
@observer
class Evaluate extends React.Component {
  constructor(props) {
    super(props)

    this.fetch()
  }

  fetch = () => {
    this.props.myTaskActions.fetch()
    console.log(this.props.myTaskStore.tasks)
  }

  render() {
    return (
      <Card title='我的任务' bordered={false}>

      </Card>
    )
  }
}

export default Evaluate
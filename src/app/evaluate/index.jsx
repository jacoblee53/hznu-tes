import React from 'react'
import { Card, Table } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('EvalStore', 'EvalActions')
@observer
class Evaluate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card title='打分评价' bordered={false}>

      </Card>
    )
  }
}

export default Evaluate
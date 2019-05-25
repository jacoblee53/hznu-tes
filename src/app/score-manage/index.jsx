import React from 'react'
import { Card, Table } from 'antd'
import { inject, observer } from  'mobx-react'

import './index.less'

@inject('userStore')
@observer
class ScoreManage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { userStore } = this.props
    const { user } = userStore
    const role = getValue(user, 'role', false)

    return (
      <Card className='main-content-card' title={role === 2 ? '我的成绩' : '成绩统计'} bordered={false}>

      </Card>
    )
  }
}

export default ScoreManage
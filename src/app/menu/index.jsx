import React from 'react'
import { version } from '../../../package.json'

class Menu extends React.Component {
  render() {
    return (
      <div>
        {version}
      </div>
    )
  }
}

export default Menu
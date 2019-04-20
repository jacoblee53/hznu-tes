import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './scss/antd.scss'

import asyncComponent from './component/AsyncComponent'
import * as urls from './constant/urls.js'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={urls.LOGIN}
            exact
            component={asyncComponent(() => import('./app/login'))}
          />
          <Route
            path='/'
            render={() => (
              <div className='app-root'>

              </div>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App

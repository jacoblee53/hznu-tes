import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import asyncComponent from './component/AsyncComponent'
import Dashboard from './component/Dashboard'
import * as urls from './constant/urls.js'
import jwt from './util/token'

@inject('userActions')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    if (jwt.getToken()) {
      props.userActions.autoLogin()
    } else {
      window.location.assign(
        location.origin + location.pathname + '#' + '/login'
      )
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={urls.LOGIN}
            component={asyncComponent(() => import('./app/login'))}
          />
          <Route
            path='/'
            render={() => (
              <div className='app-root'>
                <Dashboard />
                <div className='app-wrapper'>
                  <div className='app-content'>
                    <Switch>
                      <Route exact path={urls.HOME} />
                    </Switch>
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App

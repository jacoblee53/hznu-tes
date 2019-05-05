import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Dashboard from './component/Dashboard'
import * as urls from './constant/urls.js'
import jwt from './util/token'
import Loadable from './component/Loadable'

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
            component={Loadable({ loader: () => import('./app/login')})}
          />
          <Route
            path='/'
            render={() => (
              <div className='app-root'>
                <Dashboard>
                  <Switch>
                    <Route exact path={urls.HOME} />
                    <Route
                      exact
                      path={urls.TASK_MANAGE}
                      component={Loadable({ loader: () => import('./app/task-manage')})}
                    />
                    <Route
                      exact
                      path={urls.EVALUATE}
                      component={Loadable({ loader: () => import('./app/evaluate')})}
                    />
                    <Route
                      exact
                      path={urls.SCORE_MANAGE}
                      component={Loadable({ loader: () => import('./app/score-manage')})}
                    />
                    <Route
                      exact
                      path={urls.STANDARD_MANAGE}
                      component={Loadable({ loader: () => import('./app/standard-manage')})}
                    />
                    <Route
                      exact
                      path={urls.CLASS_MANAGE}
                      component={Loadable({ loader: () => import('./app/class-manage')})}
                    />
                  </Switch>
                </Dashboard>
              </div>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App

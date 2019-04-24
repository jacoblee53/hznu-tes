import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import asyncComponent from './component/AsyncComponent'
import Menu from './app/menu'
import Header from './component/Header'
import * as urls from './constant/urls.js'

class App extends React.Component {
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
                <Header />
                <div className='app-wrapper'>
                  <div className='app-menu'>
                    <Menu />
                  </div>
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

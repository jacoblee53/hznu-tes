import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import getValue from './util/getValue'

import App from './App'
import injects from './inject'

window.getValue = getValue

configure({ enforceActions: 'observed' })

ReactDOM.render(
  <Provider {...injects}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root'),
)

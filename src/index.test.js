import React from 'react'
import { shallow, render } from 'enzyme'
import moment from 'moment'
import renderer from 'react-test-renderer'
import { Provider } from 'mobx-react'
import injects from './inject/index'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

describe('src/index.js', () => {
  const AppContainer = <div>AppContainer</div>
  const MobxReactContainer = (
    <Provider {...injects}>
      <div>MobxReactContainer</div>
    </Provider>
  )
  const LocaleContainer = (
    <LocaleProvider locale={zhCN}>
      <div>{moment('2018-08-06').format('YYYY-MM-DD HH:mm:ss')}</div>
    </LocaleProvider>
  )

  it('AppContainer should match snapshot', () => {
    const tree = renderer.create(AppContainer).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('AppContainer should have only one child', () => {
    const wrapper = shallow(AppContainer)
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('MobxReactContainer should have mobx store and action', () => {
    // should have all injected mobx actions and stores
    Object.keys(injects).forEach(key => {
      expect(MobxReactContainer.props).toHaveProperty(key)
    })
    const wrapper = render(MobxReactContainer)
    expect(wrapper.text()).toEqual('MobxReactContainer')
  })

  it('LocaleProvider should provide chinese text', () => {
    // NOTE:
    //  locale-provider would set moment.locale(locale)
    //  so there is no need to explicitly set it in code
    const wrapper = shallow(LocaleContainer)
    expect(wrapper.props('locale')).toBeTruthy()
    expect(wrapper.text()).toEqual('2018-08-06 00:00:00')
    expect(moment.locale()).toEqual('zh-cn')
  })
})

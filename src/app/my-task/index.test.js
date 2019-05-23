import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import injects from '../../inject/index'
import MyTask from './index'

let wrappedComponent = <MyTask {...injects} />

let wrapper

describe('src/app/my-task/index.test.js', () => {
  it('should render correctly', () => {
    wrapper = mount(wrappedComponent)
    expect(wrapper.html()).toBeTruthy()
  })

  it('should matchSnapshot', () => {
    const tree = renderer.create(wrappedComponent)
    expect(tree).toMatchSnapshot()
  })
})

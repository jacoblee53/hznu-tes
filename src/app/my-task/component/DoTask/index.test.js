import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import injects from '../../../../inject/index'
import DoTask from './index'

let wrappedComponent = <DoTask {...injects} />

let wrapper

describe('src/app/my-task/component/index.test.js', () => {
  it('should render correctly', () => {
    wrapper = mount(wrappedComponent)
    expect(wrapper.html()).toBeTruthy()
  })

  it('should matchSnapshot', () => {
    const tree = renderer.create(wrappedComponent)
    expect(tree).toMatchSnapshot()
  })
})

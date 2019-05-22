import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import injects from './inject'
import App from './app'

let wrappedComponent = <App {...injects} />

let wrapper

describe('src/app.test.js', () => {
  it('should render correctly', () => {
    wrapper = mount(wrappedComponent)
    expect(wrapper.html()).toBeTruthy()
  })

  it('should matchSnapshot', () => {
    const tree = renderer.create(wrappedComponent)
    expect(tree).toMatchSnapshot()
  })
})

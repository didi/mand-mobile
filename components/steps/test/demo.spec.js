import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import Demo6 from './cases/demo6'
import Demo7 from './cases/demo7'
import Demo8 from './cases/demo8'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Steps - Demo', () => {
  test(`Basic`, () => {
    const wrapper = mount(Demo0)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Non-integer progress`, () => {
    const wrapper = mount(Demo1)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Custom step icon`, () => {
    const wrapper = mount(Demo2)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Specify the current step`, done => {
    const wrapper = mount(Demo3)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Transition of rogress changes`, done => {
    const wrapper = mount(Demo4)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Add custom styles through by class named "current"`, () => {
    const wrapper = mount(Demo5)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Complete all steps`, () => {
    const wrapper = mount(Demo6)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Vertical display`, () => {
    const wrapper = mount(Demo7)
    expect(wrapper.html()).toMatchSnapshot()
  })
  test(`Custom content`, done => {
    const wrapper = mount(Demo8)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
})

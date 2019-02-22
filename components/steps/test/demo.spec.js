import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import Demo6 from './cases/demo6'
import Demo7 from './cases/demo7'
import Demo8 from './cases/demo8'
// import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Steps - Demo', () => {
  test(`Basic`, done => {
    const wrapper = mount(Demo0, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Non-integer progress`, done => {
    const wrapper = mount(Demo1, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Custom step icon`, done => {
    const wrapper = mount(Demo2, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Specify the current step`, done => {
    const wrapper = mount(Demo3, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Transition of rogress changes`, done => {
    const wrapper = mount(Demo4, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Add custom styles through by class named "current"`, done => {
    const wrapper = mount(Demo5, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Complete all steps`, done => {
    const wrapper = mount(Demo6, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Vertical display`, done => {
    const wrapper = mount(Demo7, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Custom content`, done => {
    const wrapper = mount(Demo8, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
})

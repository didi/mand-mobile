import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {mount} from '@vue/test-utils'

describe('DatePicker - Demo', () => {
  test(`Date selection`, done => {
    const wrapper = mount(Demo0, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    }, 0)
  })
  test(`Time selection`, done => {
    const wrapper = mount(Demo1, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    }, 0)
  })
  test(`Date & Time selection`, done => {
    const wrapper = mount(Demo2, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    }, 0)
  })
  test(`Custom type and option textual values`, done => {
    const wrapper = mount(Demo3, {
      sync: false,
    })
    setTimeout(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    }, 0)
  })
})

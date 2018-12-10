import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {mount} from '@vue/test-utils'

describe('DatePicker', () => {
  test(`Date selection`, done => {
    const wrapper = mount(Demo0)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Time selection`, done => {
    const wrapper = mount(Demo1)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Date & Time selection`, done => {
    const wrapper = mount(Demo2)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Custom type and option textual values`, done => {
    const wrapper = mount(Demo3)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
})

import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Cashier - Demo', () => {
  test(`Baisc-channel`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Baisc-captcha`, done => {
    const wrapper = mount(Demo1)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Baisc-success`, done => {
    const wrapper = mount(Demo2)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Baisc-fail`, done => {
    const wrapper = mount(Demo3)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.innerHTML).toMatchSnapshot()
      done()
    })
  })
  test(`Using slots and other configurations`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

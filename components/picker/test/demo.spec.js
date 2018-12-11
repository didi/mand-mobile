import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Picker - Demo', () => {
  test('Single column', done => {
    const wrapper = mount(Demo0)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Cascade', done => {
    const wrapper = mount(Demo1)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Display in Popup', done => {
    const wrapper = mount(Demo2)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 300)
  })
})

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
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Non-integer progress`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Custom step icon`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Specify the current step`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Transition of rogress changes`, done => {
    const wrapper = mount(Demo4)
    setTimeout(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    }, 2000)
  })
  test(`Add custom styles through by class named "current"`, () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
  test(`Complete all steps`, () => {
    expect(renderToString(Demo6)).toMatchSnapshot()
  })
  test(`Vertical display`, () => {
    expect(renderToString(Demo7)).toMatchSnapshot()
  })
  test(`Custom content`, () => {
    expect(renderToString(Demo8)).toMatchSnapshot()
  })
})

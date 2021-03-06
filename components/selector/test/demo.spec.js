import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import {renderToString} from '@vue/server-test-utils'

describe('Selector - Demo', () => {
  test(`No need to confirm`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Custom options`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Confirmed mode`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Check mode`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Multi mode`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

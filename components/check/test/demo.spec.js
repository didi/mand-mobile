import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import {renderToString} from '@vue/server-test-utils'

describe('Check - Demo', () => {
  test(`Check options`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Check options group`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Check box`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Check box group`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Check list`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

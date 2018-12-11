import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import {renderToString} from '@vue/server-test-utils'

describe('Stepper - Demo', () => {
  test(`Disabled`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Readonly`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Minimum is -12 and maximum is 18`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Step 2`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Minimum is 4 which is greater than default`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
  test(`Step is a decimal, 1.3`, () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
})

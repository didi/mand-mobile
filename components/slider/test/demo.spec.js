import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import {renderToString} from '@vue/server-test-utils'

describe('Slider - Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Disabled`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Format`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Range`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Steps`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
  test(`Min & Max`, () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
})

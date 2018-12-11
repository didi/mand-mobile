import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('Switch - Demo', () => {
  test(`Open`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Closed`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Open and disabled`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Closed and disabled`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

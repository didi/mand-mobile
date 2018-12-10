import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import {renderToString} from '@vue/server-test-utils'

describe('Button', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Plain`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Round`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Inline`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Text link`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import {renderToString} from '@vue/server-test-utils'

describe('TabBar - Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Max length`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Scroll`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`No ink`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Custom Item`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

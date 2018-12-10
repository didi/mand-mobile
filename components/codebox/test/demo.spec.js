import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('Codebox', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Character mask`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Unlimited length`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`System keyboard`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

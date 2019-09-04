import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import {renderToString} from '@vue/server-test-utils'

describe('Radio', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`With Field`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`List`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Radio group`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Radio box`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
  test(`Radio box group`, () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
})

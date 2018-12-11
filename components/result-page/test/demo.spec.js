import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('ResultPage', () => {
  test(`404`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Network anomaly`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`With button`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Custom pattern`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

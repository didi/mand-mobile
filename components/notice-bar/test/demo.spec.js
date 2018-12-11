import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import Demo6 from './cases/demo6'
import Demo7 from './cases/demo7'
import {renderToString} from '@vue/server-test-utils'

describe('NoticeBar - Demo', () => {
  test('Basic', () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test('With icon', () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test('Setting dwell time', () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test('Round', () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test('Theme', () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
  test('Multi-line display', () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
  test('Scroll play', () => {
    expect(renderToString(Demo6)).toMatchSnapshot()
  })
  test('Customize', () => {
    expect(renderToString(Demo7)).toMatchSnapshot()
  })
})

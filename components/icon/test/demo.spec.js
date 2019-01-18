import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('Icon - Demo', () => {
  test(`Font icon`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Svg icon`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Icon size`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Icon color`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

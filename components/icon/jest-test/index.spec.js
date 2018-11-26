import Demo0 from '../demo/cases/demo0'
import Demo1 from '../demo/cases/demo1'
import Demo2 from '../demo/cases/demo2'
import Demo3 from '../demo/cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('Button', () => {
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

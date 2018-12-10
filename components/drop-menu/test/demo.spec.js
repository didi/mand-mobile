import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

import {renderToString} from '@vue/server-test-utils'

describe('DropMenu - Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Initial selection`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Disabled item`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Custom menu options`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

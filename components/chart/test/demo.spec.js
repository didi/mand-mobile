import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import {renderToString} from '@vue/server-test-utils'

describe('Chart - Demo', () => {
  test(`Multiple fold lines`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Gradient fold line`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Area fill`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
})

import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import {renderToString} from '@vue/server-test-utils'

describe('CellItem - Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Simple List`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Content List`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
})

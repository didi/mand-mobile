import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'

describe('Amount', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Other configurations`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
})

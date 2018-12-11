import Demo0 from './cases/demo0'
import {renderToString} from '@vue/server-test-utils'

describe('Tabs - Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
})

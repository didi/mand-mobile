import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'

describe('Captcha - Demo', () => {
  test(`Customize`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Inline display`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
})

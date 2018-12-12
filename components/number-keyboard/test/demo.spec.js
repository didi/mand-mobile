import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'

describe('NumberKeyboard - Demo', () => {
  test('With confirmation key and decimal point, generally used for price or amount input', () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test('Simple type', () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
})

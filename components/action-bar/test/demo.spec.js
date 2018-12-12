import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import {renderToString} from '@vue/server-test-utils'

describe('ActionBar Demo', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Multiple buttons`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Multiple buttons and disabled button`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`With slot`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
})

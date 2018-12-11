import {renderToString} from '@vue/server-test-utils'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'

describe('Tag - Demo', () => {
  test('Semicircle', () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test('Fillet', () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test('Square', () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test('Characters cut in relief', () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test('Special tags', () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
})

import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import {renderToString} from '@vue/server-test-utils'

describe('Agree - Demo', () => {
  test(`Selected`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Unselected`, () => {
    expect(renderToString(Demo1)).toMatchSnapshot()
  })
  test(`Disabled selected`, () => {
    expect(renderToString(Demo2)).toMatchSnapshot()
  })
  test(`Disabled unselected`, () => {
    expect(renderToString(Demo3)).toMatchSnapshot()
  })
  test(`Square check box selected state`, () => {
    expect(renderToString(Demo4)).toMatchSnapshot()
  })
  test(`Square check box unselected state`, () => {
    expect(renderToString(Demo5)).toMatchSnapshot()
  })
})

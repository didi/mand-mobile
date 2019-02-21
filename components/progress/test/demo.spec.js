import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Progress', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Other configurations`, () => {
    const wrapper = mount(Demo1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

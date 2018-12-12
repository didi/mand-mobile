import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('ActionSheet', () => {
  test(`Basic`, () => {
    expect(renderToString(Demo0)).toMatchSnapshot()
  })
  test(`Singleton pattern`, done => {
    const wrapper = mount(Demo1)
    wrapper.vm.$_showActionSheet()
    setTimeout(() => {
      expect(document.body.querySelector('.md-action-sheet').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
})

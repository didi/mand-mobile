import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import {renderToString} from '@vue/server-test-utils'
import {mount} from '@vue/test-utils'

describe('Dialog', () => {
  // test(`Basic`, () => {
  //   expect(renderToString(Demo0)).toMatchSnapshot()
  // })
  test(`Singleton mode-alert`, done => {
    const wrapper = mount(Demo1)
    wrapper.vm.alert()
    setTimeout(() => {
      expect(document.body.querySelector('.md-dialog').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
})

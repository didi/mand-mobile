import Popup from '../index'
import {mount} from '@vue/test-utils'
import triggerTouch from './touch-trigger'

describe('Popup', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('popup prevent scroll', done => {
    wrapper = mount(Popup, {
      propsData: {
        preventScroll: true,
        value: true,
      },
    })

    const popupBox = wrapper.find('.md-popup-box')
    setTimeout(() => {
      document.body.style.height = '10000px'
      triggerTouch(popupBox.element, 'touchstart', 0, 0)
      triggerTouch(popupBox.element, 'touchmove', 0, 100)
      triggerTouch(document, 'touchstart', 0, 0)
      triggerTouch(document, 'touchmove', 0, 100)
      document.body.style.height = ''
      done()
    }, 300)
  })
})

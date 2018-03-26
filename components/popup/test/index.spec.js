import Popup from '../index'
import PopupTitleBar from '../title-bar'
import {mount} from 'avoriaz'
import triggerTouch from './touch-trigger'

describe('Popup', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a popup', done => {
    wrapper = mount(Popup, {
      propsData: {
        value: true,
      },
      slots: {
        default: PopupTitleBar,
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isPopupShow).to.be.true
      expect(wrapper.vm.isPopupBoxShow).to.be.true
      wrapper.vm.value = false
      done()
    })
  })

  it('create a popup with position center', done => {
    wrapper = mount(Popup, {
      propsData: {
        position: 'center',
      },
    })
    expect(wrapper.vm.transition).to.equal('fade')
    wrapper.vm.value = true
    setTimeout(() => {
      const popupBox = wrapper.find('.md-popup-box')[0]
      expect(wrapper.hasClass('md-popup') && wrapper.hasClass('center') && popupBox.hasClass('fade')).to.be.true
      done()
    }, 300)
  })

  it('popup with transition', done => {
    wrapper = mount(Popup, {
      propsData: {
        position: 'bottom',
      },
    })
    const popupBox = wrapper.find('.md-popup-box')[0]

    expect(wrapper.vm.transition).to.equal('slide-up')

    wrapper.vm.transition = 'slide-for-test'
    // expect(popupBox.hasClass('slide-for-test')).to.be.true
    done()
  })

  it('popup without mask', done => {
    wrapper = mount(Popup, {
      propsData: {
        hasMask: false,
      },
    })

    wrapper.vm.value = true
    setTimeout(() => {
      expect(wrapper.contains('.md-popup-mask')).to.be.true
      done()
    }, 300)
  })

  it('popup mask is closable', done => {
    wrapper = mount(Popup)
    expect(wrapper.hasClass('with-mask')).to.be.true

    wrapper.vm.value = true
    setTimeout(() => {
      const popupMask = wrapper.find('.md-popup-mask')[0]
      popupMask.trigger('click')
      expect(wrapper.vm.isPopupBoxShow).to.be.false
      done()
    }, 300)
  })

  it('popup prevent scroll', done => {
    wrapper = mount(Popup, {
      propsData: {
        preventScroll: true,
        value: true,
      },
    })

    const popupBox = wrapper.find('.md-popup-box')[0]
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

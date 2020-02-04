import TipContent from 'mand-mobile/components/tip/tip'
import TipWrapper from './tip-wrapper'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Tip', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a tip float over left', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'left',
      },
    })

    expect(wrapper.classes('is-left')).toBe(true)
  })

  it('create a tip float over bottom', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'bottom',
      },
    })

    expect(wrapper.classes('is-bottom')).toBe(true)
  })

  it('create a tip float over right', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'right',
      },
    })

    expect(wrapper.classes('is-right')).toBe(true)
  })

  it('click close to hide', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.find('.md-icon-close').trigger('click')
    expect(eventStub.calledWith('close')).toBe(true)
  })

  it('scroll-wrapper', () => {
    wrapper = mount(TipWrapper)
    const wrapperEl = wrapper.vm.$refs.tip.wrapperEl
    console.log(wrapperEl.className)
    expect(wrapperEl.className).toBe('wrapper1')
  })
})

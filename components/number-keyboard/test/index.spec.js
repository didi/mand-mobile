import {NumberKeyboard} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('NumberKeyboard - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a number-keyboard', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const numberBtn = wrapper.findAll('.keyboard-number-item').at(1)
    const slideDownBtn = wrapper.find('.slidedown')

    wrapper.vm.disorder = true
    wrapper.vm.value = true
    setTimeout(() => {
      numberBtn.trigger('click')
      expect(eventStub.calledWith('enter')).toBe(true)
      numberBtn.trigger('touchstart')
      numberBtn.trigger('touchcancel')
      slideDownBtn.trigger('click')
      expect(eventStub.calledWith('input')).toBe(true)
      done()
    }, 300)
  })

  it('number-keyboard delete', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const deleteBtn = wrapper.find('.delete')

    wrapper.vm.value = true
    setTimeout(() => {
      deleteBtn.trigger('click')
      expect(eventStub.calledWith('delete')).toBe(true)
      done()
    }, 300)
  })

  it('number-keyboard confirm', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const confirmBtn = wrapper.find('.confirm')

    wrapper.vm.value = true
    setTimeout(() => {
      confirmBtn.trigger('click')
      expect(eventStub.calledWith('confirm')).toBe(true)
      done()
    }, 300)
  })
})

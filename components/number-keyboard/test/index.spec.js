import NumberKeyboard from '../index'
import {mount} from 'avoriaz'

describe('NumberKeyboard', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a number-keyboard', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const numberBtn = wrapper.find('.keyboard-number-item')[1]

    wrapper.vm.disorder = true
    wrapper.vm.value = true
    setTimeout(() => {
      numberBtn.trigger('click')
      expect(eventStub.calledWith('enter')).to.be.true

      wrapper.vm.isKeyboardShow = false
      expect(eventStub.calledWith('input')).to.be.true
      done()
    }, 300)
  })

  it('number-keyboard delete', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const deleteBtn = wrapper.find('.keyboard-operate-item')[0]

    wrapper.vm.value = true
    setTimeout(() => {
      deleteBtn.trigger('click')
      expect(eventStub.calledWith('delete')).to.be.true
      done()
    }, 300)
  })

  it('number-keyboard confirm', done => {
    wrapper = mount(NumberKeyboard)

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const confirmBtn = wrapper.find('.keyboard-operate-item')[1]

    wrapper.vm.value = true
    setTimeout(() => {
      confirmBtn.trigger('click')
      expect(eventStub.calledWith('confirm')).to.be.true
      done()
    }, 300)
  })
})

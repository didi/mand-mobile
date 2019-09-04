import {Dialog} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Dialog - Operation', () => {
  let wrapper, vm

  afterEach(() => {
    // wrapper && wrapper.destroy()
    vm && vm.$destroy()
  })

  it('basic dialog', () => {
    let show = true
    wrapper = mount(Dialog, {
      propsData: {
        value: show,
        appendTo: null,
        btns: [{text: '123'}],
      },
    })
    wrapper.find('.md-dialog-btn').trigger('click')
  })

  it('generate a confirm dialog', () => {
    vm = Dialog.confirm({})
    expect(vm.btns.length).toBe(2)
  })

  it('generate a alert dialog', () => {
    vm = Dialog.alert({})
    expect(vm.btns.length).toBe(1)
  })

  it('generate a succeed dialog', done => {
    let num = 0
    vm = Dialog.succeed({
      onShow: () => {
        num = 1
      },
      onHide: () => {
        num = 2
      },
    })
    setTimeout(() => {
      expect(vm.icon).toBe('success-color')
      expect(num).toBe(1)
      // vm.$el.querySelector('.md-dialog-btn').click()
      setTimeout(() => {
        // expect(num).toBe(2)
        done()
      }, 500)
    }, 1000)
  })

  it('generate a failed dialog', done => {
    vm = Dialog.failed({})
    const eventSpy = sinon.spy(vm, '$emit')
    vm.value = false
    expect(vm.icon).toBe('warn-color')
    setTimeout(() => {
      expect(eventSpy.calledWith('hide')).toBeTruthy()
      done()
    }, 300)
  })

  it('close all dialogs', done => {
    const d1 = Dialog.confirm({})
    const d2 = Dialog.succeed({})
    const eventStub1 = sinon.stub(d1, '$emit')
    const eventStub2 = sinon.stub(d2, '$emit')
    Dialog.closeAll()
    setTimeout(() => {
      expect(eventStub1.calledWith('input', false)).toBeTruthy()
      expect(eventStub2.calledWith('input', false)).toBeTruthy()
      done()
    }, 400)
  })
})

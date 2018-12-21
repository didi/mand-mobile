import {Dialog} from 'mand-mobile'
import sinon from 'sinon'

describe('Dialog - Static Methods', () => {
  let wrapper, vm

  afterEach(() => {
    wrapper && wrapper.destroy()
    vm && vm.$destroy()
  })

  test('generate a confirm dialog', () => {
    vm = Dialog.confirm({})
    expect(vm.btns.length).toBe(2)
  })

  test('generate a alert dialog', () => {
    vm = Dialog.alert({})
    expect(vm.btns.length).toBe(1)
  })

  test('generate a succeed dialog', () => {
    vm = Dialog.succeed({})
    expect(vm.icon).toBe('success-color')
  })

  test('generate a failed dialog', done => {
    vm = Dialog.failed({})
    const eventSpy = sinon.spy(vm, '$emit')
    vm.value = false
    expect(vm.icon).toBe('warn-color')
    setTimeout(() => {
      expect(eventSpy.calledWith('hide')).toBeTruthy()
      done()
    }, 300)
  })

  test('close all dialogs', done => {
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

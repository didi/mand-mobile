import Picker from '../index'
import PickerColumn from '../picker-column'
import triggerTouch from '../../popup/test/touch-trigger'
import simple from '../demo/data/simple'
import district from '../demo/data/district'
import {mount} from 'avoriaz'

describe('Picker', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a picker', done => {
    wrapper = mount(Picker)
    expect(wrapper.vm.data.length).to.equal(0)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.data = simple
    wrapper.vm.value = true
    setTimeout(() => {
      expect(eventStub.calledWith('show')).to.be.true
      expect(wrapper.vm.isPickerShow).to.be.true
      expect(!!wrapper.vm.column).to.be.true
      expect(wrapper.find('.column-item').length).to.equal(16)
      const cancelmBtn = wrapper.find('.md-popup-cancel')[0]
      cancelmBtn.trigger('click')
      wrapper.vm.value = false
      expect(eventStub.calledWith('cancel')).to.be.true
      setTimeout(() => {
        expect(eventStub.calledWith('hide')).to.be.true
        done()
      }, 300)
    }, 300)
  })

  it('create a picker column', done => {
    wrapper = mount(PickerColumn)
    expect(wrapper.vm.data.length).to.equal(0)
    expect(wrapper.vm.defaultIndex.length).to.equal(0)
    expect(wrapper.vm.defaultValue.length).to.equal(0)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.data = simple
    wrapper.vm.validIndex = [3]
    wrapper.vm.defaultIndex = [2]
    wrapper.vm.refresh(() => {
      expect(wrapper.vm.getColumnIndex(0)).to.equal(2)
      expect(wrapper.vm.getColumnIndexs()[0]).to.equal(2)
      expect(wrapper.vm.getColumnValue(0).text).to.equal('2017')

      const hook = wrapper.find('.md-picker-column-hook')[0]

      triggerTouch(hook.element, 'touchstart', 0, 0)
      triggerTouch(hook.element, 'touchmove', 0, 108)
      triggerTouch(hook.element, 'touchend')
      // expect(eventStub.calledWith('change')).to.be.true

      wrapper.vm.setColumnValues(0, simple[0])
      done()
    })
  })

  it('picker defalut index', done => {
    wrapper = mount(Picker)
    expect(wrapper.vm.data.length).to.equal(0)

    wrapper.vm.defaultIndex = [1]
    wrapper.vm.data = simple
    wrapper.vm.value = true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.column-item').length).to.equal(16)
      done()
    })
  })

  it('picker cascade', done => {
    wrapper = mount(Picker, {
      propsData: {
        isCascade: true,
      },
    })
    wrapper.vm.data = district
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.vm.$nextTick(() => {
      const confirmBtn = wrapper.find('.md-popup-confirm')[0]
      confirmBtn.trigger('click')
      expect(eventStub.calledWith('confirm')).to.be.true
      done()
    })
  })
})

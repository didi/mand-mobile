import {Picker} from 'mand-mobile'
import PickerColumn from 'mand-mobile/components/picker/picker-column'
import triggerTouch from '../../popup/test/touch-trigger'
import simple from '../demo/data/simple'
import district from '../demo/data/district'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Picker - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create a picker', done => {
    wrapper = mount(Picker, {
      propsData: {
        defaultIndex: [1],
      },
      sync: false,
    })
    expect(wrapper.vm.data.length).toBe(0)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.data = simple
    wrapper.vm.value = true
    setTimeout(() => {
      expect(eventStub.calledWith('show')).toBe(true)
      expect(wrapper.vm.isPickerShow).toBe(true)
      expect(!!wrapper.vm.column).toBe(true)
      expect(wrapper.findAll('.column-item').length).toBe(16)
      const cancelmBtn = wrapper.find('.md-popup-cancel')
      cancelmBtn.trigger('click')
      wrapper.vm.value = false
      expect(eventStub.calledWith('cancel')).toBe(true)
      setTimeout(() => {
        expect(eventStub.calledWith('hide')).toBe(true)
        done()
      }, 300)
    }, 300)
  })

  test('create a picker column', done => {
    wrapper = mount(PickerColumn)
    expect(wrapper.vm.data.length).toBe(0)
    expect(wrapper.vm.defaultIndex.length).toBe(0)
    expect(wrapper.vm.defaultValue.length).toBe(0)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.data = simple
    wrapper.vm.validIndex = [3]
    wrapper.vm.defaultIndex = [2]
    wrapper.vm.refresh(() => {
      expect(wrapper.vm.getColumnIndex(0)).toBe(2)
      expect(wrapper.vm.getColumnIndexs()[0]).toBe(2)
      expect(wrapper.vm.getColumnValue(0).text).toBe('2017')

      const hook = wrapper.findAll('.md-picker-column-hook').at(0)

      triggerTouch(hook.element, 'touchstart', 0, 0)
      triggerTouch(hook.element, 'touchmove', 0, 108)
      triggerTouch(hook.element, 'touchend')

      wrapper.vm.setColumnValues(0, simple[0])
      done()
    })
  })

  test('picker defalut index', done => {
    wrapper = mount(Picker)
    expect(wrapper.vm.data.length).toBe(0)

    wrapper.vm.defaultIndex = [1]
    wrapper.vm.data = simple
    wrapper.vm.value = true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.column-item').length).toBe(16)
      done()
    })
  })

  test('picker invalid index', () => {
    wrapper = mount(Picker, {
      propsData: {
        data: simple,
        invalidIndex: [0],
        isView: true,
      },
      sync: false,
    })
    expect(
      wrapper
        .findAll('.column-item')
        .at(0)
        .classes('disabled'),
    ).toBe(true)
  })

  test('picker keep index', done => {
    wrapper = mount(Picker, {
      propsData: {
        data: district,
        isView: true,
        isCascade: true,
        keepIndex: true,
        cols: 3,
        defaultIndex: [3, 2, 1],
      },
    })
    setTimeout(() => {
      expect(wrapper.vm.column.activedIndexs[0]).toBe(3)

      const hook = wrapper.findAll('.md-picker-column-hook').at(0)
      triggerTouch(hook.element, 'touchstart', 0, 0)
      triggerTouch(hook.element, 'touchmove', 0, 108)
      triggerTouch(hook.element, 'touchend')

      expect(wrapper.vm.column.activedIndexs[1]).toBe(2)
      done()
    }, 500)
  })
})

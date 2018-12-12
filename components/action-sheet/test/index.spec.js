import ActionSheet from '../index'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('ActionSheet - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  const propsData = {
    title: '操作说明的标题',
    options: [
      {
        label: '选项1',
        value: 0,
      },
      {
        label: '选项2',
        value: 1,
      },
      {
        label: '选项3',
        value: 2,
      },
    ],
    defaultIndex: 1,
    invalidIndex: 2,
    cancelText: '取消',
  }

  test('empty options', () => {
    wrapper = mount(ActionSheet, {
      sync: false,
    })
    expect(wrapper.findAll('.md-action-sheet-item').length).toBe(0)
  })

  test('show/hide/selected events', done => {
    wrapper = mount(ActionSheet, {
      propsData,
      sync: false,
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.vm.value = true

    setTimeout(() => {
      expect(eventSpy.calledWith('show')).toBe(true)
      wrapper
        .findAll('.md-action-sheet-item')
        .at(0)
        .trigger('click')
      expect(eventSpy.calledWith('selected')).toBe(true)
      expect(eventSpy.calledWith('input')).toBe(true)
      setTimeout(() => {
        expect(eventSpy.calledWith('hide')).toBe(true)
        done()
      }, 500)
    }, 300)
  })

  test('cancel events', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        ...propsData,
        value: true,
      },
      sync: false,
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    setTimeout(() => {
      wrapper.find('.md-action-sheet-cancel').trigger('click')
      expect(eventSpy.calledWith('cancel')).toBe(true)
      done()
    }, 300)
  })

  test('disabled option', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        ...propsData,
        value: true,
      },
      sync: false,
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    setTimeout(() => {
      const disabledOption = wrapper.findAll('.md-action-sheet-item').at(2)
      expect(disabledOption.classes('disabled')).toBe(true)
      disabledOption.trigger('click')
      expect(eventSpy.calledWith('selected')).toBe(false)
      done()
    }, 300)
  })

  test('static methods create/closeAll', done => {
    ActionSheet.create({
      ...propsData,
      value: true,
    })

    setTimeout(() => {
      expect(document.body.querySelectorAll('.md-action-sheet').length > 0).toBe(true)
      ActionSheet.closeAll()
      done()
    }, 300)
  })

  test('static methods create/destroyAll', done => {
    ActionSheet.create({
      ...propsData,
      value: true,
    })

    setTimeout(() => {
      expect(document.body.querySelectorAll('.md-action-sheet').length > 0).toBe(true)
      ActionSheet.destroyAll()
      done()
    }, 300)
  })
})

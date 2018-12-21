import {Selector} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Selector - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create a selector as check mode', () => {
    wrapper = mount(Selector, {
      propsData: {
        okText: '确认',
        isCheck: true,
      },
    })

    expect(wrapper.vm.isNeedConfirm).toBe(true)
  })

  test('selector events choose', done => {
    wrapper = mount(Selector, {
      propsData: {
        value: true,
        data: [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            disabled: true,
            text: '选项三',
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      wrapper.find('.md-radio-item').trigger('click')
      expect(wrapper.vm.tmpActiveIndex).toBe(0)
      expect(wrapper.vm.activeIndex).toBe(0)
      expect(eventStub.calledWith('choose')).toBe(true)
      done()
    })
  })

  test('selector events confirm', done => {
    wrapper = mount(Selector, {
      propsData: {
        value: true,
        okText: 'ok',
        data: [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            disabled: true,
            text: '选项三',
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      const item = wrapper.find('.md-radio-item')
      const confirmBtn = wrapper.find('.md-popup-confirm')
      item.trigger('click')
      expect(wrapper.vm.tmpActiveIndex).toBe(0)

      confirmBtn.trigger('click')
      expect(wrapper.vm.activeIndex).toBe(0)
      expect(eventStub.calledWith('confirm')).toBe(true)
      done()
    })
  })

  test('selector events cancel', done => {
    wrapper = mount(Selector, {
      propsData: {
        value: true,
        data: [
          [
            {
              value: '1',
              text: '选项一',
            },
            {
              value: '2',
              text: '选项二',
            },
            {
              value: '3',
              text: '选项三',
            },
            {
              value: '4',
              text: '选项四',
            },
          ],
        ],
        okText: 'ok',
        cancelText: 'cancel',
        defaultValue: '3',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      const cancelBtn = wrapper.find('.md-popup-cancel')
      cancelBtn.trigger('click')
      expect(eventStub.calledWith('cancel')).toBe(true)
      done()
    })
  })
})

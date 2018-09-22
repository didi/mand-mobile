import Selector from '../index'
import {mount} from 'avoriaz'

describe('Selector', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a selector', () => {
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
            text: '选项三',
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      },
    })

    expect(wrapper.hasClass('md-selector')).to.be.true
    expect(wrapper.find('.md-radio-item').length).to.equal(4)
  })

  it('create a selector as check mode', () => {
    wrapper = mount(Selector, {
      propsData: {
        okText: '确认',
        isCheck: true,
      },
    })

    expect(wrapper.hasClass('is-check')).to.be.true
    expect(wrapper.vm.isNeedConfirm).to.equal(true)
  })

  it('create a selector with default value', () => {
    wrapper = mount(Selector, {
      propsData: {
        value: true,
        defaultValue: '2',
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

    expect(wrapper.find('.md-radio-item')[1].hasClass('is-selected')).to.equal(true)
    expect(wrapper.find('.md-radio-item')[2].hasClass('is-disabled')).to.equal(true)
  })

  it('selector events choose', done => {
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
      wrapper.find('.md-radio-item')[0].trigger('click')
      expect(wrapper.vm.tmpActiveIndex).equal(0)
      expect(wrapper.vm.activeIndex).equal(0)
      expect(eventStub.calledWith('choose')).to.be.true
      done()
    })
  })

  it('selector events confirm', done => {
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
      const item = wrapper.find('.md-radio-item')[0]
      const confirmBtn = wrapper.find('.md-popup-confirm')[0]
      item.trigger('click')
      expect(wrapper.vm.tmpActiveIndex).equal(0)

      confirmBtn.trigger('click')
      expect(wrapper.vm.activeIndex).equal(0)
      expect(eventStub.calledWith('confirm')).to.be.true
      done()
    })
  })

  it('selector events cancel', done => {
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
      const cancelBtn = wrapper.find('.md-popup-cancel')[0]
      cancelBtn.trigger('click')
      expect(eventStub.calledWith('cancel')).to.be.true
      done()
    })
  })
})

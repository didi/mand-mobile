// import Vue from 'vue'
import Selector from '../index'
import {mount} from 'avoriaz'
import {setTimeout} from 'timers'

describe('Selector', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a selector', done => {
    wrapper = mount(Selector)

    expect(wrapper.hasClass('md-selector')).to.be.true
    expect(wrapper.vm.data.length).to.equal(0)

    wrapper.vm.value = true
    wrapper.vm.data = [
      {
        text: '选项一',
      },
      {
        text: '选项二',
      },
      {
        text: '选项三',
      },
      {
        text: '选项四',
      },
    ]

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-radio-item').length).to.equal(4)
      done()
    })
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

  it('create a selector with default and invalid', done => {
    wrapper = mount(Selector)

    wrapper.vm.value = true
    wrapper.vm.defaultIndex = 1
    wrapper.vm.invalidIndex = 2
    wrapper.vm.data = [
      {
        text: '选项一',
      },
      {
        text: '选项二',
      },
      {
        text: '选项三',
      },
      {
        text: '选项四',
      },
    ]

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-radio-item')[1].hasClass('selected')).to.equal(true)
      expect(wrapper.find('.md-radio-item')[2].hasClass('disabled')).to.equal(true)
      done()
    })
  })

  it('selector events choose', done => {
    wrapper = mount(Selector)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.value = true
    wrapper.vm.data = [
      {
        text: '选项一',
      },
      {
        text: '选项二',
      },
      {
        text: '选项三',
      },
      {
        text: '选项四',
      },
    ]

    wrapper.vm.$nextTick(() => {
      wrapper.find('.md-radio-item')[0].trigger('click')
      expect(wrapper.vm.tmpActiveIndex).equal(0)
      expect(wrapper.vm.activeIndex).equal(0)
      expect(eventStub.calledWith('choose')).to.be.true
      done()
    })
  })

  it('selector events confirm', done => {
    wrapper = mount(Selector)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.value = true
    wrapper.vm.data = [
      {
        text: '选项一',
      },
      {
        text: '选项二',
      },
      {
        text: '选项三',
      },
      {
        text: '选项四',
      },
    ]
    wrapper.vm.okText = 'ok'
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
        data: [
          [
            {
              text: '选项一',
            },
            {
              text: '选项二',
            },
            {
              text: '选项三',
            },
            {
              text: '选项四',
            },
          ],
        ],
        okText: 'ok',
        cancelText: 'cancel',
        defaultIndex: 2,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.value = true
    wrapper.vm.$nextTick(() => {
      const cancelBtn = wrapper.find('.md-popup-cancel')[0]
      cancelBtn.trigger('click')
      expect(eventStub.calledWith('cancel')).to.be.true
      done()
    })
  })
})

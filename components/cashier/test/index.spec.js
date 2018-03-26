import Cashier from '../index'
import {mount} from 'avoriaz'
import {setTimeout} from 'timers'

describe('Cashier', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  const channels = [
    {
      icon: 'cashier-icon-1',
      text: '招商银行储蓄卡(0056)支付',
      value: '001',
    },
    {
      icon: 'cashier-icon-2',
      text: '支付宝支付',
      value: '002',
    },
    {
      icon: 'cashier-icon-3',
      text: '微信支付',
      value: '003',
    },
    {
      icon: 'cashier-icon-4',
      text: 'QQ钱包支付',
      value: '004',
    },
    {
      icon: 'cashier-icon-5',
      text: '一网通支付',
      value: '005',
    },
  ]

  it('cashier default-index', done => {
    wrapper = mount(Cashier)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.channels = channels
    wrapper.vm.defaultIndex = 1
    wrapper.vm.value = true
    wrapper.vm.$nextTick(() => {
      expect(
        wrapper
          .find('.choose-channel-item')[0]
          .text()
          .trim(),
      ).to.equal(channels[1].text)
      expect(wrapper.vm.activeChannelIndex).to.equal(1)

      const moreBtn = wrapper.find('.choose-channel-more')[0]
      moreBtn.trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.choose-channel-item').length).to.equal(channels.length)

        const item = wrapper.find('.choose-channel-item')[2]
        item.trigger('click')
        expect(eventStub.calledWith('select')).to.be.true
        expect(wrapper.vm.activeChannelIndex).to.equal(2)

        const confirm = wrapper.find('.md-cashier-pay-button')[0]
        confirm.trigger('click')
        expect(eventStub.calledWith('pay')).to.be.true

        wrapper.vm.value = false
        done()
      })
    })
  })

  it('cashier captcha', done => {
    wrapper = mount(Cashier, {
      propsData: {channels},
    })

    wrapper.vm.value = true
    wrapper.vm.next('captcha', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-cashier-captcha').length > 0).to.be.true
      const cancel = wrapper.find('.md-popup-cancel')[0]
      cancel.trigger('click')
      done()
    })
  })

  it('cashier loading', done => {
    wrapper = mount(Cashier, {
      propsData: {channels},
    })

    wrapper.vm.value = true
    wrapper.vm.next('loading', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-cashier-loading').length > 0).to.be.true
      expect(
        wrapper
          .find('.md-cashier-block-text')[0]
          .text()
          .trim(),
      ).to.equal('123')
      done()
    })
  })

  it('cashier success', done => {
    wrapper = mount(Cashier, {
      propsData: {channels},
    })

    wrapper.vm.value = true
    wrapper.vm.next('success', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-cashier-success').length > 0).to.be.true
      expect(
        wrapper
          .find('.md-cashier-block-text')[0]
          .text()
          .trim(),
      ).to.equal('123')
      done()
    })
  })

  it('cashier fail', done => {
    wrapper = mount(Cashier, {
      propsData: {channels},
    })

    wrapper.vm.value = true
    wrapper.vm.next('fail', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-cashier-fail').length > 0).to.be.true
      expect(
        wrapper
          .find('.md-cashier-block-text')[0]
          .text()
          .trim(),
      ).to.equal('123')
      done()
    })
  })
})

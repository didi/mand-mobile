import {Cashier} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Cashier - Operation', () => {
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
      disabled: true,
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
    wrapper = mount(Cashier, {
      propsData: {
        channels: [channels[0]],
        channelLimit: 0,
      },
    })

    wrapper.vm.channels = channels
    wrapper.vm.defaultIndex = 1
    wrapper.vm.channelLimit = 2
    wrapper.vm.value = true
    setTimeout(() => {
      expect(
        wrapper
          .find('.choose-channel-list')
          .find('.default')
          .text()
          .trim(),
      ).toEqual(channels[1].text)

      const moreBtn = wrapper.find('.choose-channel-more')
      moreBtn.trigger('click')
      expect(wrapper.vm.$refs.channel.isChannelShow).toBeTruthy()

      const eventSpy = sinon.spy(wrapper.vm.$refs.channel, '$emit')
      const channelItems = wrapper.findAll('.md-cashier-channel-item')
      const confirmBtn = wrapper.find('.md-cashier-pay-button')
      expect(channelItems.length).toEqual(channels.length)

      channelItems.at(1).trigger('click') // invalid click
      channelItems.at(2).trigger('click')
      expect(eventSpy.calledWith('select')).toBeTruthy()

      confirmBtn.trigger('click')
      expect(eventSpy.calledWith('pay')).toBeTruthy()
      expect(wrapper.vm.$refs.channel.activeChannelIndex).toEqual(2)

      wrapper.vm.value = false
      wrapper.vm.$nextTick(() => {
        moreBtn.trigger('click') // invalid click
        done()
      })
    }, 300)
  })

  it('cashier captcha', done => {
    wrapper = mount(Cashier, {
      propsData: {
        value: true,
      },
    })

    wrapper.vm.next('captcha', {
      text: '123',
    })

    wrapper.vm.$nextTick(() => {
      expect(!!wrapper.find('.md-cashier-captcha')).toBeTruthy()
      const cancel = wrapper.find('.md-popup-cancel')
      cancel.trigger('click')
      done()
    })
  })

  it('cashier loading', done => {
    wrapper = mount(Cashier, {
      propsData: {
        channels,
        value: true,
      },
    })

    wrapper.vm.next('loading', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(!!wrapper.find('.md-cashier-loading')).toBeTruthy()
      expect(
        wrapper
          .find('.md-cashier-block-text')
          .text()
          .trim(),
      ).toEqual('123')
      done()
    })
  })

  it('cashier success', done => {
    wrapper = mount(Cashier, {
      propsData: {
        channels,
        value: true,
      },
    })

    wrapper.vm.next('success', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(!!wrapper.find('.md-cashier-success')).toBeTruthy()
      expect(
        wrapper
          .find('.md-cashier-block-text')
          .text()
          .trim(),
      ).toEqual('123')
      done()
    })
  })

  it('cashier fail', done => {
    wrapper = mount(Cashier, {
      propsData: {
        channels,
        value: true,
      },
    })

    wrapper.vm.next('fail', {
      text: '123',
    })
    wrapper.vm.$nextTick(() => {
      expect(!!wrapper.find('.md-cashier-fail')).toBeTruthy()
      expect(
        wrapper
          .find('.md-cashier-block-text')
          .text()
          .trim(),
      ).toEqual('123')
      done()
    })
  })
})

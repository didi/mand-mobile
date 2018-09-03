import TabPicker from '../index'
import {mount} from 'avoriaz'
import data from '../demo/data'

describe('TabPicker', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create an empty tab-picker', () => {
    wrapper = mount(TabPicker, {
      propsData: {
        value: true,
      },
    })
    expect(wrapper.hasClass('md-tab-picker')).to.be.true
    expect(wrapper.vm.getSelectedOptions()).to.be.empty
    // const eventStub = sinon.stub(wrapper.vm, '$emit')

    // wrapper.vm.$nextTick(() => {
    //   expect(eventStub.calledWith('show'))
    //   expect(wrapper.find('.md-tab-title').length).to.equal(3)
    //   const cancelmBtn = wrapper.find('.md-popup-cancel')[0]
    //   cancelmBtn.trigger('click')
    //   expect(eventStub.calledWith('input'))
    //   expect(eventStub.calledWith('cancel')).to.be.true
    //   setTimeout(() => {
    //     expect(wrapper.vm.isTabPickerShow).to.be.false
    //     expect(eventStub.calledWith('hide'))
    //     done()
    //   }, 500)
    // })
  })

  it('create a normal tab-picker', () => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
      },
    })
    expect(wrapper.vm.panes.length).to.equal(1)
    // const eventStub = sinon.stub(wrapper.vm, '$emit')

    // wrapper.vm.$nextTick(() => {
    //   expect(eventStub.calledWith('show'))
    //   expect(wrapper.find('.md-tab-title').length).to.equal(3)
    //   const cancelmBtn = wrapper.find('.md-popup-cancel')[0]
    //   cancelmBtn.trigger('click')
    //   expect(eventStub.calledWith('input'))
    //   expect(eventStub.calledWith('cancel')).to.be.true
    //   setTimeout(() => {
    //     expect(wrapper.vm.isTabPickerShow).to.be.false
    //     expect(eventStub.calledWith('hide'))
    //     done()
    //   }, 500)
    // })
  })

  it('show and close tab-picker', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.find('.md-popup-cancel')[0].trigger('click')
    setTimeout(() => {
      expect(eventStub.calledWith('input')).to.be.true
      done()
    }, 300)
  })

  it('select and switch pane', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    expect(wrapper.vm.currentTab).to.equal('province')
    wrapper.find('.md-radio-item')[0].trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.panes.length).to.equal(2)
      expect(wrapper.vm.currentTab).to.equal('block')
      expect(eventStub.calledWith('change')).to.be.true
      wrapper.find('.md-tab-bar-item')[0].trigger('click')
      setTimeout(() => {
        expect(wrapper.vm.currentTab).to.equal('province')
        done()
      }, 300)
    }, 300)
  })

  it('set default value', () => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
        defaultValue: ['pk'],
      },
    })
    expect(wrapper.vm.selected).to.deep.equal(['pk'])
  })

  it('click mask to close', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.find('.md-popup-mask')[0].trigger('click')
    setTimeout(() => {
      expect(eventStub.calledWith('input')).to.be.true
      done()
    }, 300)
  })
})

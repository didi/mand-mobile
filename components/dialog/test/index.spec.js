import Dialog from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'
// import { setTimeout } from 'timers';

describe('Dialog', () => {
  let wrapper, vm

  afterEach(() => {
    wrapper && wrapper.destroy()
    vm && vm.$destroy()
  })

  /*--------------------------------------------------------------------------*/
  /* Component Tests
  /*--------------------------------------------------------------------------*/
  it('create a simple dialog', () => {
    wrapper = mount(Dialog, {
      propsData: {
        appendTo: false,
      },
    })

    expect(wrapper.hasClass('md-dialog')).to.equal(true)
  })

  it('create a simple dialog and append to body', function() {
    wrapper = mount(Dialog, {
      propsData: {
        appendTo: document.body,
      },
    })

    expect(wrapper.vm.$el.parentNode).to.equal(document.body)
  })

  it('has custom title', () => {
    wrapper = mount(Dialog, {
      propsData: {
        title: 'Dialog Title',
      },
    })

    expect(wrapper.first('.md-dialog-title').text()).to.equal('Dialog Title')
  })

  it('has custom content', () => {
    wrapper = mount(Dialog, {
      propsData: {
        content: 'Lorem ipsum dolor sit amet.',
      },
    })

    expect(wrapper.first('.md-dialog-body div').text()).to.equal('Lorem ipsum dolor sit amet.')
  })

  it('has custom icon', () => {
    wrapper = mount(Dialog, {
      propsData: {
        icon: 'circle-right',
      },
    })

    expect(wrapper.contains('.md-icon-circle-right')).to.equal(true)
  })

  it('handle button action click event', () => {
    const clickHandler = sinon.stub()
    wrapper = mount(Dialog, {
      propsData: {
        btns: [
          {
            text: 'Cancel',
            handler: null,
          },
          {
            text: 'Confirm',
            handler: clickHandler,
          },
        ],
      },
    })

    wrapper.find('.md-dialog-actions a')[0].trigger('click')
    wrapper.find('.md-dialog-actions a')[1].trigger('click')
    expect(clickHandler.called).to.equal(true)
  })

  it('emit input event', done => {
    wrapper = mount(Dialog, {
      propsData: {
        value: true,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.setProps({value: false})
    setTimeout(() => {
      expect(eventStub.calledWith('input', false)).to.be.true
      done()
    }, 100)
  })

  it('emit show event', done => {
    wrapper = mount(Dialog, {
      propsData: {
        value: false,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.setProps({value: true})
    setTimeout(() => {
      expect(eventStub.calledWith('show')).to.be.true
      done()
    }, 400)
  })

  /*--------------------------------------------------------------------------*/
  /* Static Method Tests
  /*--------------------------------------------------------------------------*/

  it('generate a confirm dialog', () => {
    vm = Dialog.confirm({})
    expect(vm.btns.length).to.equal(2)
  })

  it('generate a alert dialog', () => {
    vm = Dialog.alert({})
    expect(vm.btns.length).to.equal(1)
  })

  it('generate a succeed dialog', () => {
    vm = Dialog.succeed({})
    expect(vm.icon).to.equal('circle-right')
  })

  it('generate a failed dialog', done => {
    vm = Dialog.failed({})
    const eventSpy = sinon.spy(vm, '$emit')
    vm.value = false
    expect(vm.icon).to.equal('circle-cross')
    setTimeout(() => {
      expect(eventSpy.calledWith('hide')).to.be.true
      done()
    }, 300)
  })

  it('close all dialogs', done => {
    const d1 = Dialog.confirm({})
    const d2 = Dialog.succeed({})
    const eventStub1 = sinon.stub(d1, '$emit')
    const eventStub2 = sinon.stub(d2, '$emit')
    Dialog.closeAll()
    setTimeout(() => {
      expect(eventStub1.calledWith('input', false)).to.be.true
      expect(eventStub2.calledWith('input', false)).to.be.true
      done()
    }, 400)
  })
})

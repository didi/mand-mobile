import Dialog from '../dialog.vue'
import sinon from 'sinon'
import {mount} from 'avoriaz'
// import { setTimeout } from 'timers';

describe('Dialog', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

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

  // it('emit input/hide/show event', (done) => {
  //   wrapper = mount(Dialog, {
  //     propsData: {
  //       value: true
  //     }
  //   })
  //   const eventStub = sinon.stub(wrapper.vm, '$emit')
  //   setTimeout(() => {
  //     expect(eventStub.calledWith('show')).to.be.true
  //     wrapper.first('.md-dialog-close').trigger('click')
  //     wrapper.setProps({ value: false })
  //     setTimeout(() => {
  //       expect(eventStub.calledWith('input')).to.be.true
  //       expect(eventStub.calledWith('hide')).to.be.true
  //       done()
  //     }, 500)
  //   }, 500)
  // })
})

import Toast from '../toast.vue'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('Toast', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create simple toast', () => {
    wrapper = mount(Toast, {
      propsData: {
        content: 'Hello, Earth!',
      },
    })

    expect(wrapper.hasClass('md-toast')).to.equal(true)
  })

  it('has content', () => {
    wrapper = mount(Toast, {
      propsData: {
        content: 'Hello, Earth!',
      },
    })

    expect(
      wrapper
        .first('.md-toast-content span')
        .text()
        .trim(),
    ).to.equal('Hello, Earth!')
  })

  it('create icon toast', () => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'cross',
        content: 'Hello, Earth!',
      },
    })

    expect(wrapper.contains('.md-icon')).to.be.true
  })

  it('should update timer after state changed', done => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'spinner',
        content: 'Hello, Earth!',
        duration: 1000,
      },
    })
    setTimeout(() => {
      wrapper.setProps({icon: 'circle-right'})
      setTimeout(function() {
        expect(wrapper.vm.visible).to.be.true
        done()
      }, 500)
    }, 800)
  })

  it('auto hide', done => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'spinner',
        content: 'Hello, Earth!',
        duration: 1000,
      },
    })
    setTimeout(() => {
      expect(wrapper.vm.visible).to.be.false
      done()
    }, 1100)
  })

  // it('emit hide event', done => {
  //   wrapper = mount(Toast, {
  //     propsData: {
  //       icon: 'spinner',
  //       content: 'Hello, Earth!',
  //       duration: 0
  //     }
  //   })

  //   const eventStub = sinon.stub(wrapper.vm, '$emit')
  //   wrapper.vm.hide()
  //   setTimeout(() => {
  //     console.log(wrapper.vm.$el)
  //     expect(eventStub.calledWith('hide')).to.be.true
  //     done()
  //   }, 500)
  // })
})

import Swiper from '../index'
import SwiperItem from '../swiper-item'
import triggerTouch from '../../popup/test/touch-trigger'
import { mount, shallow } from 'avoriaz'

describe('Swiper', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple swiper', done => {
    wrapper = mount(Swiper)

    expect(wrapper.hasClass('md-swiper')).to.be.true
    
    expect(wrapper.vm.autoplay).to.equal(3000)
    expect(wrapper.vm.transition).to.equal('slide')
    expect(wrapper.vm.defaultIndex).to.equal(0)
    expect(wrapper.vm.hasDots).to.equal(true)
    expect(wrapper.vm.isPrevent).to.equal(true)
    expect(wrapper.vm.isLoop).to.equal(true)
    expect(wrapper.vm.dragable).to.equal(true)
    done()
  })

  it('change swiper default props', () => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 5000,
        transition: 'slideY',
        defaultIndex: 1,
        hasDots: false,
        isPrevent: false,
        isLoop: false,
        dragable: false
      }
    })

    expect(wrapper.vm.autoplay).to.equal(5000)
    expect(wrapper.vm.transition).to.equal('slideY')
    expect(wrapper.vm.defaultIndex).to.equal(1)
    expect(wrapper.vm.hasDots).to.be.false
    expect(wrapper.vm.isPrevent).to.be.false
    expect(wrapper.vm.isLoop).to.be.false
    expect(wrapper.vm.dragable).to.be.false

    expect(wrapper.vm.isVertical).to.be.true
  })

  // it('set ill props for swiper ', () => {
  //   wrapper = mount(Swiper, {
  //     propsData: {
  //       autoplay: 300,
  //       transition: 'slideYZ',
  //       defaultIndex: -1,
  //       hasDots: 'false',
  //       isPrevent: 'false',
  //       isLoop: 'false',
  //       dragable: 'false'
  //     }
  //   })
  // })

  it('create a swiper item', () => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.find('.md-swiper-item')[0].hasStyle('height', 'auto')).to.be.true
  })

  it('create a vertical swiper item', () => {
    wrapper = mount(Swiper, { 
      propsData: {
        transition: 'slideY'
      },
      slots: {
        'default': SwiperItem
      }
    })
    expect(wrapper.find('.md-swiper-item')[0].hasStyle('width', 'auto')).to.be.true
  })

  it('swiper method play', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      wrapper.vm.play(5000)
      expect(wrapper.vm.autoplay).to.equal(5000)
      done()
    }, 1000)
  })

  it('swiper method stop', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      wrapper.vm.stop()
      expect(wrapper.vm.timer).to.equal(null)
      done()
    }, 1000)
  })
  
  it('swiper method pre', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    setTimeout(() => {
      wrapper.vm.prev()
      expect(wrapper.vm.getIndex()).to.equal(2)
      done()
    }, 500)
  })
  
  it('swiper method next', done => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    
    setTimeout(() => {
      wrapper.vm.next()
      expect(wrapper.vm.getIndex()).to.equal(1)
      done()
    }, 500)
  })
  
  it('swiper method goto', done => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    
    setTimeout(() => {
      wrapper.vm.goto('a') // ill
      expect(wrapper.vm.getIndex()).to.equal(0)

      wrapper.vm.goto(-1) // ill
      expect(wrapper.vm.getIndex()).to.equal(0)

      wrapper.vm.goto(3) // ill
      expect(wrapper.vm.getIndex()).to.equal(0)

      wrapper.vm.goto(2)
      expect(wrapper.vm.getIndex()).to.equal(2)
      done()
    }, 500)
  })
  
  it('swiper method getIndex', () => {
    wrapper = mount(Swiper)

    expect(wrapper.vm.getIndex()).to.equal(wrapper.vm.index)
  })


  it('drag swiper', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    // wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.getIndex()).to.equal(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).to.equal(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change', 0, 1)).to.be.true
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(1)
        // expect(eventStub.calledWith('after-change', 0, 1)).to.be.true
        done()
      }, 400)
    }, 500)
    // })
  })

  it('drag swiper with a litter distance', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.vm.getIndex()).to.equal(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).to.equal(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -4, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change')).to.be.false
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(0)
        done()
      }, 300)
    }, 500)
  })

  it('drag swiper with single item', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        isLoop: false
      },
      slots: {
        'default': SwiperItem
      }
    })
    expect(wrapper.vm.getIndex()).to.equal(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).to.equal(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change')).to.be.false
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(0)
        done()
      }, 300)
    }, 500)
  })

  it('drag swiper at first item to last item in disloop mode', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        isLoop: false
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.vm.getIndex()).to.equal(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).to.equal(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', 100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change')).to.be.false
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(0)
        done()
      }, 300)
    }, 500)
  })

  it('drag swiper at edge (0 -> 2)', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      const hook = wrapper.vm.$el
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', 100, 0)
      triggerTouch(hook, 'touchend')
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(2)
        done()
      }, 1000)
    }, 500)
  })

  it('drag swiper at edge (2 -> 0)', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        defaultIndex: 2
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      const hook = wrapper.vm.$el
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -100, 0)
      triggerTouch(hook, 'touchend')
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).to.equal(0)
        done()
      }, 1000)
    }, 500)
  })

  it('drag swiper in disdrag mode', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        transition: 'slideY',
        isLoop: false
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    // 初始 index 为 0
    expect(wrapper.vm.getIndex()).to.equal(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el

      // 初始化后 index 为 0
      expect(wrapper.vm.getIndex()).to.equal(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', 0, -50)
      triggerTouch(hook, 'touchend')
      setTimeout(() => {
        // 向右滑动后，index 为 1
        expect(wrapper.vm.getIndex()).to.equal(1)
        done()
      }, 300)
    }, 500)
  })
  
  it('set transition by fade', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 1000,
        transition: 'fade'
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      // 1500 ms 后渐变到第二屏
      expect(wrapper.vm.getIndex()).to.equal(1)
      done()
    }, 1500)
  })

  // it('swiper destroye', done => {
  //   wrapper = mount(Swiper, {
  //     slots: {
  //       'default': [SwiperItem, SwiperItem, SwiperItem]
  //     }
  //   })

  //   setTimeout(() => {
  //     // 1500 ms 后渐变到第二屏
  //     wrapper.destroy()
  //     expect(wrapper.vm.timer).to.equal(null)
  //     expect(wrapper.vm.reInitTimer).to.equal(null)
  //     done()
  //   }, 1500)
  // })

  

})

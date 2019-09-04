import { Swiper, SwiperItem } from 'mand-mobile'
import triggerTouch from '../../popup/test/touch-trigger'
import sinon from 'sinon'
import { mount } from '@vue/test-utils'

describe('Swiper', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create a simple swiper', done => {
    wrapper = mount(Swiper)

    expect(wrapper.classes('md-swiper')).toBe(true)
    
    expect(wrapper.vm.autoplay).toBe(3000)
    expect(wrapper.vm.transition).toBe('slide')
    expect(wrapper.vm.defaultIndex).toBe(0)
    expect(wrapper.vm.hasDots).toBe(true)
    expect(wrapper.vm.isPrevent).toBe(true)
    expect(wrapper.vm.isLoop).toBe(true)
    expect(wrapper.vm.dragable).toBe(true)
    done()
  })

  test('change swiper default props', () => {
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

    expect(wrapper.vm.autoplay).toBe(5000)
    expect(wrapper.vm.transition).toBe('slideY')
    expect(wrapper.vm.defaultIndex).toBe(1)
    expect(wrapper.vm.hasDots).toBe(false)
    expect(wrapper.vm.isPrevent).toBe(false)
    expect(wrapper.vm.isLoop).toBe(false)
    expect(wrapper.vm.dragable).toBe(false)

    expect(wrapper.vm.isVertical).toBe(true)
  })

  test('create a swiper item', () => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.findAll('.md-swiper-item').at(0).element.style.height).toBe('auto')
  })

  test('create a vertical swiper item', () => {
    wrapper = mount(Swiper, { 
      propsData: {
        transition: 'slideY'
      },
      slots: {
        'default': SwiperItem
      }
    })
    expect(wrapper.findAll('.md-swiper-item').at(0).element.style.width).toBe('auto')
  })

  test('swiper method play', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      wrapper.vm.play(5000)
      expect(wrapper.vm.autoplay).toBe(5000)
      done()
    }, 1000)
  })

  test('swiper method stop', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    setTimeout(() => {
      wrapper.vm.stop()
      expect(wrapper.vm.timer).toBe(null)
      done()
    }, 1000)
  })
  
  test('swiper method pre', done => {
    wrapper = mount(Swiper, {
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    setTimeout(() => {
      wrapper.vm.prev()
      expect(wrapper.vm.getIndex()).toBe(2)
      done()
    }, 500)
  })
  
  test('swiper method next', done => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    
    setTimeout(() => {
      wrapper.vm.next()
      expect(wrapper.vm.getIndex()).toBe(1)
      done()
    }, 500)
  })
  
  test('swiper method goto', done => {
    wrapper = mount(Swiper, { 
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    
    setTimeout(() => {
      wrapper.vm.goto('a') // ill
      expect(wrapper.vm.getIndex()).toBe(0)

      wrapper.vm.goto(-1) // ill
      expect(wrapper.vm.getIndex()).toBe(0)

      wrapper.vm.goto(3) // ill
      expect(wrapper.vm.getIndex()).toBe(2)

      wrapper.vm.goto(2)
      expect(wrapper.vm.getIndex()).toBe(2)
      done()
    }, 500)
  })
  
  test('swiper method getIndex', () => {
    wrapper = mount(Swiper)

    expect(wrapper.vm.getIndex()).toBe(wrapper.vm.index)
  })


  test('drag swiper', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })

    expect(wrapper.vm.getIndex()).toBe(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      expect(wrapper.vm.getIndex()).toBe(0)
      
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -25, 0)
      triggerTouch(hook, 'touchmove', -50, 0)
      triggerTouch(hook, 'touchmove', -100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change', 0, 1)).toBe(true)
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).toBe(1)
        done()
      }, 400)
    }, 500)
  })

  test('drag swiper with a litter distance', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.vm.getIndex()).toBe(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).toBe(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -4, 0)
      setTimeout(() => {
        triggerTouch(hook, 'touchend')
        expect(eventStub.calledWith('before-change')).toBe(false)
        expect(wrapper.vm.getIndex()).toBe(0)
        done()
      }, 300)
    }, 500)
  })

  test('drag swiper with single item', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        isLoop: false
      },
      slots: {
        'default': SwiperItem
      }
    })
    expect(wrapper.vm.getIndex()).toBe(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).toBe(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', -100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change')).toBe(false)
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).toBe(0)
        done()
      }, 300)
    }, 500)
  })

  test('drag swiper at first item to last item in disloop mode', done => {
    wrapper = mount(Swiper, {
      propsData: {
        autoplay: 0,
        isLoop: false
      },
      slots: {
        'default': [SwiperItem, SwiperItem, SwiperItem]
      }
    })
    expect(wrapper.vm.getIndex()).toBe(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el
      const eventStub = sinon.stub(wrapper.vm, '$emit')
      
      expect(wrapper.vm.getIndex()).toBe(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', 100, 0)
      triggerTouch(hook, 'touchend')
      expect(eventStub.calledWith('before-change')).toBe(false)
      setTimeout(() => {
        expect(wrapper.vm.getIndex()).toBe(0)
        done()
      }, 300)
    }, 500)
  })

  test('drag swiper at edge (0 -> 2)', done => {
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
        expect(wrapper.vm.getIndex()).toBe(2)
        done()
      }, 1000)
    }, 500)
  })

  test('drag swiper at edge (2 -> 0)', done => {
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
        expect(wrapper.vm.getIndex()).toBe(0)
        done()
      }, 1000)
    }, 500)
  })

  test('drag swiper in disdrag mode', done => {
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
    expect(wrapper.vm.getIndex()).toBe(0)
    setTimeout(() => {
      const hook = wrapper.vm.$el

      // 初始化后 index 为 0
      expect(wrapper.vm.getIndex()).toBe(0)
      triggerTouch(hook, 'touchstart', 0, 0)
      triggerTouch(hook, 'touchmove', 0, -50)
      triggerTouch(hook, 'touchend')
      setTimeout(() => {
        // 向右滑动后，index 为 1
        expect(wrapper.vm.getIndex()).toBe(1)
        done()
      }, 300)
    }, 500)
  })
  
  test('set transition by fade', done => {
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
      expect(wrapper.vm.getIndex()).toBe(1)
      done()
    }, 1500)
  })
})

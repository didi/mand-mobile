import {Ruler} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import triggerTouch from '../../popup/test/touch-trigger'

describe('Ruler', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a ruler', () => {
    wrapper = mount(Ruler)

    expect(wrapper.classes()).toContain('md-ruler')
  })

  it('touch the ruler bigger', () => {
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    // to bigger
    triggerTouch(wrapper.element, 'touchstart', 0, 0)
    triggerTouch(window, 'touchmove', 100, 0)
    triggerTouch(window, 'touchmove', 50, 0)
    triggerTouch(wrapper.element, 'touchend', 50, 0)

    expect(value).toBeGreaterThan(50)
  })

  it('touch the ruler lesser', () => {
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    // to bigger
    triggerTouch(wrapper.element, 'touchstart', 0, 0)
    triggerTouch(window, 'touchmove', 100, 0)
    triggerTouch(window, 'touchmove', 150, 0)
    triggerTouch(wrapper.element, 'touchend', 50, 0)

    expect(value).toBeLessThan(50)
  })

  it('touch the ruler over max', () => {
    const max = 90
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
        max,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    // over max
    triggerTouch(wrapper.element, 'touchstart', 0, 0)
    triggerTouch(window, 'touchmove', 5000, 0)
    triggerTouch(window, 'touchmove', 0, 0)
    triggerTouch(wrapper.element, 'touchend', 0, 0)

    expect(value).toEqual(max)
  })

  it('touch the ruler below min', () => {
    const min = 10
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
        min,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    // below min
    triggerTouch(wrapper.element, 'touchstart', 0, 0)
    triggerTouch(window, 'touchmove', 100, 0)
    triggerTouch(window, 'touchmove', 5000, 0)
    triggerTouch(wrapper.element, 'touchend', 5000, 0)

    expect(value).toEqual(min)
  })

  it('change value', () => {
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    value = 90
    wrapper.setProps({value: 90})

    expect(value).toEqual(90)
  })

  it('change value when touching', () => {
    let value = 50

    wrapper = mount(Ruler, {
      propsData: {
        value,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    triggerTouch(wrapper.element, 'touchstart', 0, 0)
    triggerTouch(window, 'touchmove', 100, 0)

    wrapper.setProps({value: 10})

    triggerTouch(window, 'touchmove', 5000, 0)
    triggerTouch(wrapper.element, 'touchend', 5000, 0)

    expect(value).toEqual(0)
  })

  it('value bigger than max', () => {
    wrapper = mount(Ruler, {
      propsData: {
        value: 10000,
      },
    })

    expect(wrapper.vm.value).toEqual(10000)
  })

  it('props max over the max of scope', () => {
    const scope = [0, 100]

    wrapper = mount(Ruler, {
      propsData: {
        scope,
        max: 110,
      },
    })

    expect(wrapper.vm.realMax).toEqual(scope[1])
  })

  it('props max below the min of scope', () => {
    const scope = [0, 100]

    wrapper = mount(Ruler, {
      propsData: {
        scope,
        max: -10,
      },
    })

    expect(wrapper.vm.realMax).toEqual(scope[1])
  })

  it('props mix below the min of scope', () => {
    const scope = [0, 100]

    wrapper = mount(Ruler, {
      propsData: {
        scope,
        min: -10,
      },
    })

    expect(wrapper.vm.realMin).toEqual(scope[0])
  })

  it('props mix over the max of scope', () => {
    const scope = [0, 100]

    wrapper = mount(Ruler, {
      propsData: {
        scope,
        min: 110,
      },
    })

    expect(wrapper.vm.realMin).toEqual(scope[0])
  })
})

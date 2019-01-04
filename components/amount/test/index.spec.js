import {Amount} from 'mand-mobile'
import {shallowMount} from '@vue/test-utils'

describe('Amount - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('mounted', () => {
    let checked = false
    wrapper = shallowMount(Amount, {
      propsData: {
        value: 1234,
      },
    })
    expect(wrapper.vm.isMounted).toBe(true)
  })
})

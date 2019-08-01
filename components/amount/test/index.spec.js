import {Amount} from 'mand-mobile'
import {shallowMount, mount} from '@vue/test-utils'

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

  test('should number animation not lose precision', done => {
    wrapper = mount({
      template: `
          <md-amount
          :value="val"
          :duration="1000"
          transition
          ref="amount"
        ></md-amount>
      `,
      components: {
        [Amount.name]: Amount,
      },
      data() {
        return {
          val: 1000,
        }
      },
    })

    const instance = wrapper.vm.$refs.amount

    setTimeout(() => {
      expect(instance.formatValue).toBe(1000)
      wrapper.vm.val = 20.66
    }, 2000)

    setTimeout(() => {
      expect(instance.formatValue).toBe(20.66)
      done()
    }, 4000)
  })
})

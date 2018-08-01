import Stepper from '../index'
import {mount} from 'avoriaz'

describe('Stepper', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple stepper', () => {
    wrapper = mount(Stepper)

    expect(wrapper.hasClass('md-stepper')).to.be.true
    expect(wrapper.vm.defaultValue).to.equal(0)
    expect(wrapper.vm.step).to.equal(1)
    expect(wrapper.vm.disabled).to.equal(false)
    expect(wrapper.vm.readOnly).to.equal(false)
  })

  it('change stepper default props', () => {
    wrapper = mount(Stepper, {
      propsData: {
        defaultValue: 2,
        step: 2,
        disabled: true,
        readOnly: true,
      },
    })

    expect(wrapper.vm.defaultValue).to.equal(2)
    expect(wrapper.vm.step).to.equal(2)
    expect(wrapper.vm.disabled).to.equal(true)
    expect(wrapper.vm.readOnly).to.equal(true)
  })

  it('stepper method reduce', () => {
    wrapper = mount(Stepper)
    wrapper.vm.currentNum = 1
    wrapper.vm.step = 2
    wrapper.find('.md-stepper-button-reduce')[0].trigger('click')
    expect(Number(wrapper.vm.currentNum)).to.equal(-1)
  })

  it('stepper method add', () => {
    wrapper = mount(Stepper)
    wrapper.vm.currentNum = 1
    wrapper.vm.step = 2
    wrapper.find('.md-stepper-button-add')[0].trigger('click')
    expect(wrapper.vm.currentNum).to.equal(3)
  })

  it('stepper method getCurrentNum', () => {
    wrapper = mount(Stepper)
    wrapper.vm.defaultValue = 2
    wrapper.vm.min = 3
    expect(wrapper.vm.$_getCurrentNum()).to.equal(wrapper.vm.min)

    wrapper.vm.defaultValue = 4
    wrapper.vm.max = 3
    expect(wrapper.vm.$_getCurrentNum()).to.equal(wrapper.vm.max)
  })

  it('stepper method checkMinMax', () => {
    wrapper = mount(Stepper)
    wrapper.vm.max = 5
    wrapper.vm.min = 3
    expect(wrapper.vm.$_checkMinMax()).to.equal(true)

    wrapper.vm.max = 3
    wrapper.vm.min = 5
    expect(wrapper.vm.$_checkMinMax()).to.equal(false)
  })

  it('stepper method checkStatus', () => {
    wrapper = mount(Stepper)
    wrapper.vm.min = 2
    wrapper.vm.currentNum = 3
    wrapper.vm.step = 2
    wrapper.vm.$_checkStatus()
    expect(wrapper.vm.isMin).to.equal(true)
  })

  it('stepper method onChange', () => {
    wrapper = mount(Stepper)
    wrapper.vm.currentNum = 2
    wrapper.vm.min = 3
    wrapper.vm.$_onChange()
    // currentNum < min
    expect(wrapper.vm.currentNum).to.equal(wrapper.vm.min)

    wrapper.vm.currentNum = 6
    wrapper.vm.max = 5
    wrapper.vm.$_onChange()
    // currentNum > max
    expect(wrapper.vm.currentNum).to.equal(wrapper.vm.max)

    wrapper.vm.currentNum = 4
    wrapper.vm.$_onChange()
    // min < currentNum < max
    expect(wrapper.vm.currentNum).to.equal(4)
  })
})

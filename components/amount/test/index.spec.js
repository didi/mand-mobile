import Amount from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('amount precision', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.567,
        precision: 2,
      },
    })

    expect(wrapper.text().trim()).to.equal('1234.57')
  })

  it('amount negative precision', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.123,
        precision: -1,
      },
    })
    expect(wrapper.text().trim()).to.equal('1234')
  })

  it('amount isRoundUp', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.567,
        precision: 2,
        isRoundUp: false,
      },
    })

    expect(wrapper.text().trim()).to.equal('1234.56')
  })

  it('amount hasSeparator', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.567,
        precision: 2,
        hasSeparator: true,
      },
    })

    expect(wrapper.text().trim()).to.equal('1,234.57')
  })

  it('amount hasSeparator with precision 0', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.567,
        precision: 0,
        hasSeparator: true,
      },
    })

    expect(wrapper.text().trim()).to.equal('1,235')
  })

  it('amount isCapital 0', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1234.567,
        precision: 2,
        isCapital: true,
      },
    })

    expect(wrapper.text().trim()).to.equal('壹仟贰佰叁拾肆元伍角陆分柒毫')
  })
  it('amount isCapital 1', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 1024,
        precision: 2,
        isCapital: true,
      },
    })

    expect(wrapper.text().trim()).to.equal('壹仟零贰拾肆元整')
  })
  it('amount isCapital 2', () => {
    wrapper = mount(Amount, {
      propsData: {
        value: 0.123,
        precision: 2,
        isCapital: true,
      },
    })

    expect(wrapper.text().trim()).to.equal('壹角贰分叁毫')
  })
})

import Button from '../index'
import {mount} from 'avoriaz'

describe('Button', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create default button', () => {
    wrapper = mount(Button)

    expect(wrapper.hasClass('md-button') && wrapper.hasClass('primary') && wrapper.hasClass('large')).to.equal(true)
  })

  it('create primary button', () => {
    wrapper = mount(Button, {
      propsData: {
        type: 'primary',
      },
    })

    expect(wrapper.hasClass('primary')).to.equal(true)
  })

  it('create ghost button', () => {
    wrapper = mount(Button, {
      propsData: {
        type: 'ghost',
      },
    })

    expect(wrapper.hasClass('ghost')).to.equal(true)
  })

  it('create ghost-primary button', () => {
    wrapper = mount(Button, {
      propsData: {
        type: 'ghost-primary',
      },
    })

    expect(wrapper.hasClass('ghost-primary')).to.equal(true)
  })

  it('create link button', () => {
    wrapper = mount(Button, {
      propsData: {
        type: 'link',
      },
    })

    expect(wrapper.hasClass('link')).to.equal(true)
  })

  it('create disabled button', () => {
    wrapper = mount(Button, {
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.hasClass('disabled')).to.equal(true)
  })

  it('create icon button', () => {
    wrapper = mount(Button, {
      propsData: {
        icon: 'hollow-plus',
      },
    })

    expect(wrapper.hasClass('with-icon')).to.equal(true)
  })

  it('create large button', () => {
    wrapper = mount(Button, {
      propsData: {
        size: 'large',
      },
    })

    expect(wrapper.hasClass('large')).to.equal(true)
  })

  it('create small button', () => {
    wrapper = mount(Button, {
      propsData: {
        size: 'small',
      },
    })

    expect(wrapper.hasClass('small')).to.equal(true)
  })
})

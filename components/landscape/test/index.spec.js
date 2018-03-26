import Landscape from '../index'
import {mount} from 'avoriaz'

describe('Landscape', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple landscape', () => {
    wrapper = mount(Landscape)

    expect(wrapper.hasClass('md-landscape')).to.be.true
  })

  it('create a simple landscape and open it', done => {
    wrapper = mount(Landscape, {
      propsData: {
        value: false,
      },
    })
    expect(wrapper.find('.md-popup-mask')[0].element.style.display).to.equal('none')

    wrapper.vm.value = true

    setTimeout(() => {
      expect(wrapper.find('.md-popup-mask')[0].element.style.display).to.equal('')
      done()
    }, 300)
  })

  it('create a simple landscape and close it', done => {
    wrapper = mount(Landscape, {
      propsData: {
        value: true,
      },
    })
    setTimeout(() => {
      expect(wrapper.find('.md-popup-mask')[0].element.style.display).to.equal('')
      wrapper.find('.close')[0].trigger('click')
    }, 300)

    setTimeout(() => {
      expect(wrapper.find('.md-popup-mask')[0].element.style.display).to.equal('none')
      done()
    }, 600)
  })
})

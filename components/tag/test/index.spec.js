import Tag from '../index'
import {mount, shallow} from 'avoriaz'

describe('Tag', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple tag', () => {
    wrapper = mount(Tag)

    expect(wrapper.hasClass('md-tag')).to.be.true
  })

  it('create a circle tag', done => {
    wrapper = mount(Tag)
    wrapper.setProps({
      shape: 'circle',
      fontColor: '#fff',
    })
    wrapper.vm.$nextTick(function() {
      expect(wrapper.contains('.shape-circle')).to.be.true
      done()
    })
  })
  it('create a fill tag', () => {
    wrapper = mount(Tag)
    wrapper.setProps({
      type: 'fill',
      fontColor: '#fff',
    })
    expect(wrapper.contains('.type-fill')).to.be.true
  })
  it('create a ghost tag', () => {
    wrapper = mount(Tag)
    wrapper.setProps({
      type: 'ghost',
      fontColor: '#fff',
    })
    expect(wrapper.contains('.type-ghost')).to.be.true
  })
})

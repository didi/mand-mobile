import Tabs from '../index'
import {mount} from 'avoriaz'

describe('Tabs', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create an empty tabs', () => {
    wrapper = mount(Tabs)

    expect(wrapper.hasClass('md-tabs')).to.be.true
  })

  it('create a tabs with title list', () => {
    wrapper = mount(Tabs, {
      propsData: {
        titles: ['标题一', '标题二', '标题三'],
      },
    })

    expect(wrapper.find('.md-tab-title').length).to.equal(3)
  })

  it('switch index by using selectTab method', done => {
    wrapper = mount(Tabs, {
      propsData: {
        titles: ['标题一', '标题二', '标题三'],
      },
    })

    expect(wrapper.find('.md-tab-title')[0].hasClass('active')).to.be.true

    wrapper.vm.selectTab(2)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-tab-title')[2].hasClass('active')).to.be.true
      done()
    })
  })

  it('switch index by clicking', done => {
    wrapper = mount(Tabs, {
      propsData: {
        titles: ['标题一', '标题二', '标题三'],
      },
    })

    expect(wrapper.find('.md-tab-title')[0].hasClass('active')).to.be.true
    wrapper.find('.md-tab-title')[2].trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-tab-title')[2].hasClass('active')).to.be.true
      done()
    })
  })

  it('create a tabs with customized titles and contents', () => {
    wrapper = mount(Tabs, {
      slots: {
        default: [
          {
            template: '<div>content A</div>',
          },
          {
            template: '<div>content B</div>',
          },
        ],
        title: [
          {
            template: '<div>title A</div>',
          },
          {
            template: '<div>title B</div>',
          },
        ],
      },
    })

    expect(wrapper.find('.md-tab-title').length).to.equal(2)
  })
})

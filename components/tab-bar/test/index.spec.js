import TabBar from '../index'
import {mount} from 'avoriaz'

describe('TabBar', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create an empty tab-bar', () => {
    wrapper = mount(TabBar)

    expect(wrapper.hasClass('md-tab-bar')).to.be.true
  })

  it('create a tab-bar with title list', () => {
    wrapper = mount(TabBar, {
      propsData: {
        titles: ['标题一', '标题二', '标题三'],
      },
    })

    expect(wrapper.find('.md-tab-title').length).to.equal(3)
  })

  it('switch index by changing default index', done => {
    wrapper = mount(TabBar, {
      propsData: {
        titles: ['标题一', '标题二', '标题三'],
      },
    })

    expect(wrapper.find('.md-tab-title')[0].hasClass('active')).to.be.true

    wrapper.vm.defaultIndex = 2
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-tab-title')[2].hasClass('active')).to.be.true
      done()
    })
  })

  it('switch index by clicking', done => {
    wrapper = mount(TabBar, {
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

  it('create a tab-bar with customized titles', () => {
    wrapper = mount(TabBar, {
      slots: {
        default: [
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

import DropMenu from '../index'
import {mount} from 'avoriaz'

describe('DropMenu', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple drop-menu', done => {
    wrapper = mount(DropMenu)
    expect(wrapper.hasClass('md-drop-menu')).to.be.true
    expect(wrapper.vm.data.length).to.equal(0)

    wrapper.vm.data = [
      {
        text: 'hello',
        options: [
          {
            text: 'world',
          },
        ],
      },
    ]

    wrapper.vm.$nextTick(() => {
      const barItem = wrapper.find('.bar-item')
      expect(barItem.length).to.equal(1)
      expect(barItem[0].text()).to.equal('hello')
      done()
    })
  })

  it('drop-menu bar item click', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                text: 'world',
              },
            ],
          },
        ],
      },
    })
    const barItem = wrapper.find('.bar-item')
    const mockData = [{text: 'world'}]

    barItem[0].trigger('click')
    expect(barItem[0].hasClass('active')).to.true
    expect(wrapper.instance().isPopupShow).to.true
    expect(JSON.stringify(wrapper.instance().activeMenuListData)).to.equal(JSON.stringify(mockData))

    wrapper.vm.$nextTick(() => {
      const listItem = wrapper.find('.md-radio-item')
      expect(listItem.length).to.equal(1)
      barItem[0].trigger('click')
      done()
    })
  })

  it('drop-menu list item click', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                text: 'world',
              },
            ],
          },
        ],
      },
    })
    const barItem = wrapper.find('.bar-item')
    const mockData = [{text: 'world'}]

    barItem[0].trigger('click')
    wrapper.vm.$nextTick(() => {
      const listItem = wrapper.find('.md-radio-item')
      listItem[0].trigger('click')

      expect(JSON.stringify(wrapper.instance().selectedMenuListItem)).to.equal(JSON.stringify(mockData))
      expect(barItem[0].text()).to.equal('world')
      expect(wrapper.instance().getSelectedValue(0).text).to.equal('world')
      expect(wrapper.instance().getSelectedValues()[0].text).to.equal('world')
      done()
    })
  })

  it('drop-menu events', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                text: 'world',
              },
            ],
          },
        ],
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const barItem = wrapper.find('.bar-item')[0]

    barItem.trigger('click')
    expect(wrapper.vm.isPopupShow).to.equal(true)
    expect(wrapper.vm.activeMenuBarIndex).to.equal(0)
    setTimeout(() => {
      const listItem = wrapper.find('.md-radio-item')[0]
      listItem.trigger('click')
      expect(eventStub.calledWith('change')).to.be.true
      setTimeout(() => {
        done()
      }, 500)
    }, 500)
  })

  it('create a disabled drop-menu', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            disabled: true,
          },
          {
            text: 'hello',
            options: [
              {
                text: 'hello',
                disabled: true,
              },
            ],
          },
        ],
      },
    })
    const barItem = wrapper.find('.bar-item')
    expect(barItem[0].hasClass('disabled')).to.true

    barItem[1].trigger('click')
    setTimeout(() => {
      const listItem = wrapper.find('.md-radio-item')
      expect(listItem[0].hasClass('disabled')).to.true
      done()
    }, 500)
  })

  it('create a drop-menu with defult value', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                text: 'world',
              },
              {
                text: 'space',
              },
            ],
          },
        ],
        defaultValue: ['space'],
      },
    })

    wrapper.vm.$nextTick(() => {
      const barItem = wrapper.find('.bar-item')
      expect(barItem[0].hasClass('selected')).to.true
      expect(barItem[0].text()).to.equal('space')

      barItem[0].trigger('click')
      setTimeout(() => {
        const listItem = wrapper.find('.md-radio-item')
        expect(listItem[1].hasClass('selected')).to.true
        done()
      }, 300)
    })
  })
})

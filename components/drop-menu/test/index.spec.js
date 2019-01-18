import {DropMenu} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('DropMenu - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('drop-menu bar item click', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                value: 'world',
                text: 'world',
              },
            ],
          },
        ],
        defaultValue: ['world'],
      },
    })
    const barItem = wrapper.find('.bar-item')
    const mockData = [{value: 'world', text: 'world'}]

    barItem.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(barItem.classes('active')).toBeTruthy()
      expect(wrapper.vm.isPopupShow).toBeTruthy()
      expect(JSON.stringify(wrapper.vm.activeMenuListData)).toBe(JSON.stringify(mockData))

      const listItem = wrapper.findAll('.md-radio-item')
      expect(listItem.length).toBe(1)
      barItem.trigger('click')
      wrapper.setProps({data: []})
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
                value: 'world',
                text: 'world',
              },
            ],
          },
        ],
      },
    })
    const barItem = wrapper.find('.bar-item')
    const mockData = [{value: 'world', text: 'world'}]

    barItem.trigger('click')
    setTimeout(() => {
      const listItem = wrapper.find('.md-radio-item')
      listItem.trigger('click')

      expect(JSON.stringify(wrapper.vm.selectedMenuListItem)).toBe(JSON.stringify(mockData))
      expect(wrapper.vm.getSelectedValue(0).text).toBe('world')
      expect(wrapper.vm.getSelectedValues()[0].text).toBe('world')
      done()
    }, 350)
  })

  it('drop-menu events', done => {
    wrapper = mount(DropMenu, {
      propsData: {
        data: [
          {
            text: 'hello',
            options: [
              {
                value: 'world',
                text: 'world',
              },
            ],
          },
        ],
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const barItem = wrapper.find('.bar-item')

    barItem.trigger('click')
    expect(wrapper.vm.isPopupShow).toBeTruthy()
    expect(wrapper.vm.activeMenuBarIndex).toBe(0)
    setTimeout(() => {
      const listItem = wrapper.find('.md-radio-item')
      listItem.trigger('click')
      expect(eventStub.calledWith('change')).toBeTruthy()
      setTimeout(() => {
        done()
      }, 500)
    }, 500)
  })
})

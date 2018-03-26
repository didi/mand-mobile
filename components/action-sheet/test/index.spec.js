import ActionSheet from '../index'
import {mount} from 'avoriaz'

describe('ActionSheet', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a action-sheet', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        options: [
          {
            label: '选项1',
            value: 0,
          },
          {
            label: '选项2',
            value: 1,
          },
          {
            label: '选项3',
            value: 2,
          },
        ],
        value: true,
      },
    })

    expect(wrapper.hasClass('md-action-sheet')).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-action-sheet-item').length).to.equal(3)
      done()
    })
  })

  it('create a action-sheet with defaultIndex', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        options: [
          {
            label: '选项1',
            value: 0,
          },
          {
            label: '选项2',
            value: 1,
          },
          {
            label: '选项3',
            value: 2,
          },
        ],
        value: true,
        defaultIndex: 1,
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-action-sheet-item')[1].hasClass('active')).to.equal(true)
      done()
    })
  })

  it('action-sheet events selected', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        options: [
          {
            label: '选项1',
            value: 0,
          },
          {
            label: '选项2',
            value: 1,
          },
          {
            label: '选项3',
            value: 2,
          },
        ],
        value: true,
        activeIndex: 1,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      wrapper.find('.md-action-sheet-item')[0].trigger('click')
      expect(wrapper.vm.clickIndex).equal(0)
      expect(eventStub.calledWith('selected')).to.be.true
      done()
    })
  })

  it('selector events cancel', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        options: [
          {
            label: '选项1',
            value: 0,
          },
          {
            label: '选项2',
            value: 1,
          },
          {
            label: '选项3',
            value: 2,
          },
        ],
        value: true,
        activeIndex: 1,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      const cancelBtn = wrapper.find('.cancel-btn')[0]
      cancelBtn.trigger('click')
      expect(eventStub.calledWith('cancel')).to.be.true
      done()
    })
  })
})

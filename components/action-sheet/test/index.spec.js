import ActionSheet from '../index'
import {mount} from 'avoriaz'

describe('ActionSheet', () => {
  let wrapper, vm

  afterEach(() => {
    wrapper && wrapper.destroy()
    vm && vm.$destroy()
  })

  /*--------------------------------------------------------------------------*/
  /* Component tests
  /*--------------------------------------------------------------------------*/
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

  it('select an invalid item', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        invalidIndex: 0,
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
      expect(eventStub.calledWith('selected')).to.be.false
      done()
    })
  })

  it('create a high action-sheet', done => {
    wrapper = mount(ActionSheet, {
      propsData: {
        invalidIndex: 0,
        maxHeight: 0,
        options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}, {label: '选项3', value: 3}],
        value: true,
        activeIndex: 1,
      },
    })

    setTimeout(() => {
      expect(wrapper.data().scroller).to.equal('.md-action-sheet-content')
      done()
    }, 300)
  })

  it('create a empty action-sheet', () => {
    wrapper = mount(ActionSheet, {})

    expect(wrapper.propsData().options).to.be.array
  })

  /*--------------------------------------------------------------------------*/
  /* Static method tests
  /*--------------------------------------------------------------------------*/
  it('dynamically create a actionsheet', () => {
    vm = ActionSheet.create({})
    expect(vm.value).to.be.true
  })

  it('close all actionsheets', () => {
    const vm1 = ActionSheet.create({})
    const vm2 = ActionSheet.create({})
    ActionSheet.closeAll()

    expect(vm1.value).to.be.false
    expect(vm2.value).to.be.false
  })

  it('destroy all actionsheets', done => {
    const vm1 = ActionSheet.create({})
    const vm2 = ActionSheet.create({})
    ActionSheet.destroyAll()

    setTimeout(() => {
      expect(vm1.value).to.be.false
      expect(vm2.value).to.be.false
      done()
    }, 300)
  })
})

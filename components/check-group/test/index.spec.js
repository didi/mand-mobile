import CheckGroup from '../index'
import {mount} from 'avoriaz'

describe('CheckGroup', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check-group', () => {
    wrapper = mount(CheckGroup)

    expect(wrapper.is('div')).to.be.true
  })

  it('create a string value check-group', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: '1',
        options: [{value: '1', label: '选项一'}, {value: '2', label: '选项二', disabled: true}, {value: '3', label: '选项三'}],
      },
    })

    expect(wrapper.data().selected).to.deep.equal(['1'])
  })

  it('create a number value check-group', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: 1,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二', disabled: true}, {value: 3, label: '选项三'}],
      },
    })

    expect(wrapper.data().selected).to.deep.equal([1])
  })

  it('create a array value check-group', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: [1, 3],
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二', disabled: true}, {value: 3, label: '选项三'}],
      },
    })

    expect(wrapper.data().selected).to.deep.equal([1, 3])
  })

  it('change selected values', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: [1, 3],
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二'}, {value: 3, label: '选项三'}],
      },
    })
    expect(wrapper.data().selected).to.deep.equal([1, 3])
    wrapper.setProps({value: [1, 2]})
    expect(wrapper.data().selected).to.deep.equal([1, 2])
    wrapper.setProps({value: [1]})
    expect(wrapper.data().selected).to.deep.equal([1])
  })

  it('select value', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: 1,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二'}, {value: 3, label: '选项三'}],
      },
    })
    expect(wrapper.data().selected).to.deep.equal([1])
    wrapper.vm.select(2)
    expect(wrapper.data().selected).to.deep.equal([2])
  })

  it('select multiple values', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: [],
        max: 0,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二', disabled: true}, {value: 3, label: '选项三'}],
      },
    })
    expect(wrapper.data().selected).to.deep.equal([])
    wrapper.vm.select([1, 3])
    expect(wrapper.data().selected).to.deep.equal([1, 3])
    wrapper.vm.select([1])
    expect(wrapper.data().selected).to.deep.equal([3])
  })

  it('disable select', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: 1,
        disabled: true,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二', disabled: true}, {value: 3, label: '选项三'}],
      },
    })
    expect(wrapper.data().selected).to.deep.equal([1])
    wrapper.vm.select(3)
    expect(wrapper.data().selected).to.deep.equal([1])
  })

  it('select disabled value', () => {
    wrapper = mount(CheckGroup, {
      propsData: {
        value: 1,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二', disabled: true}, {value: 3, label: '选项三'}],
      },
    })
    expect(wrapper.data().selected).to.deep.equal([1])
    wrapper.vm.select(2)
    expect(wrapper.data().selected).to.deep.equal([1])
  })
})

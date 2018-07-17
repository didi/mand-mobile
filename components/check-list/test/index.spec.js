import CheckList from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('check-list', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check-list', () => {
    wrapper = mount(CheckList)

    expect(wrapper.hasClass('md-check-list')).to.be.true
  })

  it('select value', () => {
    wrapper = mount(CheckList, {
      propsData: {
        value: 1,
        options: [{value: 1, label: '选项一'}, {value: 2, label: '选项二'}, {value: 3, label: '选项三'}],
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    expect(wrapper.vm.value).to.be.equal(1)
    wrapper.vm.select(2)
    expect(eventStub.calledWith('input', 2)).to.be.true
  })
})

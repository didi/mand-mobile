import CheckBox from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('check-box', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check-box', () => {
    wrapper = mount(CheckBox)

    expect(wrapper.hasClass('md-check-box')).to.be.true
  })

  it('select value', () => {
    wrapper = mount(CheckBox, {
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

import Radio from '../index'
import {mount} from 'avoriaz'

describe('Radio', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a radio', done => {
    wrapper = mount(Radio, {
      propsData: {
        options: [{text: '选项1', disabled: true}, {text: '选项2'}, {text: '选项3'}],
        defaultIndex: 1,
      },
    })

    expect(wrapper.find('.md-field-item').length).to.equal(3)
    expect(wrapper.vm.selectedIndex).to.equal(1)

    wrapper.vm.options = [{text: '选项1'}, {text: '选项2'}]
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-field-item').length).to.equal(2)
      done()
    })
  })

  it('create a radio with initial value', done => {
    wrapper = mount(Radio, {
      propsData: {
        options: [{text: '选项1', disabled: true}, {text: '选项2'}, {text: '选项3'}],
        invalidIndex: 1,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.value = '选项2'
    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledWith('input')).to.be.true
      wrapper.vm.value = '选项1'
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.selectedIndex).to.equal(0)

        wrapper.instance().selectByIndex(4)
        wrapper.instance().selectByIndex(1)
        expect(wrapper.vm.selectedIndex).to.equal(0)
        wrapper.instance().selectByIndex(2)
        expect(wrapper.vm.selectedIndex).to.equal(2)
        done()
      })
    })
  })

  it('create a radio with input', done => {
    wrapper = mount(Radio, {
      propsData: {
        options: [{text: '选项1', disabled: true}, {text: '选项2'}, {text: '选项3'}],
        hasInputOption: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    const option = wrapper.find('.md-input-item')[0]
    expect(!!option).to.be.true
    option.find('input')[0].trigger('focus')
    wrapper.vm.inputOptionValue = '123'
    expect(eventStub.calledWith('input')).to.be.true
    option.find('input')[0].trigger('blur')
    expect(wrapper.vm.selectedIndex).to.equal(3)
    expect(wrapper.instance().getSelectedIndex()).to.equal(3)
    expect(wrapper.instance().getSelectedValue()).to.equal('123')
    wrapper.instance().selectByIndex(3)
    done()
  })

  it('radio option choose', done => {
    wrapper = mount(Radio, {
      propsData: {
        options: [{text: '选项1'}, {text: '选项2'}, {text: '选项3'}],
        invalidIndex: 1,
      },
    })

    const options = wrapper.find('.md-field-item')
    options[0].trigger('click')
    options[1].trigger('click')
    expect(wrapper.vm.selectedIndex).to.equal(0)
    expect(wrapper.instance().getSelectedValue().text).to.equal('选项1')
    expect(options[1].hasClass('disabled')).to.be.true
    done()
  })
})

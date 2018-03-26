import DatePicker from '../index'
import {mount} from 'avoriaz'

describe('DatePicker', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a date picker', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        isView: true,
        minDate: new Date('2013/9/9'),
        maxDate: new Date('2020/9/9'),
        defaultDate: date,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-picker-column-item').length).to.equal(3)
      setTimeout(() => {
        expect(eventStub.calledWith('initialed')).to.be.true
        expect(wrapper.instance().getFormatDate('yyyy-MM-dd')).to.equal(
          `${date.getFullYear()}-${date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
        )
        done()
      }, 50)
    })
  })

  it('create a time picker', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        type: 'time',
        unitText: ['', '', '', 'h', 'm'],
        halfDayText: ['AM', 'PM'],
        isView: true,
        isTwelveHours: true,
        defaultDate: date,
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-picker-column-item').length).to.equal(3)
      // setTimeout(() => {
      done()
      // }, 0)
    })
  })

  it('create a datetime picker', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        type: 'datetime',
        isView: true,
        defaultDate: date,
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-picker-column-item').length).to.equal(5)
      // setTimeout(() => {
      done()
      // }, 0)
    })
  })

  it('create a custom picker', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        type: 'custom',
        value: true,
        customTypes: ['dd', 'hh', 'mm'],
        isTwelveHours: true,
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.md-picker-column-item').length).to.equal(3)
      wrapper.vm.isPickerShow = false
      done()
    })
  })
})

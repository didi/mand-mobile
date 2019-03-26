import {DatePicker} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('DatePicker - Operation', () => {
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
        todayText: '今天',
      },
      sync: false,
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(3)
      setTimeout(() => {
        expect(eventSpy.calledWith('initialed')).toBe(true)
        expect(wrapper.vm.getFormatDate('yyyy-MM-dd')).toEqual(
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
        defaultDate: date,
        maxDate: new Date('2018/9/9'),
      },
      sync: false,
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(2)
      done()
    })
  })

  it('create a datetime picker', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        type: 'datetime',
        isView: true,
        defaultDate: date,
        minDate: new Date('2020/9/9'),
      },
      sync: false,
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(5)
      done()
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
      sync: false,
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(3)
      wrapper.vm.isPickerShow = false
      done()
    })
  })

  it('create a popup picker', done => {
    const date = new Date()
    const minDate = new Date(date.getTime() - 60 * 60 * 24)
    const maxDate = new Date(date.getTime() - 60 * 60 * 24)
    wrapper = mount(DatePicker, {
      propsData: {
        value: false,
      },
      sync: false,
    })
    wrapper.setProps({value: true})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(3)
      wrapper.setProps({
        defaultDate: date,
        minDate,
        maxDate,
      })
      const cancel = wrapper.find('.md-popup-cancel')
      cancel.trigger('click')
      setTimeout(() => {
        wrapper.setProps({value: true})
        const confirm = wrapper.find('.md-popup-confirm')
        confirm.trigger('click')
        setTimeout(() => {
          done()
        }, 300)
      }, 300)
    })
  })

  it('defaultDate = maxDate', done => {
    const date = new Date()
    wrapper = mount(DatePicker, {
      propsData: {
        isView: true,
        type: 'datetime',
        defaultDate: date,
        maxDate: date,
      },
      sync: false,
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-picker-column-item').length).toEqual(5)
      done()
    })
  })
})

import TabPicker from '../index'
import {mount} from 'avoriaz'
import cascade from '../demo/data/cascade'
import noCascade from '../demo/data/no-cascade'

describe('TabPicker', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a normal tab-picker', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: noCascade,
        value: true,
      },
    })
    expect(wrapper.vm.data.length).to.equal(3)

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledWith('show'))
      expect(wrapper.find('.md-tab-title').length).to.equal(3)
      const cancelmBtn = wrapper.find('.md-popup-cancel')[0]
      cancelmBtn.trigger('click')
      expect(eventStub.calledWith('input'))
      expect(eventStub.calledWith('cancel')).to.be.true
      setTimeout(() => {
        expect(wrapper.vm.isTabPickerShow).to.be.false
        expect(eventStub.calledWith('hide'))
        done()
      }, 500)
    })
  })

  it('create a cascade tab-picker', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        dataStruct: 'cascade',
        data: cascade,
        value: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledWith('show'))
      expect(wrapper.find('.md-tab-title').length).to.equal(1)
      wrapper.find('.md-radio-item')[0].trigger('click')
      expect(eventStub.calledWith('change')).to.be.true
      setTimeout(() => {
        expect(wrapper.vm.renderData.length).to.equal(2)
        expect(wrapper.find('.md-tab-title').length).to.equal(2)
        wrapper.find('.md-popup-confirm')[0].trigger('click')
        expect(eventStub.calledWith('confirm')).to.be.true
        done()
      }, 500)
    })
  })

  it('create async tabPicker', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        value: true,
        dataStruct: 'async',
        asyncFunc: (value, callback) => {
          setTimeout(() => {
            callback(null, {
              options: [
                {
                  label: '一级选项一',
                  value: '0271',
                },
                {
                  label: '一级选项二',
                  value: '0272',
                },
              ],
              asyncFunc: (value, callback) => {
                callback(null, {
                  options: [
                    {
                      label: '二级选项一',
                      value: '0271',
                    },
                    {
                      label: '二级选项二',
                      value: '0272',
                    },
                  ],
                  asyncFunc: (value, callback) => {
                    callback(null, {
                      options: [
                        {
                          label: '三级选项一',
                          value: '0271',
                        },
                        {
                          label: '三级选项二',
                          value: '0272',
                        },
                      ],
                    })
                  },
                })
              },
            })
          }, 500)
        },
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(wrapper.vm.renderData.length).to.equal(1)
        expect(wrapper.find('.md-tab-title').length).to.equal(1)
        wrapper.find('.md-radio-item')[0].trigger('click')
        expect(eventStub.calledWith('change')).to.be.true
        setTimeout(() => {
          expect(wrapper.vm.renderData.length).to.equal(2)
          expect(wrapper.find('.md-tab-title').length).to.equal(2)
          const cancelmBtn = wrapper.find('.md-popup-cancel')[0]
          cancelmBtn.trigger('click')
          expect(eventStub.calledWith('input')).to.be.false
          expect(eventStub.calledWith('cancel')).to.be.true
          done()
        }, 800)
      }, 800)
    })
  })

  it('tabPicker defalut index and casacde', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: cascade,
        value: true,
        dataStruct: 'cascade',
        defaultIndex: [0, 0, 0],
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.renderData.length).to.equal(3)
      expect(wrapper.find('.md-tab-title').length).to.equal(3)
      const confirmBtn = wrapper.find('.md-popup-confirm')[0]
      confirmBtn.trigger('click')
      expect(eventStub.calledWith('confirm')).to.be.true
      done()
    })
  })
})

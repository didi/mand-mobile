import Chart from '../index'
import {mount} from 'avoriaz'

describe('Chart', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple chart', () => {
    wrapper = mount(Chart, {
      propsData: {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [
          {
            values: [12, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
          },
        ],
      },
    })
    expect(wrapper.contains('.md-chart-graph')).to.be.true
  })

  it('create a chart with multiple datasets', () => {
    wrapper = mount(Chart, {
      propsData: {
        size: ['7rem', '4rem'],
        max: 60,
        min: 0,
        step: 10,
        lines: 5,
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [
          {
            color: '#5e64ff',
            width: 1,
            values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
          },
          {
            width: 1,
            values: [10, 20, 25, 30, 28, 35, 38, 42, 40, 40, 45, 42, 45],
          },
        ],
      },
    })
    expect(wrapper.vm.paths.length).to.equal(2)
  })

  it('create a heat chart', () => {
    wrapper = mount(Chart, {
      propsData: {
        size: ['7rem', '4rem'],
        max: 60,
        min: 0,
        step: 10,
        lines: 5,
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [
          {
            width: 1,
            color: 'red',
            theme: 'heat',
            values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
          },
        ],
      },
    })
    expect(wrapper.contains('#path-fill-gradient-red')).to.be.true
  })

  it('create a region chart', () => {
    wrapper = mount(Chart, {
      propsData: {
        size: ['7rem', '4rem'],
        max: 60,
        min: 0,
        step: 10,
        lines: 5,
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [
          {
            width: 1,
            theme: 'region',
            values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
          },
        ],
      },
    })
    expect(wrapper.contains('.md-chart-path-area')).to.be.true
  })
})

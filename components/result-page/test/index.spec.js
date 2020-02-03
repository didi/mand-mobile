import Vue from 'vue'
import {ResultPage} from 'mand-mobile'
import {mount} from '@vue/test-utils'

describe('ResultPage - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('props reactive', () => {
    let name = ''
    wrapper = mount(ResultPage, {
      propsData: {
        text: '123',
      },
    })
    expect(wrapper.find('.md-result-text').text()).toBe('123')
    wrapper.setProps({text: '456'})
    expect(wrapper.find('.md-result-text').text()).toBe('456')
  })
})

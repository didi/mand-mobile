import ActionBar from '../index'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('ActionBar - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('click event', done => {
    let isClicked = false
    const handler = () => (isClicked = true)

    wrapper = mount(ActionBar, {
      propsData: {
        actions: [{text: 'xxx', onClick: handler}],
      },
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.find('.md-action-bar-button').trigger('click')
    expect(eventSpy.calledWith('click')).toBe(true)
    expect(isClicked).toBe(true)
    done()
  })

  test('disabled click event', done => {
    wrapper = mount(ActionBar, {
      propsData: {
        actions: [{text: 'xxx', disabled: true}],
      },
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.find('.md-action-bar-button').trigger('click')
    expect(eventSpy.calledWith('click')).toBe(false)
    done()
  })
})

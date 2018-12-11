import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import {mount} from '@vue/test-utils'

const {getComputedStyle} = window
window.getComputedStyle = function getComputedStyleStub(el) {
  return {
    ...getComputedStyle(el),
    transitionDelay: '',
    transitionDuration: '',
    animationDelay: '',
    animationDuration: '',
  }
}

describe('Toast - Demo', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('Plain text', done => {
    wrapper = mount(Demo0)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Success', done => {
    wrapper = mount(Demo1)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Failure', done => {
    wrapper = mount(Demo2)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Loading', done => {
    wrapper = mount(Demo3)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
  test('Continuous call', done => {
    wrapper = mount(Demo4)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      setTimeout(() => {
        expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
        done()
      }, 800)
    }, 300)
  })
  test('Customize location', done => {
    wrapper = mount(Demo5)
    setTimeout(() => {
      expect(document.body.querySelector('.md-toast').outerHTML).toMatchSnapshot()
      done()
    }, 300)
  })
})

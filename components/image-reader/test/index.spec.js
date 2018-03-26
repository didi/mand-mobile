import ImageReader from '../index'
import triggerEvent from '../../popup/test/touch-trigger'
import {mount} from 'avoriaz'
import imageProcessor from '../image-processor'
import {dataUrl} from './file.mock'
import Promise from 'es6-promise'

Promise.polyfill()

describe('ImageReader', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a image-reader', () => {
    wrapper = mount(ImageReader, {
      propsData: {
        size: 10,
      },
    })

    expect(wrapper.contains('input')).to.equal(true)

    window.Worker = null
    wrapper.vm.$_readFile({
      files: [
        {
          name: '123.jpg',
          lastModified: 1501728385000,
          lastModifiedDate: '',
          webkitRelativePath: '',
          size: 100,
        },
        {
          name: '123.jpg',
          lastModified: 1501728385000,
          lastModifiedDate: '',
          webkitRelativePath: '',
          size: 57070,
        },
      ],
    })
  })
  it('image-reader processor', () => {
    imageProcessor({
      dataUrl,
      width: 200,
      height: 200,
      quality: 0.1,
    })
  })
})

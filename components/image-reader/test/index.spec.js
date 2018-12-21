import {ImageReader} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import imageProcessor from '../image-processor'
import {dataUrl} from './file.mock'

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

    expect(wrapper.contains('input')).toBe(true)

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

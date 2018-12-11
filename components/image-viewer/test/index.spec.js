import ImageViewer from '../index'
import {mount} from '@vue/test-utils'

describe('ImageViewer - Method', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple image-viewer', () => {
    wrapper = mount(ImageViewer)

    expect(wrapper.hasClass('md-image-viewer')).toBe(true)
    expect(wrapper.vm.value).toBe(false)
    expect(wrapper.vm.initialIndex).toBe(0)
    expect(wrapper.vm.hasDots).toBe(true)
  })

  it('imageViewer method afterChange', () => {
    wrapper = mount(ImageViewer)
    wrapper.vm.$_afterChange(1, 2)
    expect(wrapper.vm.currentImgIndex).toBe(2)
  })

  it('imageViewer method viewerClick', () => {
    wrapper = mount(ImageViewer)
    wrapper.find('.md-image-viewer').trigger('click')
    expect(wrapper.vm.isViewerShow).toBe(false)
  })

  it('imageViewer method imgsInit', () => {
    wrapper = mount(ImageViewer)
    wrapper.vm.list = ['aaa.jpg', 'bbb.jpg']
    wrapper.vm.$_imgsInit()
    expect(wrapper.vm.imgs[0].url).toBe('aaa.jpg')
    expect(wrapper.vm.imgs[1].url).toBe('bbb.jpg')
  })
})

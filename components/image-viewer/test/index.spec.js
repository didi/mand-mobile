import ImageViewer from '../index'
import {mount} from 'avoriaz'

describe('ImageViewer', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple image-viewer', () => {
    wrapper = mount(ImageViewer)

    expect(wrapper.hasClass('md-image-viewer')).to.be.true
    expect(wrapper.vm.show).to.equal(false)
    expect(wrapper.vm.initialIndex).to.equal(0)
    expect(wrapper.vm.hasDots).to.equal(true)
  })

  it('imageViewer method afterChange', () => {
    wrapper = mount(ImageViewer)
    wrapper.vm.$_afterChange(1, 2)
    expect(wrapper.vm.currentImgIndex).to.equal(2)
  })

  it('imageViewer method viewerClick', () => {
    wrapper = mount(ImageViewer)
    wrapper.find('.md-image-viewer')[0].trigger('click')
    expect(wrapper.vm.isViewerShow).to.equal(false)
  })

  it('imageViewer method imgsInit', () => {
    wrapper = mount(ImageViewer)
    wrapper.vm.list = ['aaa.jpg', 'bbb.jpg']
    wrapper.vm.$_imgsInit()
    expect(wrapper.vm.imgs[0].url).to.equal('aaa.jpg')
    expect(wrapper.vm.imgs[1].url).to.equal('bbb.jpg')
  })
})

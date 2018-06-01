<template>
  <div class="md-example-child md-example-child-reader md-example-child-reader-1">
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader1']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }">
        <md-icon
          class="image-reader-item-del"
          name="circle-cross"
          color="#666"
          @click.native="onDeleteImage('reader1', index)">
        </md-icon>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader1"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></md-image-reader>
        <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
        <p>上传照片</p>
      </li>
    </ul>
  </div>
</template>

<script>import {Icon, ImageReader, Toast} from 'mand-mobile'
import imageProcessor from 'mand-mobile/components/image-reader/image-processor'

export default {
  name: 'image-reader-demo',
  /* DELETE */
  title: '图片选择并轴向修正，压缩处理',
  titleEnUS: 'Picture selection and axial correction, compression processing',
  describe: 'width: 200&nbsp;&nbsp;height: 200&nbsp;&nbsp;quality: 0.1',
  codeSandBox: 'https://codesandbox.io/s/xjq2ylrzyq',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
  },
  data() {
    return {
      imageList: {
        reader0: [
          '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
          '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
        ],
        reader1: [],
      },
    }
  },
  methods: {
    onReaderSelect() {
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, {dataUrl}) {
      const demoImageList = this.imageList[name] || []

      imageProcessor({
        dataUrl,
        width: 200,
        height: 200,
        quality: 0.1,
      }).then(({dataUrl}) => {
        dataUrl && demoImageList.push(dataUrl)
      })
      this.$set(this.imageList, name, demoImageList)

      Toast.hide()
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child-reader
  .image-reader-list
    float left
    width 100%
    .image-reader-item
      position relative
      float left
      width 23.5%
      padding-bottom 23.5%
      margin-bottom 2%
      margin-right 2%
      background color-bg-base
      box-sizing border-box
      list-style none
      border-radius radius-normal
      hairline(all, color-border-base)
      background-size cover
      &:nth-of-type(4n)
        margin-right 0
      &.add
        .md-icon
          position absolute
          top 40%
          left 50%
          transform translate(-50%, -50%)
          opacity .5
        p
          position absolute
          top 50%
          left 0
          width 100%
          margin-top 15px
          font-size font-minor-normal
          color color-text-disabled
          text-align center
      .image-reader-item-del
        position absolute
        top 5px
        right 5px
        z-index 3
        background #EEE
        border-radius radius-circle
</style>
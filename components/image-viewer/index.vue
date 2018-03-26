<template>
  <div class="md-image-viewer" v-show="isViewerShow" @click="$_viewerClick">
    <div class="viewer-container">
      <swiper 
        ref="swiper"
        :autoplay = "0" 
        :default-index="currentImgIndex" 
        :has-dots="false"
        :is-prevent="false"
        @after-change="$_afterChange"
        v-if="isViewerShow">
        <swiper-item class="viewer-item-wrap" :class="item.cls" :key="$index" v-for="(item, $index) in imgs">
          <div class="item">
              <img :src="item.url" :alt="item.alt" v-if="!!item.url" />
          </div>
        </swiper-item>
      </swiper>
      <div class="viewer-index" v-if="hasDots">{{ currentImgIndex + 1 }}/{{ list.length }}</div>
    </div>
  </div>
</template>

<script>import Swiper from '../swiper'
import SwiperItem from '../swiper/swiper-item'

export default {
  name: 'md-image-viewer',

  components: {
    Swiper,
    SwiperItem,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isViewerShow: false,
      innerList: [],
      imgs: [],
      currentImgIndex: 0,
    }
  },

  computed: {},

  watch: {
    show(val) {
      this.currentImgIndex = this.initialIndex
      this.isViewerShow = val
      this.$nextTick(() => {
        this.$_imgsInit()
      })
    },
    isViewerShow(val) {
      !val && this.$emit('update:show', val)
    },
  },

  mounted() {
    this.isViewerShow = this.show
  },
  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */

  methods: {
    // MARK: private methods
    $_imgsInit() {
      const _imgs = this.list
      const _newImgs = []
      _imgs.map(item => {
        let _item = typeof item === 'object' ? item : {url: item}
        _newImgs.push(_item)
      })
      this.imgs = _newImgs
    },
    $_afterChange(fromIndex, toIndex) {
      this.currentImgIndex = toIndex
    },

    // MARK: events handler, 如 $_onButtonClick
    $_viewerClick() {
      this.isViewerShow = false
    },

    // MARK: public methods
    publicMethod() {},
  },
}
</script>

<style lang="stylus">
.md-image-viewer
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 999
  transform translate3d(0,0,0)
  overflow hidden

  .viewer-index
    position absolute
    bottom 1rem
    left 0
    width 100%
    text-align center
    color #FFF
    font-size .32rem
    text-shadow 0 1px 1px #333
    z-index 101
  .viewer-container
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background-color rgba(0, 0, 0, 0.85)
    z-index 100
  .viewer-items
      list-style none
      position absolute
      left 0
      top 0
      height 100%
      width 100%
  .viewer-items .viewer-item-wrap
      position absolute
      top 0
      height 100%
      width 100%
  .viewer-item-wrap .item
      width 100%
      display inline-block
      position absolute
      top 50%
      transform translateY(-50%)
  .viewer-item-wrap .item>img
      width 100%
      display block
</style>

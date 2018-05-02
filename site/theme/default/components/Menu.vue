<template>
  <div class="mfe-blog-theme-default-menu" :class="{active: value}">
    <ul class="menu-list-0">
      <li class="menu-item-0" v-for="(item0, index0) in menu" :key="index0">
        <router-link 
          :to="`/${nav}/${item0.name}`"
          :class="{disabled: !item0.src && !item0.markdown}"
          v-html="item0.text">
        </router-link> 
        <ul class="menu-list-1" v-if="item0.menu">
          <li class="menu-item-1" v-for="(item1, index1) in item0.menu" :key="index1">
            <router-link 
              :to="`/${nav}/${item0.name}/${item1.name}`"
              :class="{disabled: !item1.src && !item1.markdown}"
              v-html="item1.text">
            </router-link> 
            <ul class="menu-list-2" v-if="item1.menu">
              <li class="menu-item-2" v-for="(item2, index2) in item1.menu" :key="index2">
                <router-link
                  :to="`/${nav}/${item0.name}/${item1.name}/${item2.name}`"
                  :class="{disabled: !item2.src && !item2.markdown}"
                  v-html="item2.text">
                </router-link> 
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {findMenu} from '../assets/js/util'

export default {
  name: 'mfe-blog-theme-default-menu',
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.$emit('input', val)
      }
    },
  },
  computed: {
    nav() {
      return this.$route.path.split('/')[1] || ''
    },
    menu() {
      return this.nav ? findMenu(window.mbConfig.source, this.nav) : []
    },
  },
  methods: {},
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-menu
  float left
  width 16.666%
  min-height 1500px
  height 100%
  // padding 32px 0
  box-sizing border-box
  border-right solid 1px #e8e8e8
  -webkit-font-smoothing antialiased
  background #FFF
  ul, li, a
    float left
    width 100%
    box-sizing border-box
  a
    position relative
    float left
    width 100%
    font-size 14px
    color #314659
    text-decoration none
    transition all .3s
    &.disabled
      color #999
      pointer-events none
      cursor text
      background #fff !important
      &:after
        display none !important
    &:after
      display none
      content ""
      position absolute
      right 0
      top 25%
      width 4px
      height 50%
      background #048EFA
    &.router-link-active
      color #048EFA
      span
        color #048EFA
      // background RGBA(252, 145, 83, .05)
      &:after
        display block
    span
      color #666
      font-size 12px

  li.menu-item-0 a
    padding 12px 0 12px 40px
  li.menu-item-1 a
    padding 12px 0 12px 50px
  li.menu-item-2 a
    padding 12px 0 12px 60px

@media (max-width: 1000px)
  .mfe-blog-theme-default-menu
    position fixed
    z-index 9999
    top 0
    bottom 0
    left 0
    right 0
    width 70%
    min-height auto !important
    margin-bottom .32rem
    transform translateX(-100%)
    overflow scroll
    transition transform .3s
    li.menu-item-0 a
      padding .1rem 10%
      &:after
        display none
    &.active
      transform translateX(0)
</style>

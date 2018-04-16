<template>
  <div class="mfe-blog-theme-default-home" style="max-width:100%;">
    <div class="home-box">
      <section
        v-for="(homeBlock, homeBlockIndex) in homeConfig"
        class="home-box-block"
        :class="`home-box-block-${homeBlockIndex}`"
        :key="homeBlockIndex"
      >
        <!-- 模块文案 -->
        <transition-group
          tag="div"
          class="home-text"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <!-- 模块标题 -->
          <h2
            class="home-title"
            data-index="1"
            :key="`home-box-block-${homeBlockIndex}-0`"
            v-show="blockShow[homeBlockIndex]"
          >
            <span v-text="homeBlock.title"></span>
          </h2>
          <!-- 模块描述 -->
          <p
            class="home-describe"
            data-index="2"
            :key="`home-box-block-${homeBlockIndex}-1`"
            v-show="blockShow[homeBlockIndex]"
            v-html="homeBlock.describe"
          ></p>
          <!-- 模块按钮 -->
          <div
            class="home-box-operators"
            v-if="homeBlock.buttons"
            v-show="blockShow[homeBlockIndex]"
            :key="`home-box-block-${homeBlockIndex}-2`"
          >
            <template
              v-for="(homeBlockButton, homeBlockButtonIndex) in homeBlock.buttons"
            >
              <router-link
                v-if="homeBlockButton.type === 'link'"
                class="home-button"
                :class="homeBlockButton.theme"
                :to="homeBlockButton.src"
                :data-index="3 + homeBlockButtonIndex"
                :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
              >
                {{ homeBlockButton.text }}
                <component v-if="homeBlockButton.slots" :is="homeBlockButton.slots" :ref="`block-button-link-slots-${homeBlockIndex}`"></component>
                <div v-else-if="homeBlockButton.htmls" v-html="homeBlockButton.htmls"></div>
              </router-link>
              <a
                v-else-if="homeBlockButton.type === 'handler'"
                href="javascript:void(0)"
                class="home-button"
                :class="homeBlockButton.theme"
                :data-index="3 + homeBlockButtonIndex"
                :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
                @click="handlerButtonClick(homeBlockButton.click, `block-button-handler-slots-${homeBlockIndex}`)"
              >
                {{ homeBlockButton.text }}
                <component v-if="homeBlockButton.slots" :is="homeBlockButton.slots" :ref="`block-button-handler-slots-${homeBlockIndex}`"></component>
                <div v-else-if="homeBlockButton.htmls" v-html="homeBlockButton.htmls"></div>
              </a>
              <div
                v-else
                class="home-button-other"
                :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
                :data-index="3 + homeBlockButtonIndex"
                v-html="homeBlockButton.htmls || ''"
                style="display:none"
                v-dynamic-show
              ></div>
            </template>
          </div>
        </transition-group>
        <!-- 模块配图 -->
        <div class="home-animation" v-if="homeBlock.animations">
          <template v-if="!Array.isArray(homeBlock.animations)">
            <div class="home-animation-bg">
              <img :src="homeBlock.animations.bg" alt="">
            </div>
            <div class="home-animation-content">
              <img :src="homeBlock.animations.content" alt="">
            </div>
          </template>
          <template v-else>
            <transition-group
              tag="ul"
              class="home-animation-list"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <li
                v-for="(homeBlockAnimationItem, homeBlockAnimationItemIndex) in homeBlock.animations"
                class="home-animation-item"
                :data-index="3 + homeBlockAnimationItemIndex"
                :key="`home-box-block-${homeBlockIndex}-animationItem-${homeBlockAnimationItemIndex}`"
                v-show="blockShow[homeBlockIndex]"
              >
                <em class="icon">
                  <img :src="homeBlockAnimationItem.icon" alt="">
                </em>
                <h2 class="title" v-html="homeBlockAnimationItem.title"></h2>
                <p class="describe" v-html="homeBlockAnimationItem.describe"></p>
              </li>
            </transition-group>
          </template>
        </div>
        <!-- 模块装饰元素 -->
        <div class="home-decorate" v-if="homeBlock.decorate">
          <img :src="homeBlock.decorate" alt="">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import MfeTable from './components/Table'
import homeConfig from './assets/js/home.config'
import { setTimeout } from 'timers';

export default {
  name: 'mfe-blog-theme-default-home',

  components: {
    MfeTable
  },

  data () {
    return {
      homeConfig,
      qrcodeTableShow: false,
      blockShow: []
    }
  },

  directives: {
    dynamicShow: {
      bind (el) {
        setTimeout(() => {
          el.style.display = 'block'
        }, 800)
      },
    }
  },

  mounted() {
    if ($(window).width() < 750) {
      homeConfig.forEach((item, index) => {
        this.$set(this.blockShow, index, true)
      })
    } else {
      this.scrollBlockView()
      $(window).bind('scroll', this.scrollBlockView)
    }
  },

  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.top = '30px'
    },
    enter (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(() => {
        $(el).animate({
          opacity: 1,
          top: '0'
        }, 300, done)
      }, delay)
    },
    leave (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(() => {
        $(el).animate({
          opacity: 1,
          top: '30'
        }, 300, done)
      }, delay)
    },
    scrollBlockView () {
      const bottomOffset = $(document).scrollTop() + $(window).height()
      $('.home-box-block').each((index, item) => {
        const hh = $(item).height()
        if (bottomOffset >= index * hh  + hh/2 + 100) {
          this.$set(this.blockShow, index, true)
        // } else {
        //   this.$set(this.blockShow, index, false)
        }
      })
    },
    handlerButtonClick (handler, ref) {
      handler.call(this, ref)
    }
  },
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-home
  .home-box
    display grid
    width 1280px
    margin 0 auto
    .home-box-block
      position relative
      height 720px
      .home-text, .home-animation, .home-animation-content, .home-decorate
        position absolute
      .home-text
        z-index 3
        width 440px
        h2.home-title
          position relative
          margin-bottom 26px
          font-size 48px
          color #333
          line-height 1
          // transition all .3s
          span
            position relative
            &:after
              content ""
              position absolute
              z-index -1
              left 0
              bottom 8px
              width 100%
              height 20px
              background #ECF6FF
        p.home-describe
          position relative
          font-size 18px
          color #666
          line-height 32px
          // transition transform .3s
        div.home-box-operators
          position relative
          margin-top 64px
          a.home-button
            position relative
            display inline-block
            width 140px
            height 45px
            margin-right 20px
            line-height 45px
            text-align center
            border-radius 28px
            text-decoration none
            font-size 18px
            box-shadow 0 0 10px #eee
            transition opacity .3s
            &:hover
              opacity .8
            &.start
              background-image linear-gradient(-90deg, #FFD653 0%, #FF8B48 100%)
              color #FFF
            &.demo
              background-color #ECF6FF
              color #048EFA
              box-shadow none
              img
                width 120px
                height 120px
                margin 20px 0
          div.home-button-other
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
      .home-animation-list
        margin-top 72px
        .home-animation-item
          position relative
          display inline-block
          width 30%
          height 440px
          margin 0 1.5%
          padding 34px
          box-shadow 0 20px 80px rgba(80,177,251,0.12)
          border-radius 16px
          box-sizing border-box
          .icon,.title, .describe
            float left
            width 100%
          .icon
            height 165px
            img
              position relative
              left 50%
              transform translateX(-50%)
          .title
            margin-top 66px
            font-size 24px
            color #333
            text-align center
          .describe
            margin-top 16px
            font-size 18px
            color #555
            text-align center
          a
            color #048efa
            text-decoration none
      &.home-box-block-0
        // height 700px
        .home-text
          left 0
          top 200px
          h2
            font-family DINAlternate-Bold
        .home-animation
          left 380px
          top -100px
        .home-animation-content
          left 220px
          top 247px
          img
            width 614px
            height 410px
      &.home-box-block-1
        // height 830px
        .home-text
          right 0
          top 300px
          h2
            font-family DINAlternate-Bold
        .home-animation
          right 600px
          top 0
        .home-animation-content
          right 0
          top 143px
          img
            width 544px
            height 503px
        .home-decorate
          right -400px
          top 500px
      &.home-box-block-2
        // height 700px
        .home-text, .home-animation
          width 100%
        .home-text
          top 0
          left 0
          text-align center
        .home-animation
          top 150px
          left 0
      &.home-box-block-3
        .home-text
          top 360px
          left 0
        .home-animation
          bottom 0
          left 640px
        .home-animation-content
          bottom 0
          left 0
          img
            width 536px
            height 381px
        .home-decorate
          top 0
          left -300px

@media (max-width: 1400px)
  .home-box
    width 1080px !important
@media (max-width: 1000px)
  .default-content
    .default-content-wrapper
      margin-top 0px
      .home-box
        width 100% !important
        padding 0 .32rem
        box-sizing border-box
@media (max-width: 750px)
  .home-box-block
    height auto !important
    margin-bottom 1rem
    .home-animation
      position static !important
      .home-animation-content
        position relative !important
        top 0 !important
        left 50% !important
        width 50%
        margin-left -25%
        margin-top .6rem
        img
          width 100% !important
          height auto !important
      .home-animation-bg
        display none
      .home-animation-list
        margin-top .6rem !important
      .home-animation-item
        height 3.4rem !important
        padding .2rem !important
        .icon
          height .64rem !important
          img
            height 100%
        .title
          margin-top .2rem !important
          font-size .24rem !important
        .describe
          font-size .2rem !important
    .home-text
      position relative !important
      width 100% !important
      text-align center
      top 0 !important
      left 0 !important
      .home-title
        font-size .32rem !important
      .home-describe
        font-size .24rem !important
      .home-box-operators
        margin-top .32rem !important
        .home-button
          font-size .28rem !important
      .home-button-other
        display none !important
</style>

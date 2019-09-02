<template>
  <div class="mfe-blog-theme-default-home" style="max-width:100%;">
    <div class="home-box">
      <section
        v-for="(homeBlock, homeBlockIndex) in homeData"
        class="home-box-block"
        :class="`home-box-block-${homeBlockIndex}`"
        :key="homeBlockIndex"
      >
        <!-- 模块配图 -->
        <div class="home-animation" v-if="homeBlock.animations">
          <template v-if="!Array.isArray(homeBlock.animations)">
            <div class="home-animation-bg">
              <img :src="homeBlock.animations.bg" alt="">
            </div>
            <div class="home-animation-content" v-if="homeBlock.animations.content">
              <component :is="homeBlock.animations.content"></component>
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
                <div class="text">
                  <h2 class="title" v-html="homeBlockAnimationItem.title"></h2>
                  <p class="describe" v-html="homeBlockAnimationItem.describe"></p>
                </div>
              </li>
            </transition-group>
          </template>
        </div>
        <!-- 模块装饰元素 -->
        <div class="home-decorate" v-if="homeBlock.decorate">
          <img :src="homeBlock.decorate" alt="">
        </div>
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
            <span v-html="homeBlock.title"></span>
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
              <!-- 跳转按钮 -->
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
              <!-- 动作按钮 -->
              <a
                v-else-if="homeBlockButton.type === 'handler'"
                href="javascript:void(0)"
                class="home-button"
                :class="homeBlockButton.theme"
                :data-index="3 + homeBlockButtonIndex"
                :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
                @click.stop="handlerButtonClick(homeBlockButton.click, `block-button-handler-slots-${homeBlockIndex}`)"
              >
                {{ homeBlockButton.text }}
                <component v-if="homeBlockButton.slots" :is="homeBlockButton.slots" :ref="`block-button-handler-slots-${homeBlockIndex}`"></component>
                <div v-else-if="homeBlockButton.htmls" v-html="homeBlockButton.htmls"></div>
              </a>
              <!-- 自定义按钮 -->
              <template v-else>
                <template v-if="homeBlockButton.htmls">
                  <div
                    class="home-button-other"
                    :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
                    :data-index="3 + homeBlockButtonIndex"
                    v-html="homeBlockButton.htmls"
                  ></div>
                </template>
                <template>
                  <div
                    class="home-button-other"
                    :key="`home-box-block-${homeBlockIndex}-button-${homeBlockButtonIndex}`"
                    :data-index="3 + homeBlockButtonIndex"
                  >
                    <component v-if="homeBlockButton.slots" :is="homeBlockButton.slots" :ref="`block-button-handler-slots-${homeBlockIndex}`"></component>  
                  </div>
                </template>
              </template>
            </template>
          </div>
          <!-- 模块其他 -->
          <div
            class="home-others"
            v-if="homeBlock.others"
            v-show="blockShow[homeBlockIndex]"
            :key="`home-others-${homeBlockIndex}-3`"
          >
            <template v-if="typeof homeBlock.others === 'string'">
              <div v-html="homeBlock.others"></div>
            </template>
            <template v-else>
              <component :is="homeBlock.others" :ref="`block-other-slots-${homeBlockIndex}`"></component>  
            </template>
          </div>
        </transition-group>
      </section>
    </div>
  </div>
</template>

<script>
import MfeTable from './components/Table'
import homeConfig from './assets/js/home.config'

export default {
  name: 'mfe-blog-theme-default-home',

  components: {
    MfeTable
  },

  data () {
    return {
      qrcodeTableShow: false,
      blockShow: [],
    }
  },

  mounted() {
    if ($(window).width() < 750) {
      this.homeData.forEach((item, index) => {
        this.$set(this.blockShow, index, true)
      })
    } else {
      this.scrollBlockView()
      this.container.bind('scroll', this.scrollBlockView)
    }
  },

  computed: {
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    homeData() {
      return homeConfig[this.lang]
    },
    container() {
      return $('#default-container')
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
      const scrollTop = this.container.scrollTop()
      const bottomOffset = scrollTop + this.container.height()
      $('.home-box-block').each((index, item) => {
        const hh = $(item).height()
        // const topPos = index < 1 ? 0 : (index - 1) * hh  + hh/2 + 100
        const bottomPos = index * hh  + hh/2 + 100
        if (bottomOffset >= bottomPos) {
          this.$set(this.blockShow, index, true)
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
    // display grid
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
        -webkit-font-smoothing initial
        h2.home-title
          position relative
          margin-bottom 26px
          font-size 48px
          color #333
          line-height 1
          // transition all .3s
          span
            position relative
            i
             font-style normal
             color #2f86f6
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
          max-width 750px
          margin 0 auto
          font-size 18px
          color #666
          line-height 32px
          // transition transform .3s
        div.home-box-operators
          clearfix()
          position relative
          margin-top 64px
          a.home-button
            position relative
            float left
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
              background-image linear-gradient(-90deg, #98c4fd 0%, #2f86f6 100%)
              color #FFF
            &.demo
              background-color #ECF6FF
              color #2F86F6
              box-shadow none
              img
                width 120px
                height 120px
                margin 20px 0
          div.home-button-other
            float left
          //   position absolute
          //   right 0
          //   top 50%
          //   transform translateY(-50%)
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
            color #2F86F6
            text-decoration none
      .home-others
        a
          float left
          color #2F86F6
          text-decoration none
          &:hover
            opacity 0.8
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
          left 221px
          top 247px
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
        .home-decorate
          top 0
          left -300px
.mfe-git-star-number
  font-family DINAlternate-Bold
  font-weight 400

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
  .mfe-blog-theme-default-home
  .home-box
    .home-box-block
      height auto !important
      margin-bottom 1rem
      .home-decorate
        display none 
      .home-animation
        position static !important
        .home-animation-content
          position relative !important
          top 0 !important
          left 50% !important
          width 50%
          margin-left -25%
          img
            width 100% !important
            height auto !important
        .home-animation-bg
          display none
        .home-animation-list
          margin-top 0 !important
        .home-animation-item
          width 100% !important
          height auto !important
          margin-bottom 12px !important
          padding 20px !important
          box-shadow none !important
          border-radius 8px !important
          background #f0f0f0
          clearfix()
          .icon
            float left
            width 64px !important
            height auto !important
            img
              width 100%
          .text
            padding-left 20px
            overflow hidden
          .title
            margin-top 0 !important
            font-size 16px !important
            text-align left !important
          .describe
            margin-top 10px !important
            font-size 14px !important
            text-align left !important
      .home-text
        position relative !important
        top 0 !important
        left 0 !important
        width 100% !important
        margin-top 20px
        text-align center
        .home-title
          margin-bottom 18px !important
          font-size 18px !important
        .home-describe
          font-size 14px !important
          line-height 28px !important
          text-align left
          text-indent 28px
        .home-box-operators
          display flex
          justify-content center
          margin-top 20px !important
          .home-button
            height 42px !important
            line-height 42px !important
            font-size 14px !important
            box-shadow none !important
            &:last-of-type
              margin 0 !important
      .home-others
        float left
        position relative
        left 50%
        transform translateX(-50%)
  .home-button-other, .mfe-git-star-number
    display none !important
</style>

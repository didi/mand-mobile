<template>
  <div class="mfe-blog-theme-default-home" style="max-width:100%;">
    <div class="home-box">
      <section class="home-box-block home-banner" v-if="bannerData">
        <div class="home-animation">
          <home-pictorial />
        </div>
        <div class="home-text">
          <img class="home-title" src="https://s3-gzpu.didistatic.com/common/mand-mobile/docs/MandMobile.svg" alt="Mand Mobile" />
          <p class="home-describe">{{bannerData.describe}}</p>
          <div
            class="home-box-operators"
            v-if="bannerData.buttons"
          >
            <template
              v-for="(bannerButton, bannerButtonIndex) in bannerData.buttons"
            >
              <!-- 跳转按钮 -->
              <router-link
                v-if="bannerButton.type === 'link'"
                class="home-button"
                :class="bannerButton.theme"
                :to="bannerButton.src"
                :key="`home-banner-button-${bannerButtonIndex}`"
              >
                {{ bannerButton.text }}
                <component v-if="bannerButton.slots" :is="bannerButton.slots" :ref="`banner-button-link-slots-${bannerButtonIndex}`"></component>
                <div v-else-if="bannerButton.htmls" v-html="bannerButton.htmls"></div>
              </router-link>
              <!-- 动作按钮 -->
              <a
                v-else-if="bannerButton.type === 'handler'"
                href="javascript:void(0)"
                class="home-button"
                :class="bannerButton.theme"
                :key="`home-banner-button-${bannerButtonIndex}`"
                @click.stop="handlerButtonClick(bannerButton.click, `banner-button-handler-slots-${bannerButtonIndex}`)"
              >
                {{ bannerButton.text }}
                <component v-if="bannerButton.slots" :is="bannerButton.slots" :ref="`banner-button-handler-slots-${bannerButtonIndex}`"></component>
                <div v-else-if="bannerButton.htmls" v-html="bannerButton.htmls"></div>
              </a>
              <!-- 自定义按钮 -->
              <template v-else>
                <template v-if="bannerButton.htmls">
                  <div
                    class="home-button-other"
                    :key="`home-banner-button-${bannerButtonIndex}`"
                    v-html="bannerButton.htmls"
                  ></div>
                </template>
                <template>
                  <div
                    class="home-button-other"
                    :key="`home-banner-button-${bannerButtonIndex}`"
                  >
                    <component v-if="bannerButton.slots" :is="bannerButton.slots" :ref="`banner-button-handler-slots-${bannerButtonIndex}`"></component>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </section>
      <section class="home-box-block home-characteristic">
        <characteristic-card
          class="home-characteristic-card"
          v-for="cardInfo in characteristicsData"
          :key="cardInfo.title"
          v-bind="cardInfo"
        />
      </section>
    </div>
  </div>
</template>

<script>
import CharacteristicCard from './components/home/CharacteristicCard'
import HomePictorial from './components/home/HomePictorial'
import homeConfig from './assets/js/home.config'

export default {
  name: 'mfe-blog-theme-default-home',

  components: {
    CharacteristicCard,
    HomePictorial
  },

  data () {
    return {
      qrcodeTableShow: false,
    }
  },

  computed: {
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    homeData() {
      return homeConfig[this.lang] || {}
    },
    bannerData() {
      return this.homeData.banner
    },
    characteristicsData() {
      return this.homeData.characteristics
    },
  },

  methods: {
    handlerButtonClick (handler, ref) {
      handler.call(this, ref)
    }
  },
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-home
  margin-top -100px
  min-height 1452px
  background url("https://pt-starimg.didistatic.com/static/starimg/img/5kSeyAsUki1643269441035.png") 0 0 / cover no-repeat

  .home-box
    // display grid
    width 1200px
    margin 0 auto

    .home-box-block
      position relative

      &.home-banner
        height 876px

      .home-text
        position absolute
        top 220px
        left 0
        width 520px

        .home-title
          width 501px

        .home-describe
          margin 50px 0
          line-height 35px
          font-size 18px
          opacity 0.8
          color #000

        .home-button
          position relative
          float left
          width 150px
          height 55px
          margin-right 25px
          line-height 55px
          text-align center
          border-radius 28px
          text-decoration none
          font-size 18px
          transition opacity .3s
          z-index 2

        .home-button.start
          background-color #1624FF
          color #FFF

          &:hover
            opacity 0.8

        .home-button.demo
          background: #FFFFFF
          border 1px solid rgba(22,36,255,0.07)

        .home-button.demo img
          width 120px
          height 120px
          margin 20px 0

      .home-animation
        position absolute
        top 70px
        right -62px

      &.home-characteristic
        display flex
        flex-wrap wrap
        justify-content space-between

        .home-characteristic-card
          margin-bottom 30px


@media (max-width: 1440px)
  .mfe-blog-theme-default-home
    .home-box
      width 1000px

      .home-box-block
        .home-text
          width 450px

          .home-title
            width 450px

@media (max-width: 750px)
  // default root font size in mobile device
  html
    font-size 50px

  .mfe-blog-theme-default-home
    margin-top 0
    padding 0 .4rem
    min-height auto
  .home-box
    overflow hidden
    width 100% !important
    .home-box-block
      height auto !important
      margin-bottom 1rem

      .home-animation
        position static !important
        margin-top 1.4rem

      .home-text
        position relative !important
        top 0 !important
        left 0 !important
        width 100% !important
        margin-top .4rem
        text-align center
        .home-title
          width 4.28rem !important
        .home-describe
          margin .54rem 0 !important
          font-size .28rem !important
          line-height 26px !important
          text-align center
        .home-box-operators
          display flex
          justify-content center
          margin-top 20px !important
          .home-button
            width 2.16rem !important
            height .8rem !important
            line-height .8rem !important
            font-size .28rem !important
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

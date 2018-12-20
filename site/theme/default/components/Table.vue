<template>
  <transition name="slide-fade">
    <div class="default-table" v-show="tableShow">
      <template v-if="data.length">
        <div class="table-list">
          <div class="table-item" v-for="(item, index) in list" :key="index">
            <template>
              <a @click="jump(item)">
                <h2 v-html="item.title"></h2>
                <p v-html="item.name" ></p>
              </a>
            </template>
          </div>
        </div>
        <template v-if="$slots.footer">
          <slot name="footer"></slot>
        </template>
      </template>
      <template v-else-if="$slots.default">
        <slot></slot>
      </template>
      <template v-else>
        <div class="table-empty">
          <img src="//manhattan.didistatic.com/static/manhattan/mfd/result-page/empty" alt="">
          <p>无匹配结果</p>
        </div>
        <slot name="footer"></slot>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mfe-blog-theme-default-table',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableShow: false
    }
  },
  watch: {
    value (val) {
      this.tableShow = val
    },
    tableShow (val) {
      if (val) {
        $(document).bind('click', this.maskHandler)
      } else {
        $(document).unbind('click', this.maskHandler)
        this.$emit('input', val)
      }
    },
  },
  computed: {
    list () {
      return this.data.map(item => {
        return {
          title: `${item.text}${item.title ? ` > ${item._highlightResult.title.value}` : ''}`,
          name: item.content,
          path: item.path,
          hash: item.title
        }
      })
    }
  },
  methods: {
    maskHandler () {
      this.tableShow = false
    },
    jump (item) {
      if (/[a-zA-z]+:\/\/[^\s]*/.test(item.path)) {
        location.href = item.path
      } else {
        this.$router.push({
          path: `${item.path}?anchor=${item.hash || ''}`,
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.default-table
  position absolute
  z-index 2
  left 0
  top 0
  width 500px
  padding 0 15px
  box-shadow 0 2px 10px rgba(0, 0, 0, .08)
  box-sizing border-box
  background-color #fff
  // border solid 1px #f0f0f0
  border-radius 8px
  overflow-y auto
  .table-empty
    position relative
    float left
    left 50%
    width 150px
    margin 20px 0
    transform translateX(-50%)
    img
      float left
      width 60px
      filter grayscale(100%)
      opacity .5
    p
      float right
      line-height 70px
  .table-list
    max-height 320px
    overflow auto
    .table-item
      a
        display block
        padding 5px 0
        border-bottom solid 1px #f0f0f0
        text-decoration none
        cursor pointer
        h2
          margin-top 5px
          font-size 12px
          font-weight 500
          color #314659
          span
            color #999
            font-size 12px
        p
          margin-top 5px
          font-size 14px
          color #999
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      &:last-of-type a
        border none

.slide-fade-enter-active
  transition all .3s ease
.slide-fade-leave-active
  transition all .3s ease
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */
  transform translateY(-10px)
  opacity 0
</style>


<style lang="stylus">
.default-table
  .table-item
    a
      em
        color #2F86F6
        font-style normal
</style>

<template>
  <div class="mfe-git-contributors" v-if="contributors && contributors.length">
    <a v-for="item in contributors"
      class="contributor-item"
      target="_blank"
      :href="item.html_url"
      :key="item.id"
    >
      <img :src="item.avatar_url" alt="" v-tooltip="{content: `${item.login}`, offset: 5}">>
    </a>
  </div>
</template>

<script>
export default {
  simple: true,
  data () {
    return {
      contributors: [],
      tmp: Date.now()
    }
  },
  watch: {
    '$route' (val) {
      this.tmp = Date.now()
    }
  },
  mounted () {
    setTimeout(() => {
      this.getContributors()
    }, 500)
  },
  methods: {
    getContributors () {
      const contributors = window.sessionStorage['MAND_MOBILE_CONTRIBUTORS']

      if (contributors) {
        try {
          this.contributors = JSON.parse(contributors)
        } catch (error) {}
        return
      }
      $.get('https://api.github.com/repos/didi/mand-mobile/contributors', data => {
        if (data) {
          this.contributors = data
          window.sessionStorage['MAND_MOBILE_CONTRIBUTORS'] = JSON.stringify(data)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.mfe-git-contributors
  .contributor-item
    display inline-block
    width 30px
    height 30px
    margin 5px
    border-radius 50%
    overflow hidden
    img
      // display flex
      width 100%
      border-radius 50%
    &:hover
      box-shadow 0 0 20px #2f86f6
      transition all .3s
</style>

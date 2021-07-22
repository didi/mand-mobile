<template>
  <div class="md-scroll-view-more">
    <template v-if="!isFinished">
      {{ loadingText }}
    </template>
    <template v-else>
      {{ finishedText }}
    </template>
  </div>
</template>

<script>import {t} from '../_locale'

export default {
  name: 'md-scroll-view-more',
  props: {
    loadingText: {
      type: String,
      default: t('md.scroll_view.more.loading'),
    },
    finishedText: {
      type: String,
      default: t('md.scroll_view.more.allLoaded'),
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.md-scroll-view-more
  padding v-gap-lg 0
  font-size font-minor-large
  text-align center
  color color-text-caption
</style>

<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-1">
    <md-notice-bar
      mode="closable"
      icon="right"
      :scrollable="true"
    >
      {{ text }}
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '滚动播放',
  titleEnUS: 'With icon',
  codeSandBox: 'https://codesandbox.io/s/53zlz1nj24',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
  /* DELETE */
  data() {
    return {
      text: '就是想证明这是一段很长的文字',
    }
  },
  /* DELETE */
  mounted() {
    setTimeout(() => {
      this.text = '就是想证明这是一段很长的文字，是一段萌萌哒的文字，你看还会滚动呢～'
    }, 4000)
  },
}
</script>

<template>
  <div class="mfe-blog-theme-default-doc-container">
    <mb-docer
      :info="info"
      :body="body"
      :toc="toc"
      :demos="demos"
    />
  </div>
</template>
<script>
import Docer from '@theme/default/components/Doc'
import {info, body, toc} from './index.data'
import {demos} from './index.demo'

export default {
  name: 'mfe-blog-theme-default-doc-container',
  data () {
    return {
      info,
      body,
      toc,
      demos,
    }
  },
  components: {
    MbDocer: Docer,
  }
}
</script>

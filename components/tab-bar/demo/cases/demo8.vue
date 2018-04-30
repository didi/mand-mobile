<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-8">
    <md-tab-bar
      :show-ink-bar="true"
      :titles="titles">
      <div slot="title"
        slot-scope="props">
        <md-icon name="hollow-plus" size="sm"></md-icon>
        {{props.prefix}}{{props.title}}
      </div>
    </md-tab-bar>
  </div>
</template>

<script>
import {TabBar, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: 'scope-slot',
  /* DELETE */
  data() {
    return {
      titles: [
        {
          title: '第1',
          prefix: '我',
        },
        {
          title: '第2',
          prefix: '你',
        },
        {
          title: '第3',
          prefix: '他',
        },
      ],
    }
  },
  components: {
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
  },
}

</script>
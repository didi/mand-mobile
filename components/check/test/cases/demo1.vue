<template>
  <div class="md-example-child md-example-child-check md-example-child-check-1">
    <md-check-group v-model="favorites">
      <md-check name="watermelon" label="西瓜" />
      <md-check name="apple" label="苹果" />
      <md-check name="banana" label="香蕉" />
      <md-check name="orange" label="橙子" />
      <md-check name="tomato" label="西红柿" disabled />
    </md-check-group>
	</div>
</template>

<script>import {Check, CheckGroup} from 'mand-mobile'

export default {
  name: 'check-demo',
  title: '复选项组',
  components: {
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
  },
  data() {
    return {
      favorites: ['apple'],
    }
  },
}
</script>

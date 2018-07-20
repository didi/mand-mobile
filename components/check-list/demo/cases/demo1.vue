<template>
  <div class="md-example-child md-example-child-single-component">
    <md-check-list
      title="至多选3个"
      v-model="checked"
      :options="options"
      :max="3"
      iconPosition="left"
      icon="circle-right"
      iconInverse="circle"
      iconSize="md"
    >
      <div slot="content" slot-scope="{ option }">
        <p v-text="option.label"></p>
        <p class="muted" v-text="option.desc"></p>
      </div>
    </md-check-list>
	</div>
</template>

<script>import {CheckList} from 'mand-mobile'

export default {
  name: 'checkbox-demo',
  title: '自定义内容模板',
  components: {
    [CheckList.name]: CheckList,
  },
  data() {
    return {
      checked: [],
      options: [
        {value: '1', label: '选项一', desc: '描述文字字段可根据具体场景更改', disabled: false},
        {value: '2', label: '选项二', desc: '描述文字字段可根据具体场景更改', disabled: false},
        {value: '3', label: '选项三', desc: '描述文字字段可根据具体场景更改', disabled: false},
        {value: '4', label: '选项四', desc: '描述文字字段可根据具体场景更改', disabled: true},
        {value: '5', label: '选项五', desc: '描述文字字段可根据具体场景更改', disabled: false},
        {value: '6', label: '选项六', desc: '描述文字字段可根据具体场景更改', disabled: false},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.muted
  color #888
  font-size 80%
</style>

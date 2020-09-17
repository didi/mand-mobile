<template>
  <div class="md-example-child md-example-child-textarea md-example-child-textarea-0">
    <md-field>
      <md-textarea-item
        ref="demo0"
        title="普通"
        autosize
        class="example"
        v-model="value"
        placeholder="普通文本域"
      />
      <md-textarea-item
        ref="demo0"
        title="自动适应"
        class="example"
        :autosize="true"
        v-model="value2"
        :rows="1"
        placeholder="最大高度150px"
        :max-height="150"
      />
      <md-textarea-item
        ref="demo0"
        title="删除图标"
        class="example"
        :autosize="true"
        clearable
        :rows="1"
        placeholder="输入出现删除图标"
        :max-height="150"
      />
      <md-textarea-item
        ref="demo0"
        title="禁用"
        class="example"
        :autosize="true"
        value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        disabled
      />
      <md-textarea-item
        ref="demo0"
        title="只读"
        class="example"
        :autosize="true"
        value="只读文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        readonly
      />
      <md-textarea-item
        ref="demo0"
        title="格式化"
        autosize
        class="example"
        v-model="value3"
        :formation="format"
        placeholder="去掉所有数字"
      />
    </md-field>
  </div>
</template>

<script>import {TextareaItem, Field} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '普通文本域',
  /* DELETE */
  data() {
    return {
      value: '',
      value2: '',
      value3: '',
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
  mounted() {
    setTimeout(() => {
      this.value2 = '异步数据, 高度适应,异步数据, 高度适应,异步数据, 高度适应,异步数据, 高度适应,异步数据, 高度适应,异步数据, 高度适应'
    }, 1000)
  },
  methods: {
    format(name, curValue, curPos) {
      return {
        value: curValue.replace(/\d/g, ''),
        range: curPos,
      }
    },
  },
}
</script>

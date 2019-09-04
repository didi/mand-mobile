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
        v-model="value"
        :autosize="true"
        :rows="1"
        placeholder="最大高度100px 超过出现滚动条"
        :max-height="100"
      />
      <md-textarea-item
        ref="demo0"
        title="禁用"
        class="example"
        :autosize="true"
        value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="100"
        disabled
      />
      <md-textarea-item
        ref="demo0"
        title="只读"
        class="example"
        :autosize="true"
        value="只读文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="100"
        readonly
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
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
}
</script>

<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-field title="地址">
      <md-field-item
        :title="addressStr"
        arrow="arrow-right"
        @click="show = !show"
      />
    </md-field>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      v-model="show"
      :data="data"
      @change="handleChange"
    />
  </div>
</template>

<script>import {Field, FieldItem, TabPicker} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [TabPicker.name]: TabPicker,
  },
  data() {
    return {
      show: false,
      address: [],
      data: {
        name: 'province',
        label: '省',
        options: [
          {
            value: 'pk',
            label: '北京',
            children: {
              name: 'block',
              label: '区',
              options: [
                {
                  value: 'hd',
                  label: '海淀',
                },
                {
                  value: 'cp',
                  label: '昌平',
                },
                {
                  value: 'cy',
                  label: '朝阳',
                },
              ],
            },
          },
          {
            value: 'sx',
            label: '四川',
            children: {
              name: 'city',
              label: '市',
              options: [
                {
                  value: 'cd',
                  label: '成都市',
                  children: {
                    name: 'block',
                    label: '区',
                    options: [
                      {
                        value: 'gx',
                        label: '高新区',
                      },
                      {
                        value: 'qy',
                        label: '青羊区',
                      },
                    ],
                  },
                },
                {
                  value: 'my',
                  label: '绵阳市',
                  children: {
                    name: 'block',
                    label: '区',
                    options: [
                      {
                        value: 'jn',
                        label: '金牛区',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }
  },
  computed: {
    addressStr() {
      return this.address.map(item => item.label).join(' ') || '请选择联系地址'
    },
  },
  methods: {
    handleChange(data) {
      this.address = data
    },
  },
}
</script>

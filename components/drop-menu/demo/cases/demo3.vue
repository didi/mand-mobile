<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-3">
    <md-drop-menu
      ref="dropMenu3"
      :data="data"
    >
      <template slot-scope="{ option }">
        <div class="md-drop-menu-custom-title" v-text="option.text"></div>
        <div class="md-drop-menu-custom-brief">{{ option.text }}【可使用slot-scope进行自定义描述】</div>
      </template>
    </md-drop-menu>
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu, Dialog} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  title: '自定义菜单项',
  height: 250,
  components: {
    [DropMenu.name]: DropMenu,
  },
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '一级选项1',
          options: [
            {
              text: '二级选项1',
            },
            {
              text: '二级选项2',
            },
          ],
        },
      ],
    }
  },
  methods: {
    getSelectedValue(selector, index) {
      const value = this.$refs[selector].getSelectedValue(index)
      Dialog.alert({
        content: `<pre>${JSON.stringify(value)}</pre>`,
      })
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-drop-menu-3
  .md-drop-menu-custom-title
    font-size 28px
  .md-drop-menu-custom-brief
    font-size 20px
    color #999
</style>
<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
    <md-drop-menu
      ref="dropMenu0"
      :data="data"
    ></md-drop-menu>
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu, Dialog} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '基础下拉菜单 <a href="javascript:DropMenuTrigger()">getSelectedValue(0)</a>',
  codeSandBox: 'https://codesandbox.io/s/231x45w8mj',
  height: 250,
  /* DELETE */
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
  mounted() {
    window.DropMenuTrigger = () => {
      this.getSelectedValue('dropMenu0', 0)
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
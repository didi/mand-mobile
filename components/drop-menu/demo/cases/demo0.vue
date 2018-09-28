<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
    <md-drop-menu :data="data" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '基础下拉菜单',
  titleEnUS: 'Basic drop-down menu',
  codeSandBox: 'https://codesandbox.io/s/231x45w8mj',
  height: 250,
  /* DELETE */
  components: {
    [DropMenu.name]: DropMenu,
  },
  data() {
    return {
      data: [
        {
          text: '一级选项1',
          options: [
            {
              value: '0',
              text: '二级选项1',
            },
            {
              value: '1',
              text: '二级选项2',
            },
          ],
        },
      ],
    }
  },
}
</script>

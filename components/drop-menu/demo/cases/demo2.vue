<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-2">
    <md-drop-menu
      ref="dropMenu1"
      :data="data"
      :default-value="['1.8L', '自动挡']"
    ></md-drop-menu>
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '禁用下拉菜单',
  titleEnUS: 'Drop-down menu with disabled item',
  codeSandBox: 'https://codesandbox.io/s/o546n0912q',
  height: 500,
  /* DELETE */
  components: {
    [DropMenu.name]: DropMenu,
  },
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '排量',
          options: [
            {
              value: '0',
              text: '1.6L',
            },
            {
              value: '1',
              text: '1.8L',
            },
            {
              value: '2',
              text: '2.0L',
              disabled: true,
            },
            {
              value: '3',
              text: '1.2T',
            },
            {
              value: '4',
              text: '1.4T',
            },
            {
              value: '5',
              text: '1.6T',
            },
          ],
        },
        {
          text: '变速箱',
          disabled: true,
        },
      ],
    }
  },
}
</script>

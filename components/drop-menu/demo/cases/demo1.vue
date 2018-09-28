<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-1">
    <md-drop-menu :data="data" :default-value="['1', '8']" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '初始下拉菜单',
  titleEnUS: 'Drop-down menu with initial selection',
  codeSandBox: 'https://codesandbox.io/s/m3llp95x7x',
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
          options: [
            {
              value: '7',
              text: '手动挡',
            },
            {
              value: '8',
              text: '自动挡',
            },
            {
              value: '9',
              text: '手自一体',
            },
          ],
        },
      ],
    }
  },
}
</script>

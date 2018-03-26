<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-1">
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
  title: '初始下拉菜单',
  height: 500,
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
              text: '1.6L',
            },
            {
              text: '1.8L',
            },
            {
              text: '2.0L',
            },
            {
              text: '1.2T',
            },
            {
              text: '1.4T',
            },
            {
              text: '1.6T',
            },
          ],
        },
        {
          text: '变速箱',
          options: [
            {
              text: '手动挡',
            },
            {
              text: '自动挡',
            },
            {
              text: '手自一体',
            },
          ],
        },
      ],
    }
  },
}
</script>
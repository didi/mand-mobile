<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-0">
    <div
      class="md-example-item"
      v-for="icon in iconList"
      :key="icon"
    >
      <md-icon
        :name="icon.split('/')[0]"
        size="lg"
      ></md-icon>
      <p>{{ icon }}</p>
    </div>
    <div class="md-example-item">
      <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <p>spinner</p>
    </div>
  </div>
</template>

<script>import {Icon} from 'mand-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '图标',
  codeSandBox: 'https://codesandbox.io/s/84x92qw2rl',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      iconList: [
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'invisible',
        'visible',
        'service',
        'setting',
        'close',
        'refresh',
        'edit',
        'sort',
        'info',
        'question',
        'security',
        'rmb',
        'check',
        'checked/success',
        'clear/fail',
        'warn',
        'scan',
        'share',
        'back',
        'card-bag',
        'message',
        'order',
        'balance',
        'coupon',
        'address-book',
        'mobile-phone',
        'calendar',
        'home',
        'discovery',
        'switch',
        'time',
        'search',
        'user',
        'camera',
        'clock',
        'delete',
        'profession',
        'id-card',
        'authentication',
        'location',
        'filter',
        'motor-vehicle',
        'phone',
        'volumn',
      ],
    }
  },
}
</script>

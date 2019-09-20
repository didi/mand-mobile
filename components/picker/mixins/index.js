import popupMixin from '../../popup/mixins'
import popupTitleBarMixin from '../../popup/mixins/title-bar'

export default {
  mixins: [popupMixin, popupTitleBarMixin],
  props: {
    isView: {
      type: Boolean,
      default: false,
    },
    okText: {
      default: '确认',
    },
    cancelText: {
      default: '取消',
    },
    lineHeight: {
      type: Number,
    },
    keepIndex: {
      type: Boolean,
      default: false,
    },
  },
}

import {t} from '../../_locale'
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
      default: t('md.picker.confirm'),
    },
    cancelText: {
      default: t('md.picker.cancel'),
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

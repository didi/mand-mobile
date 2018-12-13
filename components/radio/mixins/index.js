export default {
  props: {
    icon: {
      type: String,
      default: 'checked',
    },
    iconInverse: {
      type: String,
      default: 'check',
    },
    iconDisabled: {
      type: String,
      default: 'check-disabled',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: String,
      default: 'md',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
  },
}

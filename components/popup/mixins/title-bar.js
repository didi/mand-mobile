export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: 'center',
    },
    largeRadius: {
      type: Boolean,
      default: false,
    },
    onlyClose: {
      type: Boolean,
      default: false,
    },
  },
}

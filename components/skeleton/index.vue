<script lang="babel">
const DEFUALT_TITLE_WIDTH = '40%'
const DEFUALT_WIDTH = '100%'

export default {
  name: 'md-skeleton',

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Number,
      default: 3,
    },
    title: {
      type: Boolean,
      default: false,
    },
    titleWidth: {
      type: [Number, String],
      default: DEFUALT_TITLE_WIDTH,
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFUALT_WIDTH,
    },
    avatarSize: {
      type: String,
      default: 'md',
    },
  },
  render() {
    const isNumber = n => {
      return typeof n === 'number'
    }

    const {loading, title, row, titleWidth, avatar, rowWidth, avatarSize} = this.$props

    const skeletonAvatar = () => {
      if (avatar) {
        return (
          <div
            class={{
              'md-skeleton-avatar': true,
              'md-skeleton-avatar-large': avatarSize === 'lg',
              'md-skeleton-avatar-small': avatarSize === 'sm',
            }}
          />
        )
      }
    }

    const skeletonTitle = () => {
      if (title) {
        const getTitleWidth = () => {
          if (titleWidth) {
            return isNumber(titleWidth) ? `${titleWidth}%` : titleWidth
          }
          return DEFUALT_TITLE_WIDTH
        }
        return <h4 class="md-skeleton-title" style={{width: getTitleWidth()}} />
      }
    }

    const skeletonRows = () => {
      const getRowWidth = index => {
        if (rowWidth && Array.isArray(rowWidth)) {
          return isNumber(rowWidth[index]) ? `${rowWidth[index]}%` : rowWidth[index]
        } else if (rowWidth) {
          return isNumber(rowWidth) ? `${rowWidth}%` : rowWidth
        }
        return DEFUALT_WIDTH
      }
      const rows = []
      for (let i = 0; i < row; i++) {
        rows.push(
          <div
            class="md-skeleton-row"
            style={{width: i === row - 1 ? `${100 - parseInt(DEFUALT_TITLE_WIDTH, 10)}%` : getRowWidth(i)}}
          />,
        )
      }
      return rows
    }

    if (!loading) {
      // the child component must have only one root wrapper
      return this.$slots.default && this.$slots.default[0]
    }
    return (
      <div class="md-skeleton">
        {skeletonAvatar()}
        <div class="md-skeleton-content">
          {skeletonTitle()}
          {skeletonRows()}
        </div>
      </div>
    )
  },
}

</script>

<style lang="stylus">
placeHolder()
  animation-duration 2s
  animation-fill-mode forwards
  animation-iteration-count infinite
  animation-name placeHolderShimmer
  animation-timing-function linear
  background linear-gradient(to right, #F3F3F6 8%, #F8FAFF 18%, #F3F3F6 33%)
  background-size 1000px 104px

.md-skeleton
  box-sizing border-box
  display flex
  .md-skeleton-avatar
    width 80px
    height 80px
    margin-right 32px
    border-radius 50%
    placeHolder()
    &.md-skeleton-avatar-large
      width 96px
      height 96px
    &.md-skeleton-avatar-small
      width 64px
      height 64px
  .md-skeleton-content
    flex 1
  .md-skeleton-title, .md-skeleton-row
    box-sizing border-box
    height 32px
    margin-bottom 24px
    border 0
    border-radius 0
    placeHolder()
    &:last-child
      margin-bottom 0

@keyframes placeHolderShimmer
  0%
    background-position -468px 0
  100%
    background-position 468px 0
</style>

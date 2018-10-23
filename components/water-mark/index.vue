<template>
  <div class="md-water-mark">
    <div class="water-mark-container">
      <slot></slot>
    </div>
    <div class="water-mark-list"
      v-if="!!$scopedSlots.watermark || content"
      :style="{
        opacity,
        transform: `rotate(${rotate}deg)`
      }"
    >
      <ul
        v-for="i in (repeatY ? 50 : 1)"
        class="water-mark-line"
        :style="{
          marginBottom: spacing,
        }"
        :key="`line-${i}`"
      >
        <li
          v-for="j in (repeatX ? 50 : 1)"
          class="water-mark-item"
          :style="i % 2 === 0 ? {
            marginLeft: repeatX ? spacing : 0,
          } : {
            marginRight: repeatX ? spacing : 0,
          }"
          :key="`item-${j}`"
        >
          <p v-if="content">{{ content }}</p>
          <slot
            v-else-if="!!$scopedSlots.watermark"
            name="watermark"
            :coord="{row: i, col: j}"
          ></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-water-mark',

  props: {
    content: {
      type: String,
      default: '',
    },
    spacing: {
      type: [String, Number],
      default: '20vw',
    },
    repeatX: {
      type: Boolean,
      default: true,
    },
    repeatY: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: [String, Number],
      default: -30,
    },
    opacity: {
      type: [String, Number],
      default: 0.1,
    },
  },
}
</script>

<style lang="stylus">
.md-water-mark
  position relative
  overflow hidden

.water-mark-container
  position relative
  z-index 2

.water-mark-list
  clearfix()
  absolute-pos()
  position absolute
  filter grayscale(100%)
  display flex
  flex-direction column
  justify-content center

.water-mark-line
  position relative
  left 50%
  float left
  width 10000%
  display flex
  justify-content center
  transform translateX(-50%)

.water-mark-item
  float left
  font-size font-body-large
  color color-text-caption
</style>

<script>export default {
  name: 'md-transition',

  functional: true,

  render(h, context) {
    return h('transition', context.data, context.children)
  },
}
</script>

<style lang="stylus">
.md-bounce
  &-enter-active
    animation bounce-in 300ms linear
  &-leave-active
    animation zoom-out 250ms linear

.md-zoom
  &-enter, &-leave-to
    opacity 0.01
    transform scale(0.75)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-punch
  &-enter, &-leave-to
    opacity 0.01
    transform scale(1.35)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-slide-up
  &-enter, &-leave-to
    transform translate3d(0, 100%, 0)
  &-enter-active
    transition transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1)
  &-leave-active
    transition transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1)

.md-slide-right
  &-enter, &-leave-to
    transform translate3d(-100%, 0, 0)
  &-enter-active
    transition transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1)
  &-leave-active
    transition transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1)

.md-slide-left
  &-enter, &-leave-to
    transform translate3d(100%, 0, 0)
  &-enter-active
    transition transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1)
  &-leave-active
    transition transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1)

.md-slide-down
  &-enter, &-leave-to
    transform translate3d(0, -100%, 0)
  &-enter-active
    transition transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1)
  &-leave-active
    transition transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1)

.md-fade
  &-enter, &-leave-to
    opacity 0.01
  &-enter-active
    transition opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition opacity 250ms linear

.md-fade-up
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(0, 20%, 0)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-fade-down
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(0, -20%, 0)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-fade-right
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(-20%, 0, 0)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-fade-left
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(20%, 0, 0)
  &-enter-active
    transition all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition all 250ms linear

.md-fly
  &-enter-active
    animation fly-in 600ms
    animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    animation zoom-out 250ms

@keyframes fly-in
  0%
    opacity 0.5
    transform scale(0.5) translate3d(0, 50px, 0)
  45%
    opacity 1
    transform scale(1.05) translate3d(0, -50px, 0)
  100%
    transform scale(1) translate3d(0, 0, 0)

@keyframes bounce-in
  0%
    transform scale(0.5)
  45%
    transform scale(1.05)
  80%
    transform scale(0.95)
  100%
    transform scale(1)

@keyframes zoom-out
  to
    opacity 0.01
    transform scale(0.75)
</style>

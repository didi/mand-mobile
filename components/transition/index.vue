<template functional>
  <transition v-bind="data.attrs" v-on="listeners">
    <slot></slot>
  </transition>
</template>

<script>export default {
  name: 'md-transition',
}
</script>

<style lang="stylus">
.md-zoom
  &-enter-active
    animation zoom-in 300ms
  &-leave-active
    animation zoom-out 200ms

.md-punch
  &-enter-active
    animation punch-in 300ms
  &-leave-active
    animation punch-out 200ms

.md-bounce
  &-enter-active
    animation bounce-in 300ms
  &-leave-active
    animation zoom-out 200ms

.md-slide-up
  &-enter, &-leave-to
    transform translate3d(0, 100%, 0)
  &-enter-active
    transition transform 300ms
  &-leave-active
    transition transform 200ms

.md-slide-right
  &-enter, &-leave-to
    transform translate3d(-100%, 0, 0)
  &-enter-active
    transition transform 300ms
  &-leave-active
    transition transform 200ms

.md-slide-left
  &-enter, &-leave-to
    transform translate3d(100%, 0, 0)
  &-enter-active
    transition transform 300ms
  &-leave-active
    transition transform 200ms

.md-slide-down
  &-enter, &-leave-to
    transform translate3d(0, -100%, 0)
  &-enter-active
    transition transform 300ms
  &-leave-active
    transition transform 200ms

.md-fade
  &-enter, &-leave-to
    opacity 0.01
  &-enter-active
    transition opacity 300ms
  &-leave-active
    transition opacity 200ms

.md-fade-up
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(0, 20%, 0)
  &-enter-active
    transition all 300ms
  &-leave-active
    transition all 200ms

.md-fade-down
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(0, -20%, 0)
  &-enter-active
    transition all 300ms
  &-leave-active
    transition all 200ms

.md-fade-right
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(-20%, 0, 0)
  &-enter-active
    transition all 300ms
  &-leave-active
    transition all 200ms

.md-fade-left
  &-enter, &-leave-to
    opacity 0.01
    transform translate3d(20%, 0, 0)
  &-enter-active
    transition all 300ms
  &-leave-active
    transition all 200ms

@keyframes zoom-in
  from
    opacity 0.01
    transform scale(0.75)

@keyframes zoom-out
  to
    opacity 0.01
    transform scale(0.75)

@keyframes punch-in
  from
    opacity 0.01
    transform scale(1.35)

@keyframes punch-out
  to
    opacity 0.01
    transform scale(1.35)

@keyframes bounce-in
  0%
    transform scale(0.5)
  45%
    transform scale(1.05)
  80%
    transform scale(0.95)
  100%
    transform scale(1)

</style>

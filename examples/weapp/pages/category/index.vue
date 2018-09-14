<template>
  <div class="md-cg">
    <div
      v-for="(category, i) in categoryData" :key="i"
      class="cg-category"
      :class="{'active': category.show}">
      <div
        class="cg-category-title"
        :class="{'active': category.show}"
      >
        {{ category.name }}&nbsp;&nbsp;<span>{{ category.text }}</span>
      </div>
      <div class="cg-category-list">
        <div
          class="cg-category-item"
          v-for="(item, j) in category.list"
          :key="j"
          @click="goToComponent(item.path)"
        >
          <div class="cg-category-item-inner">
            {{ item.name }} - {{ item.text }}
          </div>
        </div>
        <!-- <div class="cg-category-item" @click="toggleCategory(i, category)">
          <div class="cg-category-item-inner close">收起</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import components from '../../../components.json'

export default {
  data () {
    return {
      categoryData: components
    }
  },
  mounted () {
  },
  methods: {
    goToComponent (name) {
      wx.navigateTo({ url: `..${name}/demo/page` })
    }
  }
}
</script>

<style lang="stylus">

</style>

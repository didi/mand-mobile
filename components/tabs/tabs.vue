<script>import TabBar from '../tab-bar'
import TabPane from './tab-pane'
export default {
  name: 'md-tabs',

  components: {
    [TabBar.name]: TabBar,
    [TabPane.name]: TabPane,
  },

  props: {
    value: String,
    transition: {
      type: String,
      default: 'md-tab-slide',
    },
    hasInk: {
      type: Boolean,
      default: true,
    },
    inkLength: {
      type: Number,
      default: 80,
    },
    maxLength: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      currentName: this.value,
    }
  },

  watch: {
    value(val) {
      if (val !== this.currentName) {
        this.currentName = val
      }
    },
  },

  created() {
    if (!this.currentName) {
      const paneVnodes = this.$_getPaneNodes()
      if (paneVnodes.length) {
        this.currentName = paneVnodes[0].componentOptions.propsData.name
      }
    }
  },

  methods: {
    // MARK: private events
    $_handleTabClick(tab) {
      this.currentName = tab.name
      this.$emit('input', tab.name)
      this.$emit('change', tab)
    },
    // MARK: public methods
    $_getPaneNodes() {
      if (this.$slots.default) {
        return this.$slots.default.filter(v => v.componentOptions && v.componentOptions.Ctor.extendOptions === TabPane)
      } else {
        return []
      }
    },
    $_getCurrentPaneVnode(vnodes) {
      if (!vnodes) {
        vnodes = this.getPaneNodes()
      }
      for (let i = 0, len = vnodes.length; i < len; i++) {
        if (vnodes[i].componentOptions.propsData.name === this.currentName) {
          return vnodes[i]
        }
      }
      return null
    },
  },

  render() {
    const paneVnodes = this.$_getPaneNodes()
    const activePaneVnode = this.$_getCurrentPaneVnode(paneVnodes)
    const menus = paneVnodes.map(v => {
      const props = v.componentOptions.propsData
      v.key = props.name
      return {
        name: props.name,
        label: props.label,
        disabled: props.disabled === '' || !!props.disabled,
      }
    })
    return (
      <div class="md-tabs">
        <md-tab-bar
          items={menus}
          value={this.currentName}
          onChange={this.$_handleTabClick}
          hasInk={this.hasInk}
          inkLength={this.inkLength}
          maxLength={this.maxLength}
        />
        <div class="md-tabs-content">
          <transition name={this.transition}>
            <keep-alive>{activePaneVnode}</keep-alive>
          </transition>
        </div>
      </div>
    )
  },
}
</script>

<style lang="stylus">
.md-tabs
  position relative
  overflow hidden

.md-tab-slide-enter-active,
.md-tab-slide-leave-active
  transition: all 500ms

.md-tab-slide-enter
  opacity: 0.01
  transform: translate3d(-50px, 0, 0)

.md-tab-slide-leave-active
  position: absolute
.md-tab-slide-leave-to
  opacity: 0.01
  transform: translate3d(50px, 0, 0)
</style>

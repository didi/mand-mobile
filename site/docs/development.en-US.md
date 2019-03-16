---
title: Development Guide
---

### Environment

* node = 8+
* npm = 3+

### Development Process

#### Create Component

```shell
$ npm install # Install dependencies

$ npm run create # Create a new component, fill in information according to the prompts
```

#### Develop Component
```shell
$ npm run dev # Visit http://localhost:4000/[COMPONENT NAME]

$ npm run dev -- --component [COMPONENT NAME] # npm run dev -- --component button, visit http://localhost:4000
```

#### Test Component
```shell
$ npm test # All tests

$ npm run test [component name] # Test a single component
```
#### feature/bugfix
New major version development will be carried out in the unified development branch. Other individual components will follow the following process to add new functionalities or repair problems.

```shell
$ git checkout -b [feature_xxx/fix_xxx] origin/dev

# Development

$ git add --all
$ git commit -am "describe" # refer to [Commit Specification] git cz
$ git pull --rebase origin dev

# Conflicts resolution

$ git push origin [feature_xxx/fix_xxx]

# Submit pull request to dev, specify the corresponding person review, and submit further modifications based on feedback

$ git checkout dev
$ git pull

```
### Code Specification

#### Directory Specification
```
├── build              Build scripts
├── config             Build environment configuration
├── test               Test configuration
├── components         Components code
    ├── _style         Utility style, icons
    ├── _util          Utility methods
    ├── button         Component directory
        ├── demo       Component demo
        ├── test       Component unit test cases
        ├── index.vue  Components core code
        ├── ...        Component other auxiliary code or sub-component code
        ├── README.md  Component documentation
    ├── ...
├── examples           Mand Mobile Examples
├── site               Mand Mobile Doc Site
```

#### Component Specification

##### Component Naming
* Lower-case letters for component name(kebab-case), which is splited with `-`, such as `image-reader`.
* Accurately express the component functionality and avoid over-simplification.

##### Component Implementation
* Dependencies

  New external dependencies need to be decided after discussions with the core developers. Try to choose relatively well-known open-source components, and avoid excessively large size.

* Imports

  Use a relative path inside the component, avoid using `alias`, such as `import { extand } from '../util'`.

* Utilities

  Common logic and styles use `_style/*`, `_util/*`, to avoid common logic or style redundancy inside the component code [Need a discussion when adding new members]

* Styles

  Use `stylus`; choose `px` as unit; and all icons use built-in svg icons, see component `Icon` for details.

Note: Detailed usage of utility styles and methods please refer to Wiki，[Style](https://github.com/didi/mand-mobile/wiki/Style)，[Utils](https://github.com/didi/mand-mobile/wiki/Utils)，[Scroll](https://github.com/didi/mand-mobile/wiki/Scroll)，[FormatValue](https://github.com/didi/mand-mobile/wiki/FormatValue)

##### Component Core Code

In principle, the official standard is [vue-sytle-guide](https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended), and the common parts are as follows:

```html
<template>
  <!-- Root element with mfe-[COMPONENT NAME] as the class name -->
  <!-- Multiple dynamic attributes need to be divided into multiple lines -->
  <!-- Use abbreviated directives: @ -->
  <div
    class="md-button"
    :class="[type]"
  >
    <!-- Use kebab-case for other component names and prop attributes, and avoid using self-closing -->
    <my-component greeting-text="hi"></my-component>

    <!-- Try to extract v-for/v-if into a separate template -->
    <!-- add v-for with a key -->
    <template v-if="foo">
      Hello A
    <template>
    <template v-else>
      Hello B
    <template>
  </div>
</template>

<script>
import MyComponent from '../my-component'

// Options must be strictly in the following order, others may refer to vue-style-guide
export default {
  // Must be prefixed with "md-[component name]" to avoid conflicts with html elements
  name: 'md-button',

  components: {
    [MyComponent.name]: MyComponent
  },

  // Prop must be written in detail
  // Use event triggers to avoid using props incoming callback methods
  props: {
    // Prop names should always use camelCase in Javascript
    greetingText: {
      type: String,
      default: 'primary'
    }
  },

  // Data must be a function
  data () {
    return {

    }
  },

  computed: {

  },

  watch: {
  },

  // LiftCircle Hook,
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */

  methods: {
    // Private method name starts with '$_'
    $_privateMethod () {

    },

    // Listener name starts with '$_on'，such as $_onButtonClick
    $_onSthEvent (event) {
      // Event name without 'on'
      this.$emit('active', 'hello')
    },

    // Public method
    publicMethod () {

    }
  }
}
</script>

<style lang="stylus" scoped>
  .md-button
    xxx
</style>
```
##### Component Unit Test Code

Use `Jest` + `vue-test-utils`, and the coverage of each indicator should be greater than `50%`.

Reference Documents:

<a href="https://vuejs.org/v2/guide/unit-testing.html" target="_blank">https://vuejs.org/v2/guide/unit-testing.html</a><br>
<a href="https://jestjs.io/docs/getting-started.html" target="_blank">https://jestjs.io</a><br>
<a href="https://vue-test-utils.vuejs.org" target="_blank">https://vue-test-utils.vuejs.org</a>

#### Commit Specification

Commit should conform to the following rules. It is recommended to use the tool `comitzen`(`git cz`) instead of `git commit`:

```shell
[TYPE](SCOPE):DESCRIPTION#[ISSUE]  # such as feat(button):add type 'ghost' for form usage #1234
```

* [Required] TYPE: Type description, includes `feat`，`fix`，`doc`，`build`，`example`
* [Optional] SCOPE: Affected components, such as `button`, generally used for 'feat,fix' 
* [Required] DESCRIPTION: A brief description of the content, try to use English
* [Optional] ISSUE: Associated Issue ID, generally used for 'feat,fix' 


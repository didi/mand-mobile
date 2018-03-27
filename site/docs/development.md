---
title: 开发指南
---

### 环境
node = 6+

npm = 3+

### 开发流程

#### 创建组件

```shell
$ npm install # 安装依赖

$ npm run create # 新增组件， 根据提示填写组件信息
```

#### 开发组件
```shell
$ npm run dev # 访问 http://localhost:4000/[组件名称]

$ npm run dev [component name] # 访问 http://localhost:4000
```

#### 测试组件
```shell
$ npm test # 全部测试

$ npm run test [component name] # 测试单个组件
```
#### feature/bugfix
新的大版本开发会在统一的开发分支中进行，其他单个组件增加新功能或问题修复流程如下
```shell
$ git checkout -b [feature_xxx/fix_xxx]

# 开发

$ git add --all
$ git commit -am "描述" # 描述参考【Commit规范】git cz
$ git pull --rebase origin master

# 解决冲突

$ git push origin [feature_xxx/fix_xxx]

# 提交 mr, 指定相应人员 review, 根据反馈进一步修改提交

$ git checkout master
$ git pull

```
### 代码规范

#### 目录规范
```
├── build              构建脚本
├── config             构建环境配置
├── test               测试配置
├── components         组件代码
    ├── _style         通用样式，图标
    ├── _util          通用工具方法
    ├── button         组件目录
        ├── demo       组件示例
        ├── test       组件单元测试用例
        ├── index.vue  组件核心代码
        ├── ...        组件其他辅助代码或子组件代码
        ├── README.md  组件说明文档
    ├── ...
├── examples           组件库示例
├── docs               组件库文档
├── ...
```

#### 组件规范

##### 组件命名
* 组件名(kebab-case)使用小写字母，以 `-` 分割, 例如 `image-reader`。
* 准确表达组件UI或功能且避免过于宽泛。

##### 组件实现
* 依赖

  新增外部依赖需要与核心开发成员讨论后决定，尽量选择较为知名开源组件，且避免体积过大。
* 引用

  组件内部使用相对路径引用，避免使用`alias`。如`import { extand } from '../util'`。
* 通用方法

  通用逻辑和样式使用`_style/*`, `_util/*`, 避免组件代码内部通用逻辑或样式冗余【新增需讨论】
* 样式

使用`stylus`; 单位统一使用`px`; 所有图标使用内置svg图标, 详情见组件`Icon`。

##### 组件核心代码

原则上以官方[vue-sytle-guide](https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended)为标准，常用部分如下：

```html
<template>
  <!-- 根元素以mfe-[组件名]作为类名 -->
  <!-- 多个动态属性需分为多行 -->
  <!-- 统一使用指令缩写 : @ -->
  <div
    class="md-button"
    :class="[type]"
  >
    <!-- 其他组件名称和prop属性使用kebab-case，且避免使用自闭合 -->
    <my-component greeting-text="hi"></my-component>

    <!-- 尽量将v-for/v-if提取到单独template中 -->
    <!-- v-for 必须增加 key -->
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

// options须严格按照如下顺序，其他可参考vue-style-guide
export default {
  // 必须以"md-[组件名]"作为前缀，避免与html元素冲突
  name: 'md-button',

  components: {
    [MyComponent.name]: MyComponent
  },

  // props须以明细方式书写
  // 统一采用事件触发，避免使用props传入回调方法
  props: {
    // js中prop属性需用驼峰
    greetingText: {
      type: String,
      default: 'primary'
    }
  },

  // data必须为函数
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
    // 私有方法以'$_'开头
    $_privateMethod () {

    },

    // 监听事件方法以'$_on'开头，如 $_onButtonClick
    $_onSthEvent (event) {
      // 事件名称无需增加on
      this.$emit('active', 'hello')
    },

    // 对外暴露方法
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
##### 组件单元测试代码

测试工具使用`karma` + `avoriaz`, 原则上各项指标覆盖率要大于`50%`

工具参考文档:

<a href="https://vuejs.org/v2/guide/unit-testing.html" target="_blank">https://vuejs.org/v2/guide/unit-testing.html</a><br>
<a href="http://karma-runner.github.io/1.0/index.html" target="_blank">http://karma-runner.github.io/1.0/index.html</a><br>
<a href="https://eddyerburgh.gitbooks.io/avoriaz/content/" target="_blank">https://eddyerburgh.gitbooks.io/avoriaz/content/</a>

#### Commit规范

commit信息应符合如下规则， 建议使用工具`comitzen`(`git cz`)代替`git commit`

```shell
[TYPE](SCOPE):DESCRIPTION#[ISSUE]  # 如 feat(button):add type 'ghost' for form usage #1234
```

* 【必填】TYPE: 类型描述。包括`feat`(功能)，`fix`(修复)，`doc`(文档)，`build`(工程化)，`example`(示例, 仅用于修改examples/*)
* 【可选】SCOPE: 影响的组件，比如`button`。一般用于feat，fix
* 【必填】DESCRIPTION: 内容简要描述，尽量使用英文
* 【可选】ISSUE: 改动关联的issue号码。一般用于feat，fix


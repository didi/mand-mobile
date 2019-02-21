---
title: Tabs
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

To create a tab page with a content area

### Import

```javascript
import { Tabs, TabPane } from 'mand-mobile'

Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
```

### Code Examples
<!-- DEMO -->

### API

#### Tabs Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|name of selected tab|String|-|-|
|immediate|trigger a `change` event immediately after initialization|Boolean|`false`|-|

#### TabPane Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|name|unique name|String|-|required|
|label|tab label|String|-|required|
|disabled|disable pane|Boolean|`false`|-|

#### Tabs Methods

##### reflowTabBar()
relayout tabbar

#### Tabs Events

##### @change(tab)
when user select tab

|Props | Description | Type|
|----|-----|------|
| tab | object of selected tab | Object:{name: String, label: String, disabled: Boolean}|

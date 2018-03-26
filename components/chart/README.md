---
title: Chart 折线图表
preview: https://didi.github.io/mand-mobile/examples/chart
---

SVG折线图表, 可绘制多条折线并配置不同的显示规则。

### 引入

```javascript
import { Chart } from 'mand-mobile'

Vue.component(Chart.name, Chart)
```

### 代码演示
<!-- DEMO -->

### API

#### Chart Props
| 属性 | 说明 |类型 | 默认值 | 必填 |
|----|-----|------|------|------|
| size | 图表绘制区域大小, 元素可为带单位字符串或者纯数字(默认为px) | Array | `[480, 320]` | 可选|
| max | 纵坐标最大值 | number | 若不填则会自动计算数据中最大值 | 可选|
| min | 纵坐标最表最小值, 建议设置为`0` | number | 若为空则会自动计算数据中最小值 | 可选|
| lines | 纵坐标最多画几条线 | number | `5` | 可选|
| step | 纵坐标递减的单位值 | number | 若为空则根据`lines`, `max`, `min`自动计算平均值 | 可选|
| format | 纵坐标标签格式化函数 | Function | `val => val` | 可选|
| labels | 横坐标的标签 | Array | - | 必填|
| datasets | 数据值, 格式参考下面的说明 | Array | - | 必填|
| shift | 纵坐标偏移量 | Number | 0.6 | 可选|

#### `datasets`
其为对象数组，每个对象定义了一组折线相关属性, 如下说明

```javascript
{
  color: '#ff5858', // 颜色, 可选, 默认为橘色
  theme: 'heat',    // 主题, 可选heat, region, 默认为空
  width: 1,         // 宽度, 可选, 默认为1
  values: [15, 20]  // 数据数组
}
```

#### 覆盖样式
默认图表样式如下

```stylus
.md-chart
  line
    stroke #ccc
    stroke-width 0.5
    stroke-linecap square
  path
    stroke #fa8919
    stroke-width 1
    stroke-linecap butt
  .md-chart-axis-y
    text
      fill #666
      font-size 0.2rem
      text-anchor end
  .md-chart-axis-x
    text
      fill #666
      font-size 0.22rem
      text-anchor middle
```

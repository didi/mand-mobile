---
title: Chart
preview: https://didi.github.io/mand-mobile/examples/#/chart
---

Chart made with SVG.

### Import

```javascript
import { Chart } from 'mand-mobile'

Vue.component(Chart.name, Chart)
```

### Code Example
<!-- DEMO -->

### API

#### Chart Props
| Props | Description | Type | Default | Required |
|----|-----|------|------|------|
| size | width and height of chart | Array | `[480, 320]` | - |
| max | max value in y axis | Number | Leave it blank to use max value in dataset | - |
| min | min value in y axis | number | Leave it blank to use min value in dataset | - |
| lines | number of horizontal lines | Number | `5` | - |
| step | delta value in y axis | Number | Leave it blank to auto compute | - |
| format | format value in y axis | Function | `val => val` | - |
| labels | category labels in x axis | Array | - | required |
| datasets | point datasets | Array | - | - |
| shift | Y axis label shift value | Number | 0.6 | - |

#### `datasets`

```javascript
{
  color: '#ff5858', // storke color
  theme: 'heat',    // 'heat', 'region', default is empty
  width: 1,         // stroke width
  values: [15, 20]  // points
}
```

#### Customize Style
The default chart style as below

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

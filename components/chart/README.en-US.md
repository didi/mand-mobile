---
title: Chart
preview: https://mand-mobile.github.io/2x-doc/examples/#/chart
---

Chart made with SVG, supports polylines printing and display specification setting.

### Import

```javascript
import { Chart } from 'mand-mobile'

Vue.component(Chart.name, Chart)
```

### Code Examples
<!-- DEMO -->

### API

#### Chart Props
| Props | Description | Type | Default | Required |
|----|-----|------|------|------|
| size | size of chart, the value can be a string or number with unit (px)| Array | `[480, 320]` | - |
| max | maximum in Y-axis | Number | Leave it as blank to automatically calculate the maximum in the dataset | - |
| min | minimum in Y-axis | number | Leave it as blank to automatically calculate the minimum in the dataset | - |
| lines | the number of lines in y-axis| Number | `5` | - |
| step | decreasing step in Y-axis | Number | Leave it as blank to automatically compute the avarage based on `lines`,`max` and `min`| - |
| format | labels formatting function in Y-axis | Function | `val => val` | - |
| labels | labels of X-axis | Array | - | required |
| datasets | data, the format is shown as follows | Array | - | required|
| shift | shift in Y-axis| Number | 0.6 | - |

#### `datasets`
Array of objects, each object defines a set of polyline-relevant attributes.

```javascript
{
  color: '#ff5858', // storke color, optional, default color is orange
  theme: 'heat',    // theme, the value can be 'heat' or 'region', default value is empty
  width: 1,         // width, optional, default value is 1
  values: [15, 20]  // array
}
```

#### Override Style
The default chart style is shown as below

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

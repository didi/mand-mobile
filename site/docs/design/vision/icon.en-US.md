---
title: Icon
---
As an important element in UI composition, Icon affects the overall style of UI interface to a certain extent. "Concise", "accurate" and "beautiful" are the design principles.

<style>
.doc-content-paragraph h4{margin-top:60px}
.icon-img{background-size:100% 100%!important;margin-top:16px;width:248px;height:214px;max-width:70%}
.last-icon-img{margin-bottom:24px}
.icon-item{background-color:#F9FAFB;padding:65px 0;display:flex;align-items:center;justify-content:center;width:700px;max-width:100%}
.special-img{max-width:65%}
</style>

#### Icon style

Using linear combination of ancient copper coin style, extract the design principle of "round outside and square inside", the external structure is simple and comfortable, giving moderate tolerance at the same time, and the page rounded corner is more suitable; Internal pursuit of clarity and accuracy, such as the determination and accuracy of financial products.

#### Grid specifications

As the underlying structure of diagram drawing, grid is the basis of all attribute design. Key factors such as the length and thickness of lines and the size and proportion of ICONS are determined on the basis of it. The typical icon size is 16px by 16px output.<br>
<div class="icon-item">
  <img src="https://pt-starimg.didistatic.com/static/starimg/img/GTd675GAhd1644305037994.png" class="icon-img">
</div>

#### Canvas with auxiliary lines

As the actual operation area of icon design, the canvas plays the role of controlling the screen, limiting the size and adjusting the spacing. We normalize the circle, square and diagonal paths in the grid and generate a set of auxiliary lines system. The actual canvas should be positioned 28 by 28 pixels in the center of the grid, with 2 pixels of bleeding around it.<br>
<div class="icon-item">
  <img src="https://pt-starimg.didistatic.com/static/starimg/img/OKulJxPJES1644305037975.png" class="icon-img special-img">
</div>

#### line

It is recommended to draw with 4px width strokes to allow more style possibilities in smaller grids, 4px at 32px.<br>
<div class="icon-item">
  <img src="https://pt-starimg.didistatic.com/static/starimg/img/K5k0hHysz11644305038177.png" class="icon-img">
</div>

#### Rounded corners

Keep the outer corners 4px rounded, the inner corners unrounded and the outer corners rounded and the inner corners square.<br>
<div class="icon-item">
  <img src="https://pt-starimg.didistatic.com/static/starimg/img/Ybp8TGmKZS1644305038215.png" class="icon-img">
</div>

#### The Angle

Lines should preferably be tilted parallel to 45° auxiliary lines in the grid, or use multiples of 15°. In order to have high line definition in low resolution.<br>
<div class="icon-item">
  <img src="https://pt-starimg.didistatic.com/static/starimg/img/yeENJWIw4E1644305038385.png" class="icon-img last-icon-img special-img">
</div>

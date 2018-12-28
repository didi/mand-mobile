---
title: Layout
---

<style>
.doc-cutline-wrapper{
  display: flex;
  margin-top: 16px;
}
.doc-cutline{
  position: relative;
  display: inline-flex;
  margin-bottom: 42px;
  box-sizing: border-box;
  flex: 1;
  flex-direction: column;
}
.doc-cutline:first-of-type{
  margin-right: 40px;
}
.doc-cutline-item{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 20px;
  background: #F9FAFB;
}
.doc-cutline-title{
  font-size: 14px;
  color: #111A34;
}
.doc-cutline-desc{
  margin-top: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #41485D;
}

@media (max-width: 750px) {
  .doc-cutline-wrapper{
    flex-direction: column;
  }
  .doc-cutline{
    max-width: 100%;
  }
}
</style>

From the perspective of minimizing the communication and adaptation costs, the design drawing board size of the Drip Financial Design Team is 750*1334;     
The base of the grid is 4, with "4" as a step to adjust the spacing and size of the elements, which means that any padding, margin, sizing, will be a multiple of 4.
<br>
<br>

<div class="doc-cutline-wrapper">
  <div class="doc-cutline">
    <div class="doc-cutline-title">Page fence benchmark</div>
    <div class="doc-cutline-desc">
      In the financial business scenario, there are many less texts, and 40px of white space can make the whole page more breathable and have a sense of space.
    </div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/vPiNCT4oCo1545964504092.png">
    </div>
  </div>
  <div class="doc-cutline">&nbsp;</div>
</div>

<div class="doc-cutline-wrapper">
  <div class="doc-cutline">
    <div class="doc-cutline-title">Form/Level heading</div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/MfZYiEwctf1545964504283.png">
    </div>
  </div>
  <div class="doc-cutline">
    <div class="doc-cutline-title">Form/Input</div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/CAUVTpvKhP1545964504299.png">
    </div>
  </div>
</div>
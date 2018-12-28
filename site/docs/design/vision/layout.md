---
title: 布局
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

从尽可能减少沟通与适配成本考虑，滴滴金融设计团队统一的设计画板尺寸为 750*1334；     
栅格的基数为 4，以“4”为一个步进，来调整元素的间距及尺寸，这意味着任何padding、margin、sizing，都将是4的倍数。
<br>
<br>

<div class="doc-cutline-wrapper">
  <div class="doc-cutline">
    <div class="doc-cutline-title">页面栅栏基准</div>
    <div class="doc-cutline-desc">
      金融业务场景中，图少文案多，40px的留白可以让整个页面更透气，有空间感
    </div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/vPiNCT4oCo1545964504092.png">
    </div>
  </div>
  <div class="doc-cutline">&nbsp;</div>
</div>

<div class="doc-cutline-wrapper">
  <div class="doc-cutline">
    <div class="doc-cutline-title">表单/一级标题</div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/MfZYiEwctf1545964504283.png">
    </div>
  </div>
  <div class="doc-cutline">
    <div class="doc-cutline-title">表单/输入</div>
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/CAUVTpvKhP1545964504299.png">
    </div>
  </div>
</div>
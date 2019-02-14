---
title: 直观简单
---

<style>
.doc-cutline-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex}
.doc-cutline{position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;margin-bottom:42px;padding:20px;background:#F9FAFB;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:320px}
.doc-cutline:after{position:absolute;bottom:-32px;left:0;font-size:12px;font-weight:500}
.doc-cutline.do{margin-right:40px;border-bottom:solid 4px #2F86F6}
.doc-cutline.do:after{content:"Do";color:#2F86F6}
.doc-cutline.donot{border-bottom:solid 4px #FF5257}
.doc-cutline.donot:after{content:"Don't";color:#FF5257}
.doc-cutline-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}
.doc-cutline-item.horizon img{width:100%}
.doc-cutline-item.vertical img{width:auto;height:100%}
@media (max-width:750px){.doc-cutline-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}
.doc-cutline.do{margin-right:0}
}
</style>

#### 所见即所得

针对银行卡、行驶证等证件扫描识别功能，识别结果与对应证件照采用了对照展示，识别正确与否非常直观，一目了然。


<div class="doc-cutline-wrapper">
  <div class="doc-cutline do">
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/FfSJRAtAsN1545826131586.jpg">
    </div>
  </div>
  <div class="doc-cutline donot">
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/P1V5PxTfZJ1545826131541.jpg">
    </div>
  </div>
</div>

#### 关注单任务

一个页面只关注一件核心任务，提供单一操作按钮；若有多种操作可能，也要区分主次，避免多个操作按钮情况。

<div class="doc-cutline-wrapper">
  <div class="doc-cutline do" style="flex:1;">
    <div class="doc-cutline-item vertical" style="height:400px;">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/aPbV47UGQ81545827158431.jpg">
    </div>
  </div>
  <div class="doc-cutline donot" style="flex:1;">
    <div class="doc-cutline-item vertical" style="height:400px;">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/qkOeavUGxm1545827158470.jpg">
    </div>
  </div>
</div>

#### 简化多层级

需要分层的复杂信息，尽量默认只展示第一层级信息给用户，其余层级给予隐藏。

<div class="doc-cutline-wrapper">
  <div class="doc-cutline do" style="flex:1;">
    <div class="doc-cutline-item" style="max-width:350px;">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/kearq8f13L1545827158629.png">
    </div>
  </div>
  <div class="doc-cutline donot" style="flex:1;">
    <div class="doc-cutline-item" style="max-width:350px;">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/2tvMzqd5Xz1545827158791.png">
    </div>
  </div>
</div>
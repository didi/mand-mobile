---
title: Font
---

### Font family

The design drawing uses the system default font, and the Android system has more custom fonts, which are subject to the system default font;

<style>
.doc-font-list{display:-webkit-box;display:-ms-flexbox;display:flex}
.doc-font-item{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-right:40px;padding-bottom:20px;border:solid 1px #E2E4EA}
.doc-font-item:last-of-type{margin-right:0}
.doc-font-title{padding:12px 24px;background:#F4F5F7;font-size:14px;color:#111A34;font-weight:500}
.doc-font-text{float:left;width:100%;margin-top:12px;padding:0 24px;font-size:14px;color:#41485D;-webkit-box-sizing:border-box;box-sizing:border-box}
.doc-font-text span.l{float:left}
.doc-font-text span.r{float:right}
.font-weight-img{max-width:80%!important}
@media (max-width:750px){.doc-font-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}
.doc-font-item{max-width:none!important;margin-right:0;margin-bottom:20px}
.font-weight-img{max-width:100%!important}
}
</style>

<div class="doc-font-list">
  <div class="doc-font-item">
    <div class="doc-font-title">
      iOS
    </div>
    <div class="doc-font-text">
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;PingFang SC
    </div>
    <div class="doc-font-text">
      Number&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
  <div class="doc-font-item">
    <div class="doc-font-title">
      Android
    </div>
    <div class="doc-font-text">
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;Noto Sans S Chinese
    </div>
    <div class="doc-font-text">
      Number&nbsp;&nbsp;&nbsp;&nbsp;Helvetica/DIN Pro-Medium
    </div>
  </div>
  <div class="doc-font-item">
    <div class="doc-font-title">
      H5
    </div>
    <div class="doc-font-text">
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;According to the system
    </div>
    <div class="doc-font-text">
      Number&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
</div>

### Font size

The use of fonts pays attention to the use of Chinese and English. The financial product numbers are important information of the page.
Chinese fonts are recommended to have a maximum font size of 60Px and a minimum of 24px; English font DIN Pro Medium (used when the page is highlighted) requires a maximum font size of 120px
The size of the font size is even (the multiple of 4 is the best) to guarantee the unit of integer in all development scenarios. For the needs of special scenes, the font size standard can be adjusted accordingly.
<br>  
<br> 
<img src="https://pt-starimg.didistatic.com/static/starimg/img/R1ke1asaDm1545968523580.jpg" class="font-weight-img">

### Font weight

In most cases, Chinese only has two font weights, regular and medium. The digital font DIN Pro only has a medium weight.

<div class="doc-font-list">
  <div class="doc-font-item" style="max-width:232px;">
    <div class="doc-font-title">
      Involving font weight
    </div>
    <div class="doc-font-text">
      <span class="l">light</span>
      <span class="r" style="font-weight:300;">300</span>
    </div>
    <div class="doc-font-text">
      <span class="l">regular</span>
      <span class="r" style="font-weight:400;">400</span>
    </div>
    <div class="doc-font-text">
      <span class="l">medium</span>
      <span class="r" style="font-weight:500;">500</span>
    </div>
    <div class="doc-font-text">
      <span class="l">semibold</span>
      <span class="r" style="font-weight:600;">600</span>
    </div>
  </div>
</div>
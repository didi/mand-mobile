---
title: 字体
---

### 字型

设计图使用系统默认字体，安卓系统自定义字体较多，以系统默认字体为准；

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
      iOS&nbsp;&nbsp;系统
    </div>
    <div class="doc-font-text">
      中文&nbsp;&nbsp;&nbsp;&nbsp;PingFang  SC 苹方
    </div>
    <div class="doc-font-text">
      数字&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
  <div class="doc-font-item">
    <div class="doc-font-title">
      Android 系统
    </div>
    <div class="doc-font-text">
      中文&nbsp;&nbsp;&nbsp;&nbsp;Noto Sans S Chinese  思源
    </div>
    <div class="doc-font-text">
      数字&nbsp;&nbsp;&nbsp;&nbsp;Helvetica/DIN Pro-Medium
    </div>
  </div>
  <div class="doc-font-item">
    <div class="doc-font-title">
      H5
    </div>
    <div class="doc-font-text">
      中文&nbsp;&nbsp;&nbsp;&nbsp;根据系统
    </div>
    <div class="doc-font-text">
      数字&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
</div>

### 字号

字体的使用注意中文和英文的使用，金融类的产品数字均为页面的重要信息。      
中文字体建议最大字号是60Px，最小为24px；英文字体DIN Pro  Medium（在页面强突出金额时使用）建议最大字号120px      
其中字号大小均为偶数（4的倍数最佳），以保障所有开发场景下为整数的单位。特殊场景的需要，字号标准可做相应调整。<br>  
<br> 
<img src="https://pt-starimg.didistatic.com/static/starimg/img/R1ke1asaDm1545968523580.jpg" class="font-weight-img">

### 字重

多数情况下，中文只出现 regular 以及 medium 的两种字体重量，数字字体DIN Pro只出现medium字重。

<div class="doc-font-list">
  <div class="doc-font-item" style="max-width:232px;">
    <div class="doc-font-title">
      涉及字重
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
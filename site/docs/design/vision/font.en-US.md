---
title: Font
---
Font is one of the most basic components of systematic interface design. It is the principle of "user-friendly" and "beautiful" font design.

<div class="doc-font-list doc-font-area">
  <div class="doc-font-item">
    <div class="doc-font-title">
      iOS&nbsp;&nbsp;System
    </div>
    <div class="doc-font-text">
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;PingFang  SC 苹方
    </div>
    <div class="doc-font-text">
      Number&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
  <div class="doc-font-item">
    <div class="doc-font-title">
      Android System
    </div>
    <div class="doc-font-text">
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;Noto Sans S Chinese  思源
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
      Chinese&nbsp;&nbsp;&nbsp;&nbsp;Based on the system
    </div>
    <div class="doc-font-text">
      Number&nbsp;&nbsp;&nbsp;&nbsp;DIN Pro-Medium
    </div>
  </div>
</div>
<div class="doc-font-list doc-font-area">
  <div class="doc-font-item">
    <div class="doc-font-title">
      The brand font
    </div>
    <div class="doc-font-typeface">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/0gWbj5fuLN1643183908647.png" class="font-typeface-img">
    </div>
  </div>
</div>

<style>
.doc-content-paragraph h4{margin-top:60px}
.doc-font-typeface{padding:35px 35px 15px 35px}
.doc-font-area{margin-top:40px}
.doc-font-list{display:-webkit-box;display:-ms-flexbox;display:flex}
.doc-font-item{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-right:40px;padding-bottom:20px;border:solid 1px #E2E4EA}
.doc-font-item:last-of-type{margin-right:0}
.doc-font-title{padding:12px 24px;background:#F4F5F7;font-size:14px;color:#111A34;font-weight:500}
.doc-font-text{float:left;width:100%;margin-top:12px;padding:0 24px;font-size:14px;color:#41485D;-webkit-box-sizing:border-box;box-sizing:border-box}
.doc-font-text span.l{float:left}
.doc-font-text span.r{float:right}
.font-weight-item{width:220px;height:220px;margin-right:20px}
.font-size-img{max-width:80%!important;margin-top:32px!important}
.font-weight-img{width:100%;height:100%;background-size:100% 100%;}
.font-weight-list{margin-top:32px}
@media (max-width:750px){.doc-font-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}
.doc-font-item{max-width:none!important;margin-right:0;margin-bottom:20px}
.font-size-img{max-width:100%!important}
.font-hight-img{height:280px}
}
.font-typeface-img{width:100%;height:100%;background-size:100% 100%;}
.font-table-content{margin-top:32px;margin-bottom:24px}
.font-table{background-color:#fff!important;border:0.5px solid #E5E5E5;
font-family:PingFangSC-Regular;font-size:14px!important;color:#31383F!important;
letter-spacing:0;line-height:28px!important;}
.doc-content-paragraph table td:first-child {width:55%;font-weight:normal!important;
color: #31383F;font-family:none;}
.table-first-tr{font-family:PingFangSC-Regular;font-size:14px;color:#91989F!important;
letter-spacing:0;line-height:28px;}
.first-td-speical{color: #91989F!important;}
.first-td{font-family:none;font-size:14px;color:#31383F;
letter-spacing:0;line-height:28px;}
.table-tr td:not(:first-child){border-left:0.5px solid #E5E5E5!important;}
.doc-content-paragraph table td{padding:5.5px 0 7px 20px}
@media (max-width:750px){.doc-content-paragraph table td{padding:5.5px 0 7px 5px}}
@media (max-width:750px){.font-weight-item:not(:last-child){margin-bottom:20px}}
</style>

#### The shop name

Pay attention to the use of Chinese and English fonts, financial product numbers are important information on the page.<br>
The recommended maximum font size for Chinese is 60Px and minimum font size is 24px. DIN Pro Medium (used when highlighting amounts on a page) is recommended with a maximum size of 120px.
The font size is even (multiple of 4 is best) to ensure integer units in all development scenarios. The size standard can be adjusted according to the needs of special scenes.<br>
<img src="https://pt-starimg.didistatic.com/static/starimg/img/R1ke1asaDm1545968523580.jpg" class="font-size-img">

#### Word again

In most cases, only the regular and Medium font weights appear in Chinese, and only the medium font weights appear in DIN Pro.

<div class="doc-font-list font-weight-list">
  <div class="font-weight-item">
    <img src="https://pt-starimg.didistatic.com/static/starimg/img/KRGD1SwMaB1643185507535.png" class="font-weight-img">
  </div>
  <div class="font-weight-item">
    <img src="https://pt-starimg.didistatic.com/static/starimg/img/NOKvBvStRy1643185339122.png" class="font-weight-img">
  </div>
  <div class="font-weight-item">
    <img src="https://pt-starimg.didistatic.com/static/starimg/img/1Q1n66pE6x1643185338853.png" class="font-weight-img">
  </div>
</div>

#### Line height

When the type is larger, the line height is larger, and the coherence of the message displayed in large text is obviously fragmented. Therefore, it is recommended to keep the same spacing between different font sizes. The logical formula is as follows: "Line height = font size + n", where n is a multiple of 4 and 8 is recommended.

<div class="font-table-content">
  <table class="font-table" border="0" cellspacing="0" cellpadding="0">
    <tr class="table-first-tr table-tr">
      <td class="first-td-speical">size</td>
      <td>rem</td>
      <td>Row height</td>
      <td>Row height</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">12px</td>
      <td>0.75</td>
      <td>16</td>
      <td>1.25</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">14px</td>
      <td>0.875</td>
      <td>20</td>
      <td>1.25</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">16px</td>
      <td>1</td>
      <td>24</td>
      <td>1.5</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">18px</td>
      <td>1.125</td>
      <td>26</td>
      <td>1.625</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">20px</td>
      <td>1.25</td>
      <td>28</td>
      <td>1.75</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">24px</td>
      <td>1.5</td>
      <td>32</td>
      <td>2</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">24px</td>
      <td>1.5</td>
      <td>32</td>
      <td>2</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">28px</td>
      <td>1.75</td>
      <td>36</td>
      <td>2.25</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">32px</td>
      <td>2</td>
      <td>40</td>
      <td>2.5</td>
    </tr>
    <tr class="table-tr">
      <td class="first-td">36px</td>
      <td>2.25</td>
      <td>44</td>
      <td>2.75</td>
    </tr>
  </table>
</div>

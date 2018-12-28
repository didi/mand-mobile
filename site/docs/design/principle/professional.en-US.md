---
title: Thoughtful and professional
---

<style>
.doc-cutline-wrapper{
  display: flex;
}
.doc-cutline{
  position: relative;
  display: inline-flex;
  margin-bottom: 42px;
  padding: 20px;
  background: #F9FAFB;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  max-width: 45%;
}
.doc-cutline:after{
  position: absolute;
  bottom: -32px;
  left: 0;
  font-size: 12px;
  font-weight: 500;
}
.doc-cutline.do{
  margin-right: 40px;
  border-bottom: solid 4px #2F86F6;
}
.doc-cutline.do:after{
  content: "Do";
  color: #2F86F6;
}
.doc-cutline.donot{
  border-bottom: solid 4px #FF5257;
}
.doc-cutline.donot:after{
  content: "Don't";
  color: #FF5257;
}
.doc-cutline-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
.doc-cutline-item.horizon img{
  width: 100%;
}
.doc-cutline-item.vertical img{
  width: auto;
  height: 100%;
}

@media (max-width: 750px) {
  .doc-cutline-wrapper{
    flex-direction: column;
  }
  .doc-cutline{
    max-width: 100%;
  }
  .doc-cutline.do{
    margin-right: 0;
  }
}
</style>

## Clear progress

For the flow of funds and business processing, it is necessary to design a reasonable schedule node to clearly convey the concept of time to the user and avoid user anxiety. [Financial Management Progress / Repayment Progress]

<div class="doc-cutline-wrapper">
  <div class="doc-cutline do">
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/NGwne2FMQv1545911061860.png">
    </div>
  </div>
  <div class="doc-cutline donot">
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/N6fHIqY5PO1545911064113.png">
    </div>
  </div>
</div>

## Restore difference

There are physical differences between different banks and different suppliers. Under the premise of basic unity of experience, it is also necessary to maintain individual differences and let users feel the financial profession. [Supplier Information Floating Layer / Bank Card Type]

<div class="doc-cutline-wrapper">
  <div class="doc-cutline do">
    <div class="doc-cutline-item">
      <img src="https://pt-starimg.didistatic.com/static/starimg/img/j1hfoR4axj1545911194083.png">
    </div>
  </div>
</div>

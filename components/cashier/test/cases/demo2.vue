<template>
  <div class="md-example-child md-example-child-cashier">
    <md-cashier
      ref="cashier"
      v-model="isCashierhow"
      :channels="cashierChannels"
    ></md-cashier>
	</div>
</template>

<script>import {Cashier} from 'mand-mobile'

export default {
  name: 'cashier-demo',
  components: {
    [Cashier.name]: Cashier,
  },
  data() {
    return {
      isCashierhow: true,
      cashierChannels: [
        {
          icon: 'cashier-icon-1',
          text: '招商银行(0056)',
          value: '001',
        },
        {
          icon: 'cashier-icon-2',
          text: '支付宝支付',
          value: '002',
        },
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '003',
        },
        {
          icon: 'cashier-icon-4',
          text: 'QQ钱包支付',
          value: '004',
        },
        {
          icon: 'cashier-icon-5',
          text: '一网通支付',
          value: '005',
        },
      ],
    }
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  mounted() {
    this.cashier.next('success', {
      buttonText: '好的',
    })
  },
}
</script>

<style lang="stylus">
.md-example-child-cashier
  .md-field
    margin-bottom 30px
  .md-cashier-channel-item
    .item-icon.cashier-icon-1
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABHklEQVR4Ae2WgUYEURSGh70oQIB6gh6gHmBsqhfqHdq2hAJTUYAACMCytqQISUDAVpsEsWi09TX/XFcxYeJ0E/vzMf4z7uc6cJMQWi6l1egU5AUYkfszXZp8TVFmBfwyWbhZU0UcXKrbdWMJ5ZLwNaIwl5CY1BPen8HgAtoT1dn6pJ/dnRoKn64p01mpztQpj1eGwsNlyuTPsDX92W/P+A70j6FQ3BxR5nI3dP4bNDPeochmYZTD+xvsz8HBvP8evWhmLvScb1Cm3/Mo6sLcXLg5BcMHQhgO1BkL+8fUjP6NLLw9MRB+R0h19h+F4x3WYSystVe/rx/zJ0+MXtxHVNstxBO6ZqKw2tiLINxJQrzULenKxjvVWV3W3GLwfAD9KR4TBA12SgAAAABJRU5ErkJggg==') center no-repeat
      background-size 26px
    .item-icon.cashier-icon-2
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB7ElEQVR4Ac2WA6weQRSFb62gtuPajetGtW0FNcO6cVK7XdRu2Ia149R2Z6bP9r6T+yb5bZ7k/Bh9gzt3l1hXfzUiS+4iU36GK2AnTq6AP/PYJ/42JhZ+oPAp7CTWYDDUVHu4IDneCaD8kkTgV4r4zA5+akBuivhMI56llyLv768wXkpfYNK3NGXAaHQhpxlHY9KAlpwc6Qojt6W2urZYnYoFWA5XhWhTSaf/dmHYDqc2/v+NFPiZDLmKzv7pxAPAZIvWZPwbjrqN8B242LU6edUtgMZGGjS3XI8R6IRTj/yI2xhiPNofA7CPCyiuRAL8wM9FUy6AH8I5urwE/gwb8FSdS311+ldz1KsIgGIpmWpNGEGSQYbaC7f1gWIyPClD3uaJBgWeld3x/S3MyCwkWwz1AfqsWCzV8EIfIAeJqd6GAcuHx7oFylz4AVlqGl116gQ/c3HABTTkFH1pywPD1Esy//V0wdQMlJe6Rex3MtQ2OvO/fRgZXbziGVqqP+CmXm0m/AED2WT9G0GOU4sg/sYVCZLCyngrLTHRJ9K9Gl4jWzShYDoj+5Ih7keQiSQWcwgTHqKBPrP8wanK/D+QLzwOH4DeOgDu+maeiPwmBS9RuFNJA1pyV9JfhF33BHS9vZVxhFTWjCn2kYZVAyRlGm3AoxGeAAAAAElFTkSuQmCC') center no-repeat
      background-size 26px
    .item-icon.cashier-icon-3
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg==') center no-repeat
      background-size 26px
    .item-icon.cashier-icon-4
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAADaElEQVR4AWIgADiAOAaI1wDxUxZAadUA5GoTBCd59Wzbtm3btm3btm3btm3btt/5+v/6uLXRl/q7qu+SRc/OzKbXIhAh5ZXB1QZLyf8ANz+noAseNZhc3ETb4NOaocUiX+JFlYJiEuU1cdNBzGQSjbVWN3bu3BkHDx5EgQIFQsb69u2LjRs3IkWKFHqgE+ICndUNFCB27drFIBxDoUKFcP/+fZLj9rIpL05wVV1co0YNEBQdP3484sWLx9OjXbt2JD5//mwvwBaHV1KvPctCsEyLFy9GxIgRQeErV67g2rVrePz4sf1eOEBGLtB56tQpEPPmzQO/x4gRAx8+fADRvXt3R02PJnaQw97inKnCYkiLTBjf2IJ5bQTkxJax0KdpdiSPK44CxBcdk5LE7qqWaGxDwZv5AmxyzjtTLKiVP3QfNfakTVBZdDzOHHPDhESREBxkQA3Br4Vh8WlyJAr568Leq634MC4yPs63onz2UPEVySL7vswcc6LoeJIx+vPXmWNgW8ooSBs+DDcgY2LBoYEWvBoaDVeaJMSNlvFD+G5sZJYLsaMGlTJiGOxPFRXUuJ8x+nnREO16+ui+nAzm4qSRUT5qWES2Bpbg7OCwuNcjJok1nawMzjlUix4Oq5NHhrr3WJqonnqj5/HUJ9IEnkAnx5n6rMSRQFLQ0VpmkSSslVlNkyAkD647/y8pkx9vC6XiYrf4tnh6dEocHapWsDdNVK/Y/Pnz8XvdYlOiH6rlx7fh3eFx8iDg54uyZcvq13W8jT1s3boVPyYPVYXg/+8vfJ4/htedayT42d/TAzoaNmyoB7gquj3QJXkqNQBPZwZ6gCBtgcpp06bZBPD79QMmQFNUhYMpj4M+dOYEHdT3y0f8nDsBX3u3wpdujU1l4OHhgQgRIsBqld+K7VNbBgU1mlhNx6SZuYtVq1ZRUL2e04TaGuLTbmnP7uDv379Ily4dxZ/bOqkGPt5Mk802i+bNm4MHy5ZccokzYJOMN/jn6WxBscxhwVfM29sbjsBSsmclMoc47x9q2BffLP00x/TfM0DQvkYqjB45BHyT+Q7zNeNvpWuntmhUIgq4RtsHaokObJS2nHRAf2a1s5/s3NFXtvOzauE6qeWoRHUMHjT4mQJBfGpws8HKyrrKHOOcso57DlJDFPwHtUxGlWBNgLkAAAAASUVORK5CYII=') center no-repeat
      background-size 26px
    .item-icon.cashier-icon-5
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABPlBMVEUAAAC/AEDIFS3GFS3HFS3HFS3HFS3MADPGFC7GFS3FFSvHFS3GFS3HFS3HFS3KIjnooKnmmKPJHDTMLELqqLHmlaDIGjHONEnssLjkjJjHFi7////hgI3rqrLdcoDwwsjUS17KITjed4T44+XIGC/LJz3++fr119vQPFD//v7NMEXgf43ca3r78PLZX3DVUWPpoavut77IGTD44+bxxszmlqHxw8nHFy/44OPttr3LJjz99/jaZXXXWWrhgY7+/P3//f3XV2jzzdPgf4zut7/nmqTxxMrllJ/yyM7dcH/++vvMK0HWUmTQO0/ZYXHba3r77vDJHTTts7v22Nzxxcv55OffdoXed4XRP1PedIPaZHThg5D11dnVTmDJHzb77e/55+rLJj377/Hqp7DkjprTRlnlkZzRPlLNL0TXVmdZnHwTAAAAD3RSTlMABEqUzPH/BXDmMNZV+P145yZGAAABMklEQVR4AXTQ02KcARCG4Z/v2t5vVdv2to1t2/d/BcnEfE7H45xxPT8IIQx8z3WuikRjnItFI5dj8QRXJOIXsWSKa1LJ81iaG9Kn0XiKW6TiFoskuFXCtopyh+jRfTFMJpvLA4ViqQxUqrU6MdfxwJSkBtCUWkBb6oDn+Jh796UHD3n0WHoCT6Vnz8F3AsyLl6+k1zQk6Q1vpXdA4IQWe//h4yfp85evFvz2/YdlQOhgfkq/nkm/pT9S96/1NifBf9L/HpnePql/QIMYa0tHGhoekRkdk16NT0yCtQ2AKalIfVrSDO9npbl5TGCnPO9KC7AoaQmWpRUwvj1hVWoDa+vaKMPmlrbBePa+LzvVCsDu3j7AweEyxSAJghFfwOONMnyRjS+Z4Etg+JIm4USNNzsAAPHdK2mIKv4bAAAAAElFTkSuQmCC') center no-repeat
      background-size 26px
</style>

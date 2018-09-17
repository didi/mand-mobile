const fs = require('fs')

/**
 * 为mand-mobile支持mpvue增加一个loader
 * 作用：
 *   1、通过特定注释格式化template
 *   2、将createDemoModule格式化为mpvue支持代码
 *
 * @param source
 * @return {*}
 */
module.exports = function (source) {
  // 判断是否有注入
  let matches = source.match(/\.\.\.createDemoModule\(.*\)/)
  if (!matches) {
    return source
  }
  // 匹配demo个数
  let demos = matches[0]
  demos = demos.match(/\[(.*)\]/)
  if (!demos) {
    return source
  }
  demos = demos[1].split(',').map(demo => demo.trim())
  let template_str = ''
  let components_str = 'components: {'
  demos.forEach((demo, index) => {
    // 获取demo的title和describe
    let demo_url = this.resource.replace('index.vue', `cases/demo${index}.vue`)
    const file = fs.readFileSync(demo_url, 'utf8')
    let title = '基础'
    let describe = ''
    if (typeof file === 'string') {
      // 匹配demo文件中的title和describe
      let title_match = file.match(/title:[\s']*(.*)'/)
      title_match && (title = title_match[1])
      let describe_match = file.match(/describe:[\s']*(.*)'/)
      describe_match && (describe = describe_match[1])
    }
    // 拼接template字符串
    template_str +=
      `
        <section class="md-example-section">
          <div class="md-example-title">${title}</div>
          <div class="md-example-describe">${describe}</div>
          <div class="md-example-content">
            <demo${index}></demo${index}>
          </div>
        </section>
      `
    // 拼接componets字符串
    components_str += `Demo${index},`
  })
  // 通过指定字符串替换template
  let res = source.replace('<!-- weapp inject -->', template_str)
  // 替换createDemoModule
  components_str += '},'
  res = res.replace(/\.\.\.createDemoModule\(.*\)/, components_str)
  return res
}

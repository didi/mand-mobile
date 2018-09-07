import {extend, warn} from '../_util'

const defaultOptions = {
  currentLevel: 0,
  maxLevel: 0,
  values: [],
  defaultIndex: [],
}

/**
 * cascade column by set value of following columns
 * @param {*} picker instance of picker-column
 * @param {*} options { currentLevel, maxLevel, values } 
 * @param {*} fn 
 */
export default function(picker, options = {}, fn) {
  options = extend(defaultOptions, options)

  /* istanbul ignore if */
  if (!picker) {
    warn('cascade: picker is undefined')
    return
  }

  let values = options.values

  /* istanbul ignore next */
  for (let i = options.currentLevel + 1; i < options.maxLevel; i++) {
    const activeIndex = options.defaultIndex[i] || 0
    const columnValues = values.children || []
    picker.setColumnValues(i, columnValues)
    values = columnValues[activeIndex] || []
  }

  fn && fn()
}

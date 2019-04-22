import {extend, warn} from '../_util'

const defaultOptions = {
  currentLevel: 0,
  maxLevel: 0,
  values: [],
  defaultIndex: [],
  defaultValue: [],
}

function getDefaultIndex(data, defaultIndex, defaultValue) {
  let activeIndex = 0
  if (defaultIndex !== undefined) {
    return defaultIndex
  } else if (defaultValue !== undefined) {
    data.some((item, index) => {
      if (item.text === defaultValue || item.label === defaultValue || item.value === defaultValue) {
        activeIndex = index
        return true
      }
    })
  }
  return activeIndex
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
    const columnValues = (!i ? values[i] : values.children) || []
    picker.setColumnValues(i, columnValues)
    let activeIndex = getDefaultIndex(columnValues, options.defaultIndex[i], options.defaultValue[i])
    activeIndex >= columnValues.length && (activeIndex = 0)
    values = columnValues[activeIndex] || []
  }

  fn && fn()
}

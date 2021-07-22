<template>
  <div class="md-date-picker" :class="[type]">
    <md-picker
      ref="picker"
      v-model="isPickerShow"
      :data="columnData"
      :cols="columnData.length"
      :default-value="columnDataDefault"
      :line-height="lineHeight"
      :title="title"
      :describe="describe"
      :ok-text="okText"
      :cancel-text="cancelText"
      :large-radius="largeRadius"
      :is-view="isView"
      :mask-closable="maskClosable"
      :keep-index="keepIndex"
      @initialed="$emit('initialed')"
      @change="$_onPickerChange"
      @confirm="$_onPickerConfirm"
      @cancel="$_onPickerCancel"
      @show="$_onPickerShow"
      @hide="$_onPickerHide"
    ></md-picker>
  </div>
</template>

<script>
import Picker from '../picker'
import pickerMixin from '../picker/mixins'
import {
  toObject,
  toArray,
  warn
} from '../_util'
import {t} from '../_locale'

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
const TYPE_FORMAT = {
  'yyyy': 'Year',
  'MM': 'Month',
  'dd': 'Date',
  'HH': 'Hour',
  'hh': 'Hour',
  'mm': 'Minute'
}

const TYPE_FORMAT_INVERSE = toObject(
  Object.keys(TYPE_FORMAT).map(item => {
    return {
      [TYPE_FORMAT[item]]: item
    }
  })
)

const TYPE_METHODS = {
  'Year': 'getFullYear',
  'Month': 'getMonth',
  'Date': 'getDate',
  'Hour': 'getHours',
  'Minute': 'getMinutes'
}

export default {
  name: 'md-date-picker',

  mixins: [pickerMixin],

  components: {
    [Picker.name]: Picker
  },

  props: {
    type: { // date, time, datetime， custom
      type: String,
      default: 'date'
    },
    customTypes: { // yyyy, MM, dd, hh, mm
      type: Array,
      default () {
        return []
      },
      validator (val) {
        let res = true
        val.forEach(type => {
          type = TYPE_FORMAT[type] || type
          /* istanbul ignore if */
          if (!(type in TYPE_METHODS)) {
            return (res = false)
          }
        })
        return res
      }
    },
    minDate: {
      type: Date
    },
    maxDate: {
      type: Date
    },
    defaultDate: {
      type: Date
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    unitText: {
      type: Array,
      default () {
        return [
          t('md.date_picker.year'),
          t('md.date_picker.month'),
          t('md.date_picker.day'),
          t('md.date_picker.hour'),
          t('md.date_picker.minute'),
        ]
      }
    },
    todayText: {
      type: String,
      default: ''
    },
    textRender: {
      type: [Function, String],
      default: ''
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false
    // },
    // title: {
    //   type: String
    // },
    // describe: {
    //   type: String
    // },
    // okText: {
    //   type: String
    // },
    // cancelText: {
    //   type: String
    // },
    // isView: {
    //   type: Boolean,
    //   default: false
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // }
  },

  data () {
    return {
      isPickerShow: false,
      currentDateIns: new Date(),
      columnData: [],
      oldColumnData: null,
      columnDataDefault: [],
      columnDataGenerator: [],
    }
  },

  computed: {
    picker () {
      return this.$refs['picker']
    },
    currentYear () {
      return this.currentDateIns.getFullYear()
    },
    currentMonth () {
      return this.currentDateIns.getMonth() + 1
    },
    currentDate () {
      return this.currentDateIns.getDate()
    },
    currentHours () {
      return this.currentDateIns.getHours()
    },
    currentMinutes () {
      return this.currentDateIns.getMinutes()
    }
  },

  watch: {
    value (val) {
      this.isPickerShow = val
    },
    isPickerShow (val) {
      if (!val) {
        this.$emit('input', val)
      }
    },
    defaultDate () {
      this.$_initPickerColumn()
    },
    minDate () {
      this.$_initPickerColumn()
    },
    maxDate () {
      this.$_initPickerColumn()
    }
  },

  mounted () {
    this.$_initPicker()
  },

  methods: {
    // MARK: private methods
    $_initPicker () {
      if (!this.isView && this.value) {
        this.isPickerShow = this.value
      }

      this.picker.inheritPickerApi(this)
      this.$_initPickerColumn()
    },
    $_initPickerColumn () {
      this.$_resetPickerColumn()
      this.$_initColumnDataGenerator()
      this.$_initColumnData(0, this.columnDataDefault)
    },
    $_resetPickerColumn() {
      this.oldColumnData = null
      this.columnData = []
      this.columnDataDefault = []
      this.columnDataGenerator = []
    },
    $_initColumnData (columnIndex, defaultDate = [], isSetColumn = true) {
      const columnData = this.columnData
      const columnDataGenerator = this.columnDataGenerator
      for (let i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
        // Collect parameters for columnDataGenerator
        const columnDataGeneratorParams = []
        const generator = columnDataGenerator[i]
        for (let j = 0; j < i; j++) {
          const _generator = columnDataGenerator[j]
          if (defaultDate[j] && _generator) {
            columnDataGeneratorParams.push({
              type: _generator.type,
              value: defaultDate[j]
            })
            continue
          }

          const itemIndex = this.picker.getColumnIndex(j) || 0
          /* istanbul ignore else */
          if (columnData[j]) {
            columnDataGeneratorParams.push(columnData[j][itemIndex])
          } else {
            columnDataGeneratorParams.push('')
            warn(`DatePicker columnData of index ${j} is void`)
          }
        }

        // Generator colume data with columnDataGeneratorParams
        const curColumnData = generator ? generator.apply(this, columnDataGeneratorParams) : ''

        // set picker column data & refresh picker
        isSetColumn && this.picker.setColumnValues(i, curColumnData)

        // store column date
        this.$set(columnData, i, curColumnData)
      }

      isSetColumn && this.picker.refresh(null, columnIndex)
    },
    $_initColumnDataGenerator () {
      this.$_generateYearData.type = 'Year'
      this.$_generateMonthData.type = 'Month'
      this.$_generateDateData.type = 'Date'
      this.$_generateHourData.type = 'Hour'
      this.$_generateMinuteData.type = 'Minute'

      const defaultDate = this.$_getDefaultDate()
      switch (this.type) {
        case 'date':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          break
        case 'time':
          this.$_initColumnDataGeneratorForTime(defaultDate)
          break
        case 'datetime':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          this.$_initColumnDataGeneratorForTime(defaultDate)
          break
        default:
          this.$_initColumnDataGeneratorForCustom(defaultDate)
          break
      }
    },
    $_initColumnDataGeneratorForDate (defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([
        this.$_generateYearData,
        this.$_generateMonthData,
        this.$_generateDateData
      ])

      this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([
        defaultDate.getFullYear(),
        defaultDate.getMonth() + 1,
        defaultDate.getDate()
      ]) : []
    },
    $_initColumnDataGeneratorForTime (defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([
        this.$_generateHourData,
        this.$_generateMinuteData
      ])
      this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([
        defaultDate.getHours(),
        defaultDate.getMinutes()
      ]) : []
    },
    $_initColumnDataGeneratorForCustom (defaultDate) {
      this.customTypes.forEach(type => {
        type = TYPE_FORMAT[type] || type
        this.columnDataGenerator.push(this[`$_generate${type}Data`])

        if (defaultDate) {
          let value = defaultDate[TYPE_METHODS[type]]()

          if (type === 'Month') {
            value += 1
          }

          this.columnDataDefault.push(value)
        }
      })
    },
    $_getDefaultDate () {
      const defaultDate = this.defaultDate
      const minDate = this.minDate
      const maxDate = this.maxDate

      if (!defaultDate) {
        return defaultDate
      }

      if (minDate && defaultDate.getTime() < minDate.getTime()) {
        return minDate
      }

      if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
        return maxDate
      }

      return defaultDate
    },
    $_getGeneratorArguments (args) {
      const defaultArguments = {
        Year: this.currentYear,
        Month: this.currentMonth,
        Date: this.currentDate,
        Hour: this.currentHours,
        Minute: this.currentMinutes
      }
      args.map(item => {
        item && (defaultArguments[item.type] = item.value)
      })
      return defaultArguments
    },
    $_generateYearData () {
      const start = this.minDate ? this.minDate.getFullYear() : this.currentYear - 20
      const end = this.maxDate ? this.maxDate.getFullYear() : this.currentYear + 20
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Year should be earlier than MaxDate')
        return
      }
      return this.$_generateData(start, end, 'Year', this.unitText[0], 1)
    },
    $_generateMonthData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDate, args.Year)) {
        start = this.minDate.getMonth() + 1
      } else {
        start = 1
      }

      if (this.$_isDateTimeEqual(this.maxDate, args.Year)) {
        end = this.maxDate.getMonth() + 1
      } else {
        end = 12
      }
      return this.$_generateData(start, end, 'Month', this.unitText[1] || '', 1, arguments)
    },
    $_generateDateData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))

      let start, end

      if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month)) {
        start = this.minDate.getDate()
      } else {
        start = 1
      }

      if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month)) {
        end = this.maxDate.getDate()
      } else {
        end = new Date(args.Year, args.Month, 0).getDate()
      }

      const dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments)

      if (this.$_isDateTimeEqual(this.currentDateIns, args.Year, args.Month) &&
          this.currentDate >= start && this.currentDate <= end &&
          this.todayText) {
        const currentDateIndex = this.currentDate - start
        const currentDate = dateData[currentDateIndex].text
        dateData[currentDateIndex].text = this.todayText.replace('&', currentDate)
      }

      return dateData
    },
    $_generateHourData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month, args.Date)) {
        start = this.minDate.getHours()
      } else {
        start = 0
      }

      if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month, args.Date)) {
          end = this.maxDate.getHours()
      } else {
        end = 23
      }

      /* istanbul ignore if */
      if (end < start) {
        end = 23
      }
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Hour should be earlier than MaxDate')
        return
      }

      return this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments)
    },
    $_generateMinuteData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month, args.Date, args.Hour)) {
        start = this.minDate.getMinutes()
      } else {
        start = 0
      }

      if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month, args.Date, args.Hour)) {
          end = this.maxDate.getMinutes()
      } else {
        end = 59
      }

      return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments)
    },
    $_generateData (from, to, type, unit, step = 1, args = []) {
      let count = from
      let text
      const data = []
      const defaultArgs = toArray(args).map(item => {
        return typeof item === 'object' ? item.value : item
      })

      while (count <= to) {
        this.textRender
        && (text = this.textRender.apply(this, [
            TYPE_FORMAT_INVERSE[type],
            ...defaultArgs,
            count
           ]))
        data.push({
          text: text || `${count}${unit}`,
          value: count,
          typeFormat: TYPE_FORMAT_INVERSE[type] || type,
          type
        })
        count += step
      }

      return data
    },
    /**
     * Determine whether year, month, date, etc of
     * the current date are equal to the given value
     * @params Date
     * @params year, month, date ...
     */
    $_isDateTimeEqual () {
      const methods = Object.keys(TYPE_METHODS).map(key => {
        return TYPE_METHODS[key]
      })
      const args = toArray(arguments)
      const date = args[0]

      let res = true
      if (!date) {
        return res = false
      }

      for (let i = 1; i < args.length; i++) {
        const methodName = methods[i - 1]
        const curVal = date[methodName]() + Number(methodName === 'getMonth')
        const targetVal = +args[i]

        if (curVal !== targetVal) {
          res = false
          break
        }
      }

      return res
    },

    // MARK: events handler
    $_onPickerShow () {
      this.oldColumnData = [...this.columnData]
      this.$emit('show')
    },
    $_onPickerHide () {
      this.$emit('hide')
    },
    $_onPickerChange (columnIndex, itemIndex, value) {
      this.$emit('change', columnIndex, itemIndex, value)

      if (columnIndex < this.columnData.length - 1) {
        this.$_initColumnData(columnIndex + 1)
      }
    },
    $_onPickerConfirm (columnsValue) {
      this.$emit('confirm', columnsValue)
    },
    $_onPickerCancel () {
      this.$emit('cancel')
      if (this.oldColumnData) {
        this.columnData = [...this.oldColumnData]
      }
    },

    getFormatDate (format = 'yyyy-MM-dd hh:mm') {
      const columnValues = this.picker.getColumnValues()

      columnValues.forEach(item => {
        /* istanbul ignore if */
        if (!item) {
          return
        }

        let value = item.value

        if (value < 10) {
          value = '0' + value
        }

        format = format.replace('HH', 'hh') // deal with HH as hh
        format = format.replace(item.type, value)
        format = format.replace(TYPE_FORMAT_INVERSE[item.type], value)
      })

      return format
    }
  }
}
</script>

<style lang="stylus">
.md-date-picker
  .column-item
    font-size date-picker-font-size !important
    overflow visible !important
  // &.datetime .column-item
  //   font-size date-time-picker-font-size !important
</style>

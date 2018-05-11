<template>
  <div class="md-date-picker" :class="[type]">
    <md-picker
      ref="picker"
      v-model="isPickerShow"
      :data="columnData"
      :cols="columnData.length"
      :default-value="columnDataDefault"
      :title="title"
      :ok-text="okText"
      :cancel-text="cancelText"
      :is-view="isView"
      @initialed="$emit('initialed')"
      @change="$_onPickerChange"
      @confirm="$_onPickerConfirm"
      @show="$_onPickerShow"
      @hide="$_onPickerHide"
    ></md-picker>
  </div>
</template>

<script>
import Picker from '../picker'
import {
  toObject,
  warn
} from '../_util'

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
const TYPE_FORMAT = {
  'yyyy': 'Year',
  'MM': 'Month',
  'dd': 'Date',
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

  components: {
    [Picker.name]: Picker
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
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
        return ['年', '月', '日', '时', '分']
      }
    },
    todayText: {
      type: String,
      default: ''
    },
    halfDayText: {
      type: Array,
      default () {
        return ['上午', '下午']
      }
    },
    textRender: {
      type: [Function, String],
      default: ''
    },
    isTwelveHours: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    isView: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isPickerShow: false,
      currentDateIns: new Date(),
      columnData: [],
      columnDataDefault: [],
      columnDataGenerator: [],
      disabledCascadeComlumnIndex: [] // columns do not need cascading 
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
      this.$_initColumnDataGenerator()
      this.$_initColumnData(0, this.columnDataDefault, false)
    },
    $_initColumnData (columnIndex, defaultDate = [], isSetColumn = true) {
      const columnData = this.columnData
      const columnDataGenerator = this.columnDataGenerator
      for (let i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
        // Collect parameters for columnDataGenerator
        const columnDataGeneratorParams = []
        const generator = columnDataGenerator[i]

        for (let j = 0; j < i; j++) {
          if (defaultDate[j]) {
            columnDataGeneratorParams.push(defaultDate[j])
            continue
          }

          const itemIndex = this.picker.getColumnIndex(j) || 0
          if (columnData[j]) {
            columnDataGeneratorParams.push(columnData[j][itemIndex]['value'])
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
      const defaultDate = this.defaultDate     
      switch (this.type) {
        case 'date':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          break
        case 'time':
          this.$_initColumnDataGeneratorForTime(defaultDate)
          this.disabledCascadeComlumnIndex = [0, 1, 2]
          break
        case 'datetime':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          this.$_initColumnDataGeneratorForTime(defaultDate)
          this.disabledCascadeComlumnIndex = [2, 3, 4, 5]
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

      if (this.isTwelveHours) {
        this.columnDataGenerator.push(this.$_generateAPData)
        if (defaultDate) {
          const hourInfo = this.$_transHourTo12(defaultDate.getHours())
          this.columnDataDefault = this.columnDataDefault.concat([
            hourInfo.hour,
            defaultDate.getMinutes(),
            hourInfo.ap
          ])
        }
      } else {
        this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([
          defaultDate.getHours(),
          defaultDate.getMinutes()
        ]) : []
      }
    },
    $_initColumnDataGeneratorForCustom (defaultDate) {
      let hourInfo
      this.customTypes.forEach((type, index) => {
        type = TYPE_FORMAT[type] || type
        if (type === 'Date' || type === 'Hour' || type === 'Minute') {
          this.disabledCascadeComlumnIndex.push(index)
        }
        this.columnDataGenerator.push(this[`$_generate${type}Data`])

        if (defaultDate) {
          let value = defaultDate[TYPE_METHODS[type]]()
          
          if (type === 'Month') {
            value += 1
          }

          if (this.isTwelveHours && type === 'Hour') {
            hourInfo = this.$_transHourTo12(value)
            value = hourInfo.hour
          }
          this.columnDataDefault.push(value)
        }
      })

      if (this.isTwelveHours && ~this.customTypes.indexOf('Hour')) {
        this.columnDataGenerator.push(this.$_generateAPData)
        this.columnDataDefault.push(hourInfo.ap)
      }
    },
    $_generateYearData () {
      const start = this.minDate ? this.minDate.getFullYear() : this.currentYear - 20
      const end = this.maxDate ? this.maxDate.getFullYear() : this.currentYear + 20
      if (start > end) {
        warn('MinDate Year should be earlier than MaxDate')
        return
      }
      return this.$_generateData(start, end, 'Year', this.unitText[0], 1)
    },
    $_generateMonthData (year = this.currentYear) {
      let start, end

      if (this.minDate && this.minDate.getFullYear() === year) {
        start = this.minDate.getMonth() + 1
      } else {
        start = 1
      }

      if (this.maxDate && this.maxDate.getFullYear() === year) {
        end = this.maxDate.getMonth() + 1
      } else {
        end = 12
      }

      return this.$_generateData(start, end, 'Month', this.unitText[1] || '')
    },
    $_generateDateData (year = this.currentYear, month = this.currentMonth) {
      let start, end

      if (this.minDate &&
          this.minDate.getFullYear() === year &&
          this.minDate.getMonth() + 1 === month) {
        start = this.minDate.getDate()
      } else {
        start = 1
      }
      
      if (this.maxDate &&
          this.maxDate.getFullYear() === year &&
          this.maxDate.getMonth() + 1 === month) {
        end = this.maxDate.getDate()
      } else {
        end = new Date(year, month, 0).getDate()
      }

      const dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments)

      if (year === this.currentYear && month === this.currentMonth && 
          this.currentDate >= start && this.currentDate <= end &&
          this.todayText) {
        const currentDateIndex = this.currentDate - start
        const currentDate = dateData[currentDateIndex].text
        dateData[currentDateIndex].text = this.todayText.replace('&', currentDate)
      }

      return dateData
    },
    $_generateHourData () {
      let start = this.minDate ? this.minDate.getHours() : 0
      let end = this.maxDate ? this.maxDate.getHours() : 23

      if (end < start) {
        end = 23
      }

      if (this.isTwelveHours) {
        start = this.$_transHourTo12(start).hour
        end = this.$_transHourTo12(end).hour
      }
      
      if (start > end) {
        warn('MinDate Hour should be earlier than MaxDate')
        return
      }

      const hoursData = this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments)

      if (this.isTwelveHours && hoursData[0].value === 0) {
        let text
        if (this.textRender) {
          text = this.textRender.apply(this, [
            TYPE_FORMAT_INVERSE['Hour'],
            ...arguments,
            12
          ])
        }
        hoursData[0].text = text || `12${this.unitText[3] || ''}`
      }

      return hoursData
    },
    $_generateMinuteData () {
      const start = this.minDate ? this.minDate.getMinutes() : 0
      const end = this.maxDate ? this.maxDate.getMinutes() : 59
      return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments)
    },
    $_generateAPData () {
      return [{
        text: this.halfDayText[0],
        type: 'HalfDay',
        typeFormat: 'HalfDay',
        value: 0
      }, {
        text: this.halfDayText[1],
        type: 'HalfDay',
        typeFormat: 'HalfDay',
        value: 1
      }]
    },
    $_generateData (from, to, type, unit, step = 1, args) {
      let count = from
      let text
      const data = []

      args = args || []

      while (count <= to) {
        this.textRender 
        && (text = this.textRender.apply(this, [
            TYPE_FORMAT_INVERSE[type],
            ...args,
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
    $_transHourTo12 (hour) {
      if (hour < 12) {
        return {
          hour,
          ap: 0 // 0 a.m, 1 p.m
        }
      } else {
        return {
          hour: hour - 12,
          ap: 1 // 0 a.m, 1 p.m
        }
      }
    },

    // MARK: events handler
    $_onPickerShow () {
      this.$emit('show')
    },
    $_onPickerHide () {
      this.$emit('hide')
    },
    $_onPickerChange (columnIndex, itemIndex, value) {
      this.$emit('change', columnIndex, itemIndex, value)

      // column of time parts do not need cascading
      if (~this.disabledCascadeComlumnIndex.indexOf(columnIndex)) {
        return
      }

      if (columnIndex < this.columnData.length - 1) {
        this.$_initColumnData(columnIndex + 1)
      }
    },
    $_onPickerConfirm (columnsValue) {
      this.$emit('confirm', columnsValue)
    },

    getFormatDate (format = 'yyyy-MM-dd hh:mm') {
      const columnValues = this.picker.getColumnValues()
      let hourTo24 = false

      if (this.isTwelveHours) {
        const halfHour = [...columnValues].splice(columnValues.length - 1, 1)[0]
        halfHour.value && (hourTo24 = true)
      }

      columnValues.forEach(item => {
        /* istanbul ignore if */
        if (!item) {
          return
        }

        let value = hourTo24 && item.type === 'Hour' ? item.value + 12 : item.value

        if (value < 10) {
          value = '0' + value
        }

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
  &.datetime .column-item
    font-size date-time-picker-font-size !important
</style>

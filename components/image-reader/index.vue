<template>
  <div class="md-image-reader">
    <input
      class="md-image-reader-file"
      type="file"
      :key="inputTmpKey"
      :name="name"
      :accept="mimeType"
      :capture="isCameraOnly"
      :multiple="isMultiple"
      @change="$_onFileChange"/>
  </div>
</template>

<script>import createImageReader from './image-reader'
import {dataURItoBlob} from './image-dataurl'
import {functionToUrl, randomId} from '../_util'

const ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit',
}

export default {
  name: 'md-image-reader',

  props: {
    name: {
      type: String,
      default() {
        return randomId('image-reader')
      },
    },
    size: {
      type: [String, Number],
      default: 0,
    },
    mime: {
      type: Array,
      default() {
        return []
      },
    },
    isCameraOnly: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      inputTmpKey: Date.now(), // trigger of refreshing input file
    }
  },

  computed: {
    mimeType() {
      if (this.mime.length) {
        let mimeStr = ''
        this.mime.forEach(type => {
          mimeStr += `image/${type},`
        })
        return mimeStr.substring(0, mimeStr.length - 1)
      } else {
        return 'image/*'
      }
    },
  },

  methods: {
    // MARK: private methods
    $_emitter(event, data) {
      this.$emit(event, this.name, data)
    },
    $_openWebWorker(fn) {
      /* istanbul ignore next */
      return new Worker(functionToUrl(fn))
    },
    $_closeWebWorker(worker) {
      /* istanbul ignore next */
      worker.terminate()
    },
    $_readFile(fileElement) {
      const size = +this.size * 1000
      const files = fileElement.files
      let worker
      let count = 0

      /* istanbul ignore if */
      if (window.Worker) {
        worker = this.$_openWebWorker(createImageReader)
        // worker send
        worker.postMessage({
          files,
          size: size,
          isWebWorker: true,
        })
        // worker response
        worker.onmessage = evt => {
          this.$_onReaderComplete(evt.data)

          count++

          // shut down worker after all files have been read
          if (count === files.length) {
            this.$_closeWebWorker(worker)
          }
        }
      } else {
        // generate imageReader
        const imageReader = createImageReader(window)
        imageReader({
          files,
          size: size,
          isWebWorker: false,
          complete: this.$_onReaderComplete,
        })
      }
    },
    $_cleaeFile() {
      this.inputTmpKey = Date.now()
    },

    // MARK: events handler
    $_onFileChange(event) {
      const fileElement = event.target

      /* istanbul ignore next */
      if (fileElement.files && fileElement.files.length) {
        this.$_emitter('select', {
          files: Array.prototype.slice.call(fileElement.files),
        })

        // error 超出每次上传最大张数
        if (this.amount && fileElement.files.length > this.amount) {
          this.$_emitter('error', {
            code: '103',
            msg: ERROR['103'],
          })
          this.$_cleaeFile()
          return
        }

        this.$_readFile(fileElement)
      }
    },
    $_onReaderComplete({errorCode, dataUrl, file}) {
      if (errorCode) {
        this.$_emitter('error', {
          code: errorCode,
          msg: ERROR[errorCode],
        })
        return
      }

      this.$_emitter('complete', {
        blob: dataURItoBlob(dataUrl),
        dataUrl: dataUrl,
        file,
      })
      this.$_cleaeFile()
    },
  },
}
</script>

<style lang="stylus">
.md-image-reader
  position absolute
  width 100%
  height 100%
  z-index 100
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)

.md-image-reader-file
  position absolute
  width 100%
  height 100%
  opacity 0
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)
</style>

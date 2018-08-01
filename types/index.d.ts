import Vue from 'vue'
import { MandComponent } from './component'
import { Toast } from './toast'
import { Dialog } from './dialog'
import { ActionSheet } from './action-sheet'

export function install(vue: typeof Vue): void

export class ActivityIndicator extends MandComponent { }
export class Amount extends MandComponent { }
export class ActionBar extends MandComponent { }
export class Agree extends MandComponent { }
export class Button extends MandComponent { }
export class Captcha extends MandComponent { }
export class Cashier extends MandComponent { }
export class Chart extends MandComponent { }
export class Codebox extends MandComponent { }
export class CheckGroup extends MandComponent { }
export class CheckBox extends MandComponent { }
export class CheckList extends MandComponent { }
export class DatePicker extends MandComponent { }
export class DropMenu extends MandComponent { }
export class Field extends MandComponent { }
export class FieldItem extends MandComponent { }
export class Icon extends MandComponent { }
export class ImageReader extends MandComponent { }
export class ImageViewer extends MandComponent { }
export class InputItem extends MandComponent { }
export class Landscape extends MandComponent { }
export class NoticeBar extends MandComponent { }
export class NumberKeyboard extends MandComponent { }
export class Picker extends MandComponent { }
export class Popup extends MandComponent { }
export class PopupTitleBar extends MandComponent { }
export class Radio extends MandComponent { }
export class ResultPage extends MandComponent { }
export class Selector extends MandComponent { }
export class Stepper extends MandComponent { }
export class Steps extends MandComponent { }
export class Swiper extends MandComponent { }
export class SwiperItem extends MandComponent { }
export class Switch extends MandComponent { }
export class ScrollView extends MandComponent { }
export class ScrollViewMore extends MandComponent { }
export class ScrollViewRefresh extends MandComponent { }
export class TabBar extends MandComponent { }
export class TabPicker extends MandComponent { }
export class Tabs extends MandComponent { }
export class Tag extends MandComponent { }
export class Tip extends MandComponent { }


// declare module 'mand-mobile/lib/image-reader/image-processor' {
//   export = imageProcessor
//   /**
//    * export image processor options
//    */
//   export interface ImageProcessorOptions extends imageProcessor.ImageProcessorOptions { }
//   export interface ImageProcessorData extends imageProcessor.ImageProcessorData { }
// }

export {
  Toast,
  Dialog,
  ActionSheet
}

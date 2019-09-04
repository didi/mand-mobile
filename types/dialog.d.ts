import Vue from 'vue'
import { MandComponent } from './component'

export type DialogOptions = {
  title?: string
  content?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
  onShow?: () => void
  onHide?: () => void
}

export type DialogAlertOptions = {
  icon?: string,
  closable?: boolean,
} & DialogOptions

export type DialogConfirmOptions = {
  cancelText?: string
} & DialogAlertOptions

export type DialogSucceedOptions = {
  cancelText?: string,
  closable?: boolean,
} & DialogOptions

export type DialogFailedOptions = DialogSucceedOptions

export interface IDialog {
  confirm(options: DialogConfirmOptions): Vue
  alert(options: DialogAlertOptions): Vue
  succeed(options: DialogSucceedOptions): Vue
  failed(options: DialogFailedOptions): Vue
  closeAll(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: IDialog
  }
}

export class Dialog extends MandComponent {
  static confirm(options: DialogConfirmOptions): Vue
  static alert(options: DialogAlertOptions): Vue
  static succeed(options: DialogSucceedOptions): Vue
  static failed(options: DialogFailedOptions): Vue
  static closeAll(): void
}

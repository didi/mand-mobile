import Vue from 'vue'

export type DialogOptions = {
  title?: string
  content?: string
  confirmText?: string
  onConfirm?: () => void
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

export interface Dialog {
  (options?: any): void
  confirm(options: DialogConfirmOptions): Vue
  alert(options: DialogAlertOptions): Vue
  succeed(options: DialogSucceedOptions): Vue
  failed(options: DialogFailedOptions): Vue
  closeAll(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: Dialog
  }
}

export const Dialog: Dialog

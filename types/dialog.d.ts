import Vue from 'vue'

export type DialogOptions = {
  title?: string
  content?: string
  confirmText?: string
  onConfirm?: () => void
}

export type DialogAlertOptions = {
  icon?: string
} & DialogOptions


export type DialogConfirmOptions = {
  cancelText?: string
} & DialogAlertOptions

export interface Dialog {
  confirm(options: DialogConfirmOptions): Vue
  alert(options: DialogAlertOptions): Vue
  succeed(options: DialogOptions): Vue
  failed(options: DialogOptions): Vue
  close(): void
}

export const Dialog: Dialog
import Vue from 'vue'

export type ActionSheetItem = {
  value: string,
  text: string
}

export type ActionSheetCreateOptions = {
  value?: boolean,
  title?: string,
  options: Array<ActionSheetItem>,
  defaultIndex?: number,
  invalidIndex?: number,
  cancelText?: string,
  maxHeight?: number,
  onShow?: () => void,
  onHide?: () => void,
  onSelected?: (item: ActionSheetItem) => void,
}

export interface ActionSheet {
  (options?: ActionSheetCreateOptions): void
  create(options: ActionSheetCreateOptions): Vue
  closeAll(): void
  destroyAll(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $sheet: ActionSheet
  }
}

export const ActionSheet: ActionSheet

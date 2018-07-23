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
  create(options: ActionSheetCreateOptions): Vue
  closeAll(): void
  destroyAll(): void
}

export const ActionSheet: ActionSheet

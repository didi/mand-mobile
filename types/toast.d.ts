import { MandComponent } from './component'

export type ToastOptions = {
  content: string
  duration?: number
  parentNode?: Element
  hasMask?: boolean
  square?: boolean
}

export type ToastConstructorOptions = {
  icon?: string,
  position?: string
} & ToastOptions

export interface Toast {
  (options?: ToastConstructorOptions): void
  info(content: string, duration?: number, hasMask?: boolean, parentNode?: Element, square?: boolean): void
  succeed(content: string, duration?: number, hasMask?: boolean, parentNode?: Element, square?: boolean): void
  failed(content: string, duration?: number, hasMask?: boolean, parentNode?: Element, square?: boolean): void
  loading(content: string, duration?: number, hasMask?: boolean, parentNode?: Element, square?: boolean): void
  hide(): void
  component: MandComponent
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

export const Toast: Toast

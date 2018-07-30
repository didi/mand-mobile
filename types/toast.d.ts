export type ToastOptions = {
  content: string
  duration?: number
  parentNode?: Element,
  hasMask?: boolean
}

export type ToastConstructorOptions = {
  icon?: string,
  position?: string
} & ToastOptions

export interface Toast {
  (options?: ToastConstructorOptions): void
  info(content: string, duration?: number, hasMask?: boolean, parentNode?: Element): void
  succeed(content: string, duration?: number, hasMask?: boolean, parentNode?: Element): void
  failed(content: string, duration?: number, hasMask?: boolean, parentNode?: Element): void
  loading(content: string, duration?: number, hasMask?: boolean, parentNode?: Element): void
  hide(): void
}

export const Toast: Toast

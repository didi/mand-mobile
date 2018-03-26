export type ToastOptions = {
  content: string
  duration: number
  parentNode: Element
}

export type ToastConstructorOptions = {
  icon: string
} & ToastOptions

export interface Toast {
  (options?: ToastConstructorOptions): void
  succeed(options?: ToastOptions): void
  failed(options?: ToastOptions): void
  loading(options?: ToastOptions): void
  hide(): void
}

export const Toast: Toast
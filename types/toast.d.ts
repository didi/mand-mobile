export type ToastOptions = {
  content: string
  duration: number
  parentNode: Element,
  hasMask?: boolean
}

export type ToastConstructorOptions = {
  icon: string,
  position?: string
} & ToastOptions

export interface Toast {
  (options?: ToastConstructorOptions): void
  info(options?: ToastOptions): void
  succeed(options?: ToastOptions): void
  failed(options?: ToastOptions): void
  loading(options?: ToastOptions): void
  hide(): void
}

export const Toast: Toast

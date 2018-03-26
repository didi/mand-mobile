import {isProd} from './env'

export const warn = (msg, fn = 'error') => {
  !isProd && console[fn](`[Mand-Mobile]: ${msg}`)
}

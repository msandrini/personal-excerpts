/* DATE */

type DMYDate = [number, number, number]
export const dateStringToDayMonthYear = (date: string): DMYDate => {
  const dateExtractRegex = /(\d{4})-(\d{2})-(\d{2})/
  const [, yearString, monthString, dayString] = date.match(dateExtractRegex)
  return [Number(dayString), Number(monthString), Number(yearString)]
}

/* FORMAT */

export const leadingZeroes = (num: number, places = 2): string => String(num).padStart(places, '0')
export const numberToLocaleFormat = (number: number): string => {
  if (number === null) return ''
  return number.toLocaleString('de-DE', { useGrouping: true })
}
export const numberToCurrencyString = (number: number): string => {
  if (number === null) return ''
  const currency = number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
  // the formatting that comes from this is "0,00 €" so we have to cut the currency symbol
  return currency.substring(0, currency.length - 2)
}

/* SORT */

export const sortString = (a: string, b: string): number => {
  const aU = a.toUpperCase()
  const bU = b.toUpperCase()
  return aU.localeCompare(bU, 'de') // Language can be tweaked
}
export function sortByKey<T> (key: string) {
  return (a: T, b: T): number => sortString(a[key], b[key])
}

/* HOOKS */

import { useRef, useEffect } from 'react'

export function usePrevious<T> (value: T): T {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/* COPY */

export const copyToClipboard = async (valueToCopy: string): Promise<void> => {
  /**
   * Worthy to notice:
   * - for now Firefox doesn't like asking for permissions, but it may like or even *require* it at some point
   * (so I would recomment not to delete the permissions code below, as it would be easy to implement it later)
   * - **Safari doesn't copy anything** (should be addressed if important)
   * - Chrome copies with or without permission, as long as the webapp is secure (running in HTTPS)
   */
  // const permissionsQueryOptions: PermissionDescriptor = { name: 'clipboard-write' as PermissionName }
  // const result = await navigator.permissions.query(permissionsQueryOptions)
  // if (result.state === 'granted' || result.state === 'prompt') {
  navigator.clipboard.writeText(valueToCopy)
  // }
}

/* DOM */

export const getYOffset = (element: HTMLElement): number => {
  if (!element) return 0
  const offset = element.offsetParent as HTMLElement
  return getYOffset(offset) + element.offsetTop
}
export const scrollToPoint = (scrollOffset: number): void => {
  const centerOfScreen = Math.floor(window.innerHeight / 2)
  const newScrollTop = Math.abs(centerOfScreen - scrollOffset)
  window.scrollTo({ top: newScrollTop, left: 0, behavior: 'smooth' })
}

/* BROWSER DETECT */

declare global {
  interface Window { safari: { pushNotification: Record<string, unknown> } }
  interface Document { documentMode: unknown }
}

export const browserDetection = {
  /* eslint-disable spaced-comment */
  isIE: (): boolean => /*@cc_on!@*/false || !!window.document.documentMode,
  isSafari: (): boolean => window.safari && window.safari.pushNotification &&
    window.safari.pushNotification.toString() === '[object SafariRemoteNotification]'
}
/* DATE */

type DMYDate = [number, number, number]
export const dateStringToDayMonthYear = (date: string): DMYDate => {
  const dateExtractRegex = /(\d{4})-(\d{2})-(\d{2})/
  const [, yearString, monthString, dayString] = date.match(dateExtractRegex)
  return [Number(dayString), Number(monthString), Number(yearString)]
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
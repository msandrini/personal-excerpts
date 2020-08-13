import { createElement, ReactNode } from 'react'

export const mockComponentWithProps = (component: string, wrapIn: string | [string, string] = null) =>
  (props = {}): ReactNode => {
    const getPropAttribute = (key: string, value: any) => {
      if (typeof value === 'function') return ` ${key}=fn(${value.name})`
      if (typeof value === 'undefined') return ''
      if (typeof value === 'string') return ` ${key}="${value}"`
      if (value === true) return ` ${key}`
      const stringValue = JSON.stringify(value, undefined, 1).replace(/"/g, '')
      return ` ${key}=${stringValue}`
    }
    const attributes = Object.entries(props).map(([key, value]) => getPropAttribute(key, value))
    const mockStr = `((Mock:${component}${attributes.join('')}))`
    if (!wrapIn) return mockStr
    if (Array.isArray(wrapIn as [string, string])) {
      return createElement(wrapIn[0], null, createElement(wrapIn[1], null, mockStr))
    }
    return createElement(wrapIn as string, null, mockStr)
  }
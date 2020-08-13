import './typings.d'

/* Using this lib called "mockdate" */

import MockDate from 'mockdate'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
}

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
}

export interface Global extends NodeJS.Global {
  document: Document
  window: Window
  localStorage: Storage
  sessionStorage: Storage
  innerHeight: number
  innerWidth: number
  mockTimestamp: number
  Date: DateConstructor
}
declare const global: Global

// runs in node - instead of window we use the `global`.
delete global.localStorage
global.localStorage = localStorageMock
delete global.sessionStorage
global.sessionStorage = sessionStorageMock
delete global.innerHeight
global.innerHeight = 999
delete global.innerWidth
global.innerWidth = 888

// Date and time
global.mockTimestamp = 1519858804000 // 2018-03-01

MockDate.set(global.mockTimestamp)

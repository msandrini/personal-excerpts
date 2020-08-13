// Types and Interfaces

export type DMYDate = [number, number, number]

export interface Range {
  start?: DMYDate
  end?: DMYDate
}

// Enums

export enum RangeMarker {
  START = 'start',
  END = 'end'
}

enum LogLevel { ERROR, WARN, INFO, DEBUG }
const enum Directions { UP, DOWN, LEFT, RIGHT } // Cannot have computed members
const enum Constants { A = '1', B = '2' } // Alternative way to write constants

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

export interface CallReturn<T> {
  error?: string
  data?: T
}

type Children = React.ReactNode // Recommended for when you can have null|string|Node

type AnyObject = Record<string, unknown>
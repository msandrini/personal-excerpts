import { useRef, useEffect, RefObject, MutableRefObject } from 'react'

interface NewEventsMap {
  orientationchange: Event
  online: Event
  offline: Event
}

interface AllEventMap extends HTMLElementEventMap, NewEventsMap {
}

export type Handler<E, Fallback> = E extends keyof AllEventMap ?
  (e: AllEventMap[E]) => any : Fallback

/**
 * All params have ref stability, so you don't need to worry
 * about having to use useCallback or useMemo (unless you really need it).
 * Cleans up the event listener upon unmount / re-render
 */
export default function useEventListener<
  EventName extends keyof AllEventMap,
  EventHandler extends (e: Event) => any
> (
  eventName: EventName,
  handler: Handler<EventName, EventHandler>,
  /** Fallsback to globalThis or window if none provided. throws if nothing is available */
  element?: EventTarget | HTMLElement | Window | Document | typeof globalThis | RefObject<any> | MutableRefObject<any> | null,
  options?: AddEventListenerOptions
): void {
  let isRef = false

  if (typeof element === 'undefined' || !element) {
    /* istanbul ignore else */
    if (typeof globalThis !== 'undefined') {
      element = globalThis
    } else if (typeof window !== 'undefined') {
      element = window
    } else {
      throw new Error('no valid element for useEventListener')
    }
  } else if ('current' in element) {
    isRef = true
  }

  const savedHandler = useRef<Handler<EventName, EventHandler>>()
  savedHandler.current = handler

  const currentOptions = useRef<EventListenerOptions>()
  currentOptions.current = options

  useEffect(() => {
    const capturedEventName = eventName
    const capturedOptions = currentOptions.current
    let capturedElement: EventTarget | null = null

    if (isRef) {
      capturedElement = (element as RefObject<any>).current
    } else if (element && ('addEventListener' in element)) {
      capturedElement = element as EventTarget
    }

    if (!capturedElement || !capturedEventName) {
      return
    }

    const eventListener: EventListener = (event) => {
      if (savedHandler.current) {
        savedHandler.current(event as any)
      }
    }

    capturedElement.addEventListener(capturedEventName, eventListener, capturedOptions)

    return () => {
      capturedElement?.removeEventListener(capturedEventName, eventListener, capturedOptions)
    }
  }, [eventName, element, savedHandler, currentOptions, isRef])
}

import * as React from 'react'
import { debounce } from 'ts-debounce'

import useEventListener from './useEventListener'

interface DragReference {
  position: number
  scroll: number
}

interface UseMouseDragOptions {
  isHorizontal?: boolean
  refreshDelay?: number
  snapPoints?: number[]
}

type ScrollAreaElement = HTMLDivElement | HTMLUListElement | HTMLLIElement | null

export default function useMouseDrag (
  element: ScrollAreaElement,
  options: UseMouseDragOptions = {}
): [boolean] {
  const { useEffect, useState } = React

  const {
    isHorizontal = true,
    refreshDelay = 5,
    snapPoints = []
  } = options

  const hasMouse = window.matchMedia('(hover: hover)').matches

  // State

  const [dragReference, setDragReference] = useState<DragReference | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Helpers

  const getScrollPosition = (): number => {
    const attribute = isHorizontal ? 'scrollLeft' : 'scrollTop'
    if (element) return element[attribute]
    return 0
  }

  const getScrollToOptions = (position: number): ScrollToOptions => {
    const key = isHorizontal ? 'left' : 'top'
    return { [key]: position, behavior: 'smooth' }
  }

  const getClientPosition = (event: MouseEvent): number => {
    const attribute = isHorizontal ? 'clientX' : 'clientY'
    if (event) return event[attribute]
    return 0
  }

  // Effects

  useEffect(() => {
    if (element) {
      if (isDragging) element.classList.add('is-dragging')
      else element.classList.remove('is-dragging')
    }
  }, [element, isDragging])

  // Handlers

  const endDrag = (): void => {
    setDragReference(null)
    setIsDragging(false)
    if (snapPoints.length) {
      const goal = getScrollPosition()
      const closerPoint = snapPoints.reduce((prev, current) =>
        Math.abs(current - goal) < Math.abs(prev - goal) ? current : prev, 0)
      element?.scrollTo(getScrollToOptions(closerPoint))
    }
  }

  const handleMouseDown = (event: MouseEvent): void => {
    if (!hasMouse) return
    setDragReference({
      scroll: getScrollPosition(),
      position: getClientPosition(event)
    })
  }

  const handleMouseMove = (event: MouseEvent): void => {
    if (!hasMouse) return
    if (dragReference && element) {
      const delta = getClientPosition(event) - dragReference.position
      const scrollKey = isHorizontal ? 'scrollLeft' : 'scrollTop'
      element[scrollKey] = dragReference.scroll - delta
      setIsDragging(true)
    }
  }

  const handleMouseLeave = (): void => {
    if (!hasMouse) return
    endDrag()
  }

  const handleMouseUp = (event: MouseEvent): void => {
    if (!hasMouse) return
    if (element?.contains(event.target as Node)) {
      // This timeout is here so the click event triggers before this
      setTimeout(endDrag, 80)
    }
  }

  useEventListener('mousedown', handleMouseDown, element)
  useEventListener('mousemove', debounce(handleMouseMove, refreshDelay), element)
  useEventListener('mouseleave', handleMouseLeave, element)
  useEventListener('mouseup', handleMouseUp, window)

  return [isDragging]
}

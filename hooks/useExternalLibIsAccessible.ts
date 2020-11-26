import React from 'react'

declare global {
  interface Window {
    [key: string]: unknown
  }
}

export default function useExternalLibIsAccessible(libName: string) {
  const { useState, useCallback, useEffect } = React

  const [libIsAccessible, setLibIsAccessible] = useState<boolean>(false)
  const [checkInterval, setCheckInterval] = useState(5)
  const [checkTimeout, setCheckTimeout] = useState<number | null>(null)

  const checkPlayer = useCallback(() => {
    if (window[libName]) {
      setLibIsAccessible(true)
      if (checkTimeout) clearTimeout(checkTimeout)
    } else if (!window[libName]) {
      const timeout = window.setTimeout(checkPlayer, checkInterval)
      setCheckInterval(interval => Math.pow(interval, 2))
      setCheckTimeout(timeout)
    }
  }, [checkInterval, checkTimeout, libName])

  useEffect(() => {
    checkPlayer()
  }, [checkPlayer])

  useEffect(() => {
    return () => {
      if (checkTimeout) clearTimeout(checkTimeout)
    }
  }, [checkTimeout])

  return [libIsAccessible]
} 

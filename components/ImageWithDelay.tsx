import * as React from 'react'
import { BooleanHook } from '../sharedTypes/stateHooks'

import LocalSpinner from './LocalSpinner'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  altText?: string,
  delay?: number
}

const ImageWithDelay = ({ src, altText = '', delay = 0 }: Props): JSX.Element => {
  const { useState, useEffect } = React

  const [delayHasPassed, setDelayStatus]: BooleanHook = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayStatus(true)
    }, delay)
    return () => clearTimeout(timeout)
  }, [])

  return delayHasPassed ?
    <img aria-label="delayed image" src={src} alt={altText} /> :
    <LocalSpinner />
}

export default ImageWithDelay

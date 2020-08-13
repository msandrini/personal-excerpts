/* When using FA react libs */

import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import './Component.sass'

interface Props {
  text: string
}

const Component = ({ text }: Props): JSX.Element => (
  <span className="component-body">
    {text}
    <FontAwesomeIcon icon={faExclamationTriangle} />
  </span>
)

export default Component


/* When not using FA React libs (just the normal css imports, with the CSS imported on root) */

import * as React from 'react'

export enum IconSize { SMALL = 'small', MEDIUM = 'medium', LARGE = 'large' }

type Props = {
  icon: string,
  size?: IconSize,
  isPanel?: boolean
}

const FAIcon = ({ icon, size = IconSize.MEDIUM, isPanel = false }: Props): JSX.Element => (
  <span className={`${isPanel ? 'panel-' : ''}icon is-${size}`}>
    <span className={`fas fa-${icon}`} />
  </span>
)

export default FAIcon

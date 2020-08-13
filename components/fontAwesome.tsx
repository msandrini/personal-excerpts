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

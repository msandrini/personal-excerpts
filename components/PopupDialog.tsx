import * as React from 'react'

import IconButton from './IconButton'

import './PopupDialog.sass'

interface Props {
  title?: string
  isShown?: boolean
  onClose: () => void
  children?: React.ReactNode
}

const PopupDialog = ({ title = '', isShown = false, onClose, children = null }: Props): JSX.Element => {
  const overlayElement = React.useRef(null)

  const proxyBubbling = (callback: () => void) => (e: React.MouseEvent) => {
    if (e.target === overlayElement.current) {
      callback()
    }
  }

  return isShown ? (
    <div className="popup-overlay" onClick={proxyBubbling(onClose)} ref={overlayElement}>
      <div className="popup-dialog">
        {!!title && (
          <header>
            <h3>{title}</h3>
            <IconButton icon="faTimes" altText="schließen" onClick={onClose} />
          </header>
        )}
        {children}
      </div>
    </div>
  ) : null
}

export default PopupDialog

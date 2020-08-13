import * as React from 'react'
import { render, waitFor } from '@testing-library/react'

import Component from './Component'

describe('Component', () => {
  describe('should match snapshot', () => {
    it('when rendering defaults', async () => {
      const tag = <Component prop={1} />
      const { container } = render(tag)
      expect(container).toMatchSnapshot()
    })
  })
})

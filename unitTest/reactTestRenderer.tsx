/* using react-test-renderer */

import React from 'react'
import Component from './Component'
import renderer from 'react-test-renderer'

describe('<Component>', () => {
  it('renders correctly', () => {
    const thisRenderer = renderer.create(<Component message="Sample Message" />)
    expect(thisRenderer.toJSON()).toMatchSnapshot()
  })
})

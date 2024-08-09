import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import React from 'react'
import App from '../src/App'

it('renders the heading with the correct class', () => {
  const { getByText } = render(<App />)
  const headingElement = getByText('Welcome To Create React Next')
  ;(expect(headingElement) as any).toBeInTheDocument()
})

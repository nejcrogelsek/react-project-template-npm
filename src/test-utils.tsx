import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

import AppProviders from './providers/app-providers'

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppProviders, ...options })

export * from '@testing-library/react'
export { render as cleanRender, customRender as render }

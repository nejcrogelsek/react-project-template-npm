// src/mocks/server.js
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers)

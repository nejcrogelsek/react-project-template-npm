// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { rest } from 'msw'

// method, path, function that returns mock response
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Lionel Messi',
        },
        {
          name: 'Jan Oblak',
        },
        {
          name: 'Hulk',
        },
      ]),
    )
  }),
]

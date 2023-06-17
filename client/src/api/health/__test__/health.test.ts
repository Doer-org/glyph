import 'cross-fetch/polyfill'
import { expect, test } from 'vitest'
import { healthCheck } from '../'

test('Health: Check', async () => {
  const resp = await healthCheck()
  expect(resp.type).toBe('ok')
})

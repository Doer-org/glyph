import { healthCheck } from '../'
import { expect, test } from 'vitest'

test('Health: Check', async () => {
  const resp = await healthCheck()
  expect(resp.type).toBe('ok')
})

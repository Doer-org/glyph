import { createUser, readUser, deleteUser } from '../'
import { expect, test } from 'vitest'

test('User: Create', async () => {
  const resp = await createUser({
    name: 'string',
    img: 'string',
  })
  expect(resp.type).toBe('ok')
})

test('User: Create => Read', async () => {
  const resp = await createUser({
    name: 'string',
    img: 'string',
  })
  if (resp.type === 'error') throw new Error('Create User failed')
  const resp2 = await readUser(resp.value.data.id)
  expect(resp2.type).toBe('ok')
})

test('User: Create => Delete', async () => {
  const resp = await createUser({
    name: 'string',
    img: 'string',
  })
  if (resp.type === 'error') throw new Error('Create User failed')
  const resp2 = await deleteUser(resp.value.data.id)
  expect(resp2.type).toBe('ok')
})

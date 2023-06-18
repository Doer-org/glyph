import Ajv, { AnySchema } from 'ajv'
import { JTDDataType } from 'ajv/dist/core'

import { Result } from './types'

export type ResponseError = {
  status: number
  message: string
}

const ajv = new Ajv({
  allErrors: false,
  strict: false,
})

const resp2result = async <T extends AnySchema>(resp: Response): Promise<Result<T, ResponseError>> => {
  const data = (await resp.json()) as T
  const validate = ajv.compile<JTDDataType<T>>(data)
  if (!resp.ok) {
    return {
      type: 'error',
      error: {
        status: resp.status,
        message: resp.statusText,
      },
    }
  } else if (!validate(data)) {
    return {
      type: 'error',
      error: {
        status: resp.status,
        message: JSON.stringify(validate.errors),
      },
    }
  }
  return { type: 'ok', value: data }
}

export const apiClient = {
  get: async <T extends AnySchema>(url: string, token?: string) => {
    const data = await fetch(url, {
      cache: 'no-store',
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(token && { jwt: token }),
      },
    })
    return await resp2result<T>(data)
  },
  post: async <T extends AnySchema>(
    url: string,
    body: Record<string, unknown> | Record<string, unknown>[],
    token?: string
  ) => {
    const data = await fetch(url, {
      cache: 'no-store',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { jwt: token }),
      },
      body: JSON.stringify(body),
    })
    return await resp2result<T>(data)
  },
  put: async <T extends AnySchema>(
    url: string,
    body: Record<string, unknown> | Record<string, unknown>[],
    token?: string
  ) => {
    const data = await fetch(url, {
      cache: 'no-store',
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { jwt: token }),
      },
      body: JSON.stringify(body),
    })
    return await resp2result<T>(data)
  },
  delete: async <T extends AnySchema>(
    url: string,
    body?: Record<string, unknown> | Record<string, unknown>[],
    token?: string
  ) => {
    const data = await fetch(url, {
      cache: 'no-store',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { jwt: token }),
      },
      body: JSON.stringify(body),
    })
    return await resp2result<T>(data)
  },
}

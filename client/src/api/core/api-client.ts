import Ajv, { AnySchema } from 'ajv';
import { Result } from './types';
import { JTDDataType } from 'ajv/dist/core';

export type ResponseError = {
  status: number;
  message: string;
};

const resp2result = async <T extends AnySchema>(
  resp: Response
): Promise<Result<T, ResponseError>> => {
  const data = (await resp.json()) as T;
  const validate = new Ajv({
    allErrors: false,
    strict: false,
  }).compile<JTDDataType<T>>(data);
  if (!resp.ok) {
    return {
      type: 'error',
      error: {
        status: resp.status,
        message: resp.statusText,
      },
    };
  } else if (!validate(data)) {
    return {
      type: 'error',
      error: {
        status: resp.status,
        message: JSON.stringify(validate.errors),
      },
    };
  }
  return { type: 'ok', value: data };
};

export const apiClient = {
  get: async <T extends AnySchema>(url: string) => {
    const data = await fetch(url, {
      method: 'GET',
    });
    return await resp2result<T>(data);
  },
  post: async <T extends AnySchema>(
    url: string,
    body: Record<string, unknown> | Record<string, unknown>[]
  ) => {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await resp2result<T>(data);
  },
  put: async <T extends AnySchema>(
    url: string,
    body: Record<string, unknown> | Record<string, unknown>[]
  ) => {
    const data = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await resp2result<T>(data);
  },
  delete: async (
    url: string,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ) => {
    const data = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return data;
  },
};

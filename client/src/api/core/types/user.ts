import { JTDDataType } from 'ajv/dist/core';

const userSchema = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    img: { type: 'string' },
  },
} as const;

export type User = JTDDataType<typeof userSchema>;

const userCreateSchema = {
  properties: {
    name: { type: 'string' },
    img: { type: 'string' },
  },
} as const;

export type UserCreate = JTDDataType<typeof userCreateSchema>;

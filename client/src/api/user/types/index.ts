import { JTDDataType } from 'ajv/dist/core';

const userSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        img: { type: 'string' },
      },
    },
  },
} as const;

export type UserResponse = JTDDataType<typeof userSchema>;

export type UserCreate = {
  name: string;
  img: string;
};

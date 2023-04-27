import { JTDDataType } from 'ajv/dist/core';

const healthSchema = {
	properties: {
		health: { type: 'string' },
	},
} as const;

export type Health = JTDDataType<typeof healthSchema>;

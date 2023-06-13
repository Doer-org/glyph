import { JTDDataType } from "ajv/dist/core";

const loggedInUserSchema = {
	type: "object",
	properties: {
		user: {
			type: "object",
			properties: {
				Id: { type: "string" },
				Name: { type: "string" },
				Img: { type: "string" },
			},
		},
	},
} as const;

export type AuthUserResponse = JTDDataType<typeof loggedInUserSchema>;

import { apiClient } from "../core";
import { UserResponse, UserCreate } from "./types";

export const createUser = async (user: UserCreate) =>
	await apiClient.post<UserResponse>(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
		user,
	);

export const readUser = async (user_id: string, token?: string) =>
	await apiClient.get<UserResponse>(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user_id}`,
		token,
	);

export const deleteUser = async (user_id: string) =>
	await apiClient.delete(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user_id}`,
	);

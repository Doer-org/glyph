import { apiClient } from '../core';
import { User, UserCreate } from './types';

export const createUser = async (user: UserCreate) =>
  await apiClient.post<User>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/create`,
    user
  );

export const readUser = async (user_id: string) =>
  await apiClient.get<User>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user_id}`
  );

export const deleteUser = async (user_id: string) =>
  await apiClient.delete<User>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user_id}`
  );

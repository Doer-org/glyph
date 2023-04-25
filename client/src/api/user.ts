import { User, UserCreate, apiClient } from './core';

export const createUser = async (user: UserCreate) => {
  return await apiClient.post<User>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/create`,
    user
  );
};

import { apiClient, Health } from './core';

export const healthCheck = async () => {
  return await apiClient.get<Health>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/health`
  );
};

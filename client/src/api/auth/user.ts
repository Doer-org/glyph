import { getEnv } from '@/utils'

import { apiClient } from '../core'

import { AuthUserResponse } from './types'

const { serverURL } = getEnv()
export const getLoggedInUser = async (token: string) =>
  await apiClient.get<AuthUserResponse>(`${serverURL}/auth/user`, token)

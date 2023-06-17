import { getEnv } from '@/utils'
import { apiClient } from '../core'
import { Health } from './types'

const { serverURL } = getEnv()
export const healthCheck = async () => {
  return await apiClient.get<Health>(`${serverURL}/health`)
}

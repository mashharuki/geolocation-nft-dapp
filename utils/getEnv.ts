import { ResponseData } from "../pages/api/env"

/**
 * to get .env files
 */
export const getEnv = async(): Promise<ResponseData> => {
  const res = await fetch('/api/env')
  const env: ResponseData = await res.json()
  return env
}
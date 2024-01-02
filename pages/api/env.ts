import type { NextApiRequest, NextApiResponse } from 'next';
 
export type ResponseData = {
  CLIENT_ID: string;
  TW_ENGINE_URL: string;
  TW_ACCESS_TOKEN: string;
  TW_BACKEND_WALLET: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    CLIENT_ID: process.env.CLIENT_ID!,
    TW_ENGINE_URL: process.env.TW_ENGINE_URL!,
    TW_ACCESS_TOKEN: process.env.TW_ACCESS_TOKEN!,
    TW_BACKEND_WALLET: process.env.TW_BACKEND_WALLET!
  }

  res.status(200).json(env)
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDiscordData } from "../../discordData"
import { DiscordData } from "../../@types/DiscordData"


export default async function handler(req: NextApiRequest, res: NextApiResponse<DiscordData>) {
  const data = await getDiscordData()
  res.status(200).json(data)
}

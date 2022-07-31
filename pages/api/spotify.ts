import type { NextApiRequest, NextApiResponse } from "next"
import { getSpotifyData } from "../../src/spotifyData"
import { SpotifyData } from "../../src/@types/SpotifyData"

export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyData>) {
    const data = await getSpotifyData()
    res.status(200).json(data)
}
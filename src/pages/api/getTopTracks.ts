import type { NextApiRequest, NextApiResponse } from 'next'
import { getTopTracks } from "../../utils/spotify";

type Response = {
    tracks: [
        {
            title: string,
            artist: string,
            songUrl: string,
            imageUrl: string
        }
    ]
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    const data = await getTopTracks();
    const { items } = await data.json();

    const tracks = items.slice(0, 10).map((track: any) => ({
        title: track.name,
        artist: track.artists.map((_artist: any) => _artist.name).join(", "),
        songUrl: track.external_urls.spotify,
        imageUrl: track.album.images.slice(0, 1).map((image: any) => image.url).toString()
    }));

    res.status(200).json({ tracks }) 
}
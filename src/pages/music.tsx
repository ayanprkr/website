import { type NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import useSWR from "swr";

type Data = {
    topTracks: [
        {
            artist: any,
            image: any,

            mbid: string,
            url: string,
            name: string,
            playcount: string
        }
    ],
    topArtists: [
        {
            mbid: string,
            url: string,
            name: string,
            playcount: string
        }
    ]
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

const Music: NextPage<Data> = ({ topTracks, topArtists }) => {
    
    return (
        <>
            <Head>
                <title>Music - ayxn</title>

                <meta property="title" content="Music - ayxn" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Music - ayxn" />
                <meta property="og:image" content="https://ayanprkr.vercel.app/api/og?title=Music" /> 

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Music - ayxn" />
                <meta property="twitter:image" content="https://ayanprkr.vercel.app/api/og?title=Music" /> 
            </Head>

            <div className="py-10 md:py-20 flex flex-col justify-center items-start gap-5">
                <h1 className="text-3xl md:text-5xl font-black">Music Stats</h1>
                {/* <p className="text-md md:text-lg text-neutral-300">Here are some of the <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">super cool tracks / artists I like to listen all day!</span></p> */}
                <p className="text-md md:text-lg text-neutral-300"><span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">~~~</span></p>
                
                <h1 className="mt-5 text-xl md:text-3xl font-black">Top Tracks ~ 12</h1>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                    {topTracks?.map((track: any, index: number) => (
                        <div key={index} className="w-full flex flex-col items-start justify-center bg-neutral-900 border-neutral-800 hover:border-neutral-500 border-2 font-bold text-gray-400 rounded-lg p-5 transiton duration-300">
                            <h1 className="text-md md:text-xl text-gray-300">{track.name}</h1>
                            <p className="text-xs md:text-sm text-gray-400 font-normal">playcount: {track.playcount}</p>
                        </div>
                    ))}
                </div>

                <h1 className="mt-5 text-xl md:text-3xl font-black">Top Artists ~ 15</h1>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                    {topArtists?.map((artist: any, index: number) => (
                        <div key={index} className="w-full flex flex-col items-start justify-center bg-neutral-900 border-neutral-800 hover:border-neutral-500 border-2 font-bold text-gray-400 rounded-lg p-5 transiton duration-300">
                            <h1 className="text-md md:text-xl text-gray-300">{artist.name}</h1>
                            <p className="text-xs md:text-sm text-gray-400 font-normal">playcount: {artist.playcount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { LASTFM_API_KEY } = process.env;

    const topTracks = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=metalooze&api_key=${LASTFM_API_KEY}&limit=12&format=json`);
    const topArtists = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=metalooze&api_key=${LASTFM_API_KEY}&limit=15&format=json`);
    
    const topTracksRes = await topTracks.json();
    const topArtistsRes = await topArtists.json();

    const data = {
        topTracks: topTracksRes.weeklytrackchart.track,
        topArtists: topArtistsRes.weeklyartistchart.artist
    }

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            ...data,
        },
    }
}


export default Music;
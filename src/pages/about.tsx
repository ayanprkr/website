import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/future/image";
import useSWR from "swr";

type TopTracks = {
    title: string,
    artist: string,
    songUrl: string,
    imageUrl: string
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const About: NextPage = () => {
    const { data, error } = useSWR('/api/getTopTracks', fetcher);
 
    return (
        <>
            <Head>
                <title>About - ayanprkr</title>  
                
                <link rel="preload" href="/api/getTopTracks" as="fetch" crossOrigin="anonymous"></link>

                <meta property="title" content="About - ayxn" />
                
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About - ayxn" />
                <meta property="og:image" content="https://ayanprkr.vercel.app/api/og" /> 

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="About - ayxn" />
                <meta property="twitter:image" content="https://ayanprkr.vercel.app/api/og" /> 
            </Head> 
            <div className="py-10 md:py-20 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-3xl md:text-5xl font-black">About</h1>
                    <Image loading="lazy" width={1920} height={1080} className="rounded-lg" src="/placeholder-about.jpg" alt="metalooze" />
                    <p className="text-md md:text-lg text-neutral-300">
                        I&apos;m a designer and a developer based in India, currently a student pursuing CS. I enjoy Automation and also interested in Full Stack Development!
                        
                        <br /><br />
                        
                        I have also been designing since 2019, I initially started by making twitter headers based on fortnite then started discovering other fields in it.
                        White designing, I found out various bots on discord and always wanted to build them. In 2020 when the whole world was in a lockdown, I started programming (90% copy-paste) because I had a lot of time which I used to spend with my friends playing fortnite/valorant.
                        
                        <br /><br />

                        Later on I started web development but then I was able to write 98% code by myself (2% code from stackoverflow ofc)!
                        
                        <br /><br />
                        
                        I have also been contributing to open source!
                    </p>

                    <h1 className="text-xl md:text-3xl font-black">Top Played Tracks</h1>
                    <div className="grid grid-cols-2 gap-5">
                        {data?.tracks.map((track: TopTracks, index: number) => (
                            <div key={index} className="cursor-pointer w-full flex flex-col md:flex-row gap-4 items-center border-neutral-500 border-2 hover:-translate-y-1 hover:bg-neutral-800 hover:bg-opacity-20 hover:shadow-neutral-500 hover:shadow-md font-bold text-gray-400 rounded-lg px-6 py-5 transiton duration-300">
                                <Image loading="lazy" className="rounded-lg" src={track.imageUrl} width={100} height={100} alt={track.artist} />
                                <div>
                                    <h1 className="text-md md:text-xl text-gray-300">{track.title}</h1>
                                    <p className="text-xs md:text-sm text-gray-400 font-normal">{track.artist}</p>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const res = await fetch("https://ayanprkr.vercel.app/api/getTopTracks")
    
//     if (!res) {
//         return {
//             notFound: true
//         }
//     }

//     const { items } = await res.json();

//     const tracks = items.slice(0, 10).map((track: any) => ({
//         title: track.name,
//         artist: track.artists.map((_artist: any) => _artist.name).join(", "),
//         songUrl: track.external_urls.spotify,
//         imageUrl: track.album.images.slice(0, 1).map((image: any) => image.url).toString()
//     }));

//     return {
//         props: {
//             ...items,
//         },
//     }
// }

export default About;
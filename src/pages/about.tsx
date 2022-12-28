import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
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
                <title>About - ayxn</title>  
                
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
                    {/* <Image placeholder="blur" blurDataURL="/placeholder-about.jpg" loading="lazy" width={1920} height={1080} className="rounded-lg" src="/placeholder-about.jpg" alt="metalooze" /> */}
                    <p className="text-md md:text-lg text-neutral-300">
                        I am a designer and developer based in India, currently pursuing a degree in computer science. I have a passion for automation and am interested in full stack development. My journey in design and programming began with creating Twitter headers and discovering bots on Discord, and has since evolved into building full stack applications using Next.js.

                        <br /><br />
                        
                        I am determined to succeed and am always eager to continue learning and growing in my field. My ability to create and deploy a functioning website with a working backend is a testament to my dedication and hard work. I am confident in my abilities and believe that I will continue to achieve great things in my studies and professional career.
                    </p>

                    <h1 className="text-xl md:text-3xl font-black">Top Played Tracks</h1>
                    <div className="grid grid-cols-2 gap-5">
                        {data?.tracks.map((track: TopTracks, index: number) => (
                            <div key={index} className="cursor-default group w-full flex flex-col md:flex-row items-center gap-2 md:gap-5 bg-neutral-900 border-neutral-800 hover:border-neutral-500 border-2 font-bold text-gray-400 rounded-lg p-5 transiton duration-300">
                                <Image placeholder="blur" blurDataURL={track.imageUrl} loading="lazy" className="rounded-lg grayscale group-hover:grayscale-0 transiton duration-300" src={track.imageUrl} width={100} height={100} alt={track.artist} />
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
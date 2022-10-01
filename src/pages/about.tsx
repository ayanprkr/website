import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
            </Head> 
            <div className="py-10 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">About</h1>
                    <p className="text-md md:text-xl font-semibold text-gray-400">
                        Hi, I&apos;m Ayan, also known as <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">MetalOoze</span>.
                        I&apos;m from and currently residing in Mumbai, India. I&apos;m also a full-stack developer who care about performant, accessible code. 
                        I&apos;m a huge fan of maintaining and contributing open source repositories.
                        <br /><br />
                        I started programming back in 2020 when I was in 10th grade while everyone was stuck in the pandemic. I had a great opportunity to learn something new as I had a lot of time during the pandemic.
                        <br />
                        Initially I used to code basic Discord Bots (most of the code copied from github or stackoverflow) but later on I tried making a Bot myself and was able to code without any external help lol!
                        <br /><br />
                        In 2021, I started <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">Web Development</span> but this time I was able to code without any help 😎.
                        <br />
                        Later on I found out that web development is not just about HTML/CSS so I started learning React and made my first React website <span className="underline"><Link href="https://www.metalooze.xyz/" target="_blank">metalooze.xyz</Link></span>
                        <br /><br />
                        Before programming, I was also a Graphic Designer so yeah thats why my designs are so cool!
                    </p>

                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">Music</h1>
                    <p className="text-md md:text-xl font-semibold text-gray-400">
                        I listen to a lot of Spotify and have always had a passion for music ever since I was young. Below you can find an up-to-date collection of my favourite songs from the past ~4 weeks.
                    </p>
                    <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-5">
                        {data?.tracks.map((track: TopTracks, index: number) => (
                            <div key={index} className="cursor-pointer flex flex-col md:flex-row gap-4 items-center max-w-xs border-sky-500 border-2 hover:-translate-y-1 hover:bg-sky-500 hover:bg-opacity-10 font-bold text-gray-400 rounded-lg px-6 py-5 transiton duration-300">
                                <Image className="rounded-lg" src={track.imageUrl} width={100} height={100} />
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

export default About;
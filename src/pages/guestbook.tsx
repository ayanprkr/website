import type { NextPage } from "next";
import Head from "next/head";

const Guestbook: NextPage = () => {
    return (
        <>
            <Head>
                <title>Guestbook - ayanprkr</title>
            </Head>
            <div className="py-10 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text">Guestbook</h1>
                    <p className="text-md md:text-xl font-semibold text-gray-400">Leave a comment below to be on my Guestbook forever! It could be literally anything, <span className="font-semibold text-transparent bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text">a joke, a quote or even a cool fact.</span></p>
                    <h1 className="text-gray-400">Under Development</h1>
                </div>
            </div>
        </>
    )
}

export default Guestbook;
import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

const Art: NextPage = () => {
    return (
        <>
            <Head>
                <title>Art - ayxn</title>

                <meta property="title" content="Art - ayxn" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Art - ayxn" />
                <meta property="og:image" content="https://ayanprkr.vercel.app/api/og?title=Digital%20Arts" /> 

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Art - ayxn" />
                <meta property="twitter:image" content="https://ayanprkr.vercel.app/api/og?title=Digital%20Arts" /> 
            </Head>

            <div className="py-10 md:py-20 flex flex-col justify-center items-start gap-5">
                <h1 className="text-3xl md:text-5xl font-black">Digital Arts</h1>
                <p className="text-md md:text-lg text-neutral-300">Here are some of the <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">super cool arts</span> designed by me!</p>
                
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-20">
                    <div>
                        <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/optic.png" src={"/art/optic.png"} loading="lazy" width="1280" height={"720"} alt="optic gaming"></Image>
                        <div className="mt-2 text-neutral-300 text-md text-left">
                            <h2 className="text-xl">Optic Gaming</h2>
                            <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius numquam cum animi dignissimos facere inventore architecto beatae aperiam a consectetur autem esse adipisci, soluta, asperiores vel nemo sed ipsam illum.</p>
                        </div>
                    </div>
                    <div>
                        <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/ixivalo.png" src={"/art/ixivalo.png"} loading="lazy" width="1280" height={"720"} alt="optic gaming"></Image>
                        <div className="mt-2 text-neutral-300 text-md text-left">
                            <h2 className="text-xl">Valorant</h2>
                            <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius numquam cum animi dignissimos facere inventore architecto beatae aperiam a consectetur autem esse adipisci, soluta, asperiores vel nemo sed ipsam illum.</p>
                        </div>
                    </div>
                    <div>
                        <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/florida.png" src={"/art/florida.png"} loading="lazy" width="1280" height={"720"} alt="optic gaming"></Image>
                        <div className="mt-2 text-neutral-300 text-md text-left">
                            <h2 className="text-xl">Florida Mutineers</h2>
                            <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius numquam cum animi dignissimos facere inventore architecto beatae aperiam a consectetur autem esse adipisci, soluta, asperiores vel nemo sed ipsam illum.</p>
                        </div>
                    </div>
                    <div>
                        <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/nadeshot.png" src={"/art/nadeshot.png"} loading="lazy" width="3000" height={"1000"} alt="optic gaming"></Image>
                        <div className="mt-2 text-neutral-300 text-md text-left">
                            <h2 className="text-xl">Nadeshot</h2>
                            <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius numquam cum animi dignissimos facere inventore architecto beatae aperiam a consectetur autem esse adipisci, soluta, asperiores vel nemo sed ipsam illum.</p>
                        </div>
                    </div>
                </div>
                {/* <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/mongraal.png" src={"/art/mongraal.png"} loading="lazy" width="3000" height={"1000"} alt="optic gaming"></Image>
                <Image className="rounded-lg" placeholder="blur" blurDataURL="/art/alvi.png" src={"/art/alvi.png"} loading="lazy" width="3000" height={"1000"} alt="optic gaming"></Image> */}
            </div>
        </>
    )
}

export default Art;
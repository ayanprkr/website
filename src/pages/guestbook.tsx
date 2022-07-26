import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
    BiTrash
} from "react-icons/bi"

const Signature: React.FC<{ id: bigint, name: string, message: string, createdAt: string, email: string, session: any, ctx: any }> = ({ id, name, message, createdAt, email, session, ctx }) => {
    const [isVisible, setVisible] = useState<boolean>(true);

    const guestbook = trpc.useMutation("guestbook.delete", {
        onMutate: () => {
            ctx.cancelQuery(["guestbook.getAll"]);

            const optimisticUpdate = ctx.getQueryData(["guestbook.getAll"]);
            if (optimisticUpdate) ctx.setQueryData(["guestbook.getAll"], optimisticUpdate);
        },
        onSettled: () => {
            ctx.invalidateQueries(["guestbook.getAll"]);
        }
    });

    if (session?.user?.email == email) {
        const handleDelete = () => {
            guestbook.mutate({ id, email });

            setVisible(false);
        };

        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div 
                        key={"box"}
                        initial={{ opacity: 0, x: 0  }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        className="box flex flex-col"
                    >
                        <p className="font-bold text-neutral-300">{message}</p>
                        <p className="text-neutral-400 flex flex-wrap items-center justify-start gap-2">~ {name}<span className="text-neutral-600">/ {createdAt} /</span><button className="text-red-500 hover:text-red-400 transition duration-200" onClick={ () => handleDelete() }><BiTrash /></button></p>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            <motion.div 
                key={"box"}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
                className="box flex flex-col"
            >
                <p className="font-bold text-neutral-300 text-wrap">{message}</p>
                <p className="text-neutral-400 flex flex-wrap items-center justify-start gap-2">~ {name} <span className="text-neutral-600">/ {createdAt}</span></p>
            </motion.div>
        </AnimatePresence>
    )
}

const Form: React.FC<{ session: any, ctx: any }> = ({ session, ctx }) => {
    
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const guestbook = trpc.useMutation("guestbook.post", {
        onMutate: () => {
            ctx.cancelQuery(["guestbook.getAll"]);

            const optimisticUpdate = ctx.getQueryData(["guestbook.getAll"]);
            if (optimisticUpdate) ctx.setQueryData(["guestbook.getAll"], optimisticUpdate);
        },
        onSettled: () => {
            ctx.invalidateQueries(["guestbook.getAll"]);
        },
    });

    const handleSubmit = () => {
        setLoading(true);

        if (message.length === 0) {
            setLoading(false);
            setError("Your message is empty!");
            return;
        }

        if (message.length > 100) {
            setLoading(false);
            setError("Your message should be less than 100 characters!");
            return;
        }

        guestbook.mutate({
            email: session?.user?.email as string,
            name: session?.user?.name as string,
            message,
        });

        setMessage("");
        setLoading(false);
    };

    if (session) {
        return (
            <>
                <div className="flex flex-col gap-5 pt-5">
                    {session.user?.image && (
                        <div className="flex flex-row items-center gap-5">
                            <Image
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={session.user?.image}
                                src={session.user?.image}
                                alt={session.user?.name || "a"}
                                width={80}
                                height={80}
                                className="rounded-lg"
                            />
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="md:text-xl text-neutral-300">Signed in as <span className="text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text font-semibold">{session.user?.name}</span></h1>
                                <button className="text-xs font-bold text-red-300 bg-red-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-red-500 rounded-lg px-4 py-1 transition duration-300" onClick={() => signOut()}>Log Out</button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <input 
                                type="text" 
                                name="message"
                                id="message"
                                value={message}
                                placeholder="Your Message..."
                                onChange={(e) => setMessage(e.target.value)}
                                className="text-neutral-300 block w-full bg-transparent border-2 border-neutral-900 focus:border-cyan-500 outline-none px-4 py-2 rounded-lg"
                            />
                            <div className="flex flex-row justify-between">
                                <p className="text-xs text-red-500">{error}</p>
                                <p className="font-semibold text-xs text-neutral-700">{message.length}/100</p>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                onClick={() => handleSubmit()}
                                className="text-sm font-bold text-green-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-green-500 rounded-lg px-4 py-2 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (!session) {
        return (
            <>  
                <div className="bg-neutral-900 rounded-lg px-6 py-4 flex flex-row flex-wrap items-center justify-between gap-3">
                    <p className="text-md md:text-lg text-neutral-300">Log in with Discord to continue!</p>
                    <button className="text-sm font-bold text-green-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-green-500 rounded-lg px-4 py-2 transition duration-300" onClick={() => signIn("discord")}>Log In</button>
                </div>
            </>
        )
    }

    return (
        <>  
            <div className="bg-neutral-900 rounded-lg px-6 py-4 flex flex-row flex-wrap items-center justify-between gap-3">
                <p className="text-md md:text-lg text-neutral-300">Log in with Discord to continue!</p>
                <button className="text-sm font-bold text-neutral-300 bg-neutral-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-neutral-500 rounded-lg px-4 py-2 transition duration-300">
                    <svg className="mr-3 h-5 w-5 animate-spin text-neutral-300" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}
const Guestbook: NextPage = () => {
    const { data: messages } = trpc.useQuery(["guestbook.getAll"]);
    const { data: session } = useSession();
    
    const ctx = trpc.useContext();

    return (
        <>
            <Head>
                <title>Guestbook - ayanprkr</title>
                
                <meta property="title" content="Guestbook - ayxn" />
                
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Guestbook - ayxn" />
                <meta property="og:image" content="https://ayanprkr.vercel.app/api/og" /> 

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Guestbook - ayxn" />
                <meta property="twitter:image" content="https://ayanprkr.vercel.app/api/og" /> 
            </Head>
            <div className="py-10 md:py-20 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-3xl md:text-5xl font-black">Guestbook</h1>
                    <p className="text-md md:text-lg text-neutral-300">Leave a comment below to be on my guestbook forever! It could be literally anything, <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">a joke, a quote or even a cool fact.</span></p>

                    <Form session={session} ctx={ctx} />

                    <div className="flex flex-col flex-wrap items-start pt-2 gap-5 truncate md:overflow-visible text-ellipsis">
                        {messages?.map((msg: any, index: number) => {
                            if (msg.hidden) {
                                return 
                            }

                            return (
                                <div key={index} className="flex flex-col justify-center items-start max-w-xs md:max-w-none overflow-x-scroll md:overflow-visible">
                                    <Signature key={index} ctx={ctx} id={msg.id} session={session} email={msg.email} name={msg.name} message={msg.message} createdAt={msg.createdAt.toString().slice(0, 16) as string} />
                                </div> 
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Guestbook;
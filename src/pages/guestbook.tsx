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
            guestbook.mutate({ id })
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
                        <p className="font-bold text-gray-300">{message}</p>
                        <p className="text-gray-400 font-semibold flex flex-wrap items-center justify-start gap-2">~ {name}<span className="text-gray-600">/ {createdAt} /</span><button className="text-red-500 hover:text-red-400 transition duration-200" onClick={ () => handleDelete() }><BiTrash /></button></p>
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
                <p className="font-bold text-gray-300 text-wrap">{message}</p>
                <p className="text-gray-400 font-semibold flex flex-wrap items-center justify-start gap-2">~ {name} <span className="text-gray-600">/ {createdAt}</span></p>
            </motion.div>
        </AnimatePresence>
    )
}

const LogOutBTN = () => {
    return (
        <button className="text-xs font-bold text-red-300 bg-red-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-red-500 rounded-lg px-4 py-1 transition duration-300" onClick={() => signOut()}>Log Out</button>
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
                                src={session.user?.image}
                                alt={session.user?.name || "a"}
                                width={80}
                                height={80}
                                className="rounded-lg"
                            />
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="md:text-xl font-bold text-gray-400">Signed in as <span className="text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">{session.user?.name}</span></h1>
                                <LogOutBTN />
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
                                className="block w-full bg-transparent border-2 border-neutral-900 focus:border-cyan-500 outline-none px-4 py-2 rounded-lg"
                            />
                            <div className="flex flex-row justify-between">
                                <p className="text-red-500">{error}</p>
                                <p className="font-semibold text-xs text-gray-600">{message.length}/100</p>
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

    return (
        <>
            <div className="flex flex-col items-start gap-3 pt-5">
                <p className="text-md md:text-xl font-semibold text-gray-400">Log in with Discord to continue!</p>
                <button className="text-sm font-bold text-green-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50 border-2 border-green-500 rounded-lg px-4 py-2 transition duration-300" onClick={() => signIn()}>Log In</button>
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
            </Head>
            <div className="py-10 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">Guestbook</h1>
                    <p className="text-md md:text-xl font-semibold text-gray-400">Leave a comment below to be on my Guestbook forever! It could be literally anything, <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">a joke, a quote or even a cool fact.</span></p>

                    <Form session={session} ctx={ctx} />

                    <div className="flex flex-col flex-wrap items-start pt-5 gap-5 truncate md:overflow-visible text-ellipsis">
                        {messages?.map((msg: any, index: number) => {
                            if (msg.hidden) {
                                return <div key={index} className="hidden"></div>
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
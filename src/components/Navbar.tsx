import React, { FC, useState } from "react";
import Link from "next/link";
import SpotifyWidget from "./SpotifyWidget";
import { useRouter } from "next/router";
import Hamburger from 'hamburger-react';
import { motion } from "framer-motion";

type Props = {
    path: string,
};

const Navbar: FC<Props> = ({ path }) => {
    const router = useRouter();
    const handleClick = (e: any, path: string) => {
        if (path) {
            router.push(path);
        } else {
            console.log("No path provided!");
        }
    };

    const [isOpen, setOpen] = useState(false);

    const navLinks = (
        <>
            <button onClick={(e) => handleClick(e, "/")} className="bg-neutral-900 bg-opacity-50 hover:bg-opacity-75 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/">/</Link>
            </button>
            <button onClick={(e) => handleClick(e, "/about")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/about">/about</Link>    
            </button>
            <button onClick={(e) => handleClick(e, "/guestbook")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/guestbook">/guestbook</Link>    
            </button>
        </>
    )

    const navLinkAbout = (
        <>
            <button onClick={(e) => handleClick(e, "/")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/">/</Link>
            </button>
            <button onClick={(e) => handleClick(e, "/about")} className="bg-neutral-900 bg-opacity-50 hover:bg-opacity-75 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/about">/about</Link>    
            </button>
            <button onClick={(e) => handleClick(e, "/guestbook")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/guestbook">/guestbook</Link>    
            </button>
        </>
    )

    const navLinksGuestbook = (
        <>
            <button onClick={(e) => handleClick(e, "/")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/">/</Link>
            </button>
            <button onClick={(e) => handleClick(e, "/about")} className="hover:bg-neutral-900 hover:bg-opacity-50 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/about">/about</Link>    
            </button>
            <button onClick={(e) => handleClick(e, "/guestbook")} className="bg-neutral-900 bg-opacity-50 hover:bg-opacity-75 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/guestbook">/guestbook</Link>    
            </button>
        </>
    )

    if (path === "/") {
        return (
            <header className="sticky z-10 md:relative flex md:flex-row flex-col gap-5 w-full top-3 md:top-0">
                <div className="flex justify-between items-center gap-5 w-full">
                    <div className="visible max-w-fit md:hidden bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg text-gray-500">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} rounded />
                    </div>

                    <div className="hidden md:flex gap-5">
                        {navLinks}
                    </div>
                    
                    <SpotifyWidget />
                </div>
                <div>
                    {isOpen ?
                        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="absolute w-full bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg">
                            <nav className="flex flex-col justify-center items-start p-5 gap-2">
                                {navLinks}
                            </nav>
                        </motion.div>
                    :
                        <nav className="hidden"></nav>
                    }
                </div>
            </header>
        )
    } else if (path === "/about") {
        return (
            <header className="sticky z-10 md:relative flex md:flex-row flex-col gap-5 w-full top-3 md:top-0">
                <div className="flex justify-between items-center gap-5 w-full">
                    <div className="visible max-w-fit md:hidden bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg text-gray-500">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} rounded />
                    </div>

                    <div className="hidden md:flex gap-5">
                        {navLinkAbout}
                    </div>
                    
                    <SpotifyWidget />
                </div>
                <div>
                    {isOpen ?
                        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="absolute w-full bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg">
                            <nav className="flex flex-col justify-center items-start p-5 gap-2">
                                {navLinkAbout}
                            </nav>
                        </motion.div>
                    :
                        <nav className="hidden"></nav>
                    }
                </div>
            </header>
        )
    } else if (path === "/guestbook") {
        return (
            <header className="sticky z-10 md:relative flex md:flex-row flex-col gap-5 w-full top-3 md:top-0">
                <div className="flex justify-between items-center gap-5 w-full">
                    <div className="visible max-w-fit md:hidden bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg text-gray-500">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} rounded />
                    </div>

                    <div className="hidden md:flex gap-5">
                        {navLinksGuestbook}
                    </div>
                    
                    <SpotifyWidget />
                </div>
                <div>
                    {isOpen ?
                        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="absolute w-full bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg">
                            <nav className="flex flex-col justify-center items-start p-5 gap-2">
                                {navLinksGuestbook}
                            </nav>
                        </motion.div>
                    :
                        <nav className="hidden"></nav>
                    }
                </div>
            </header>
        )
    }

    return (
        <header className="sticky md:relative flex md:flex-row flex-col gap-5 w-full top-3 md:top-0">
                <div className="flex justify-between items-center gap-5 w-full">
                    <div className="visible max-w-fit md:hidden bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg text-gray-500">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} rounded />
                    </div>

                    <div className="hidden md:flex gap-5">
                        {navLinks}
                    </div>
                    
                    <SpotifyWidget />
                </div>
                <div>
                    {isOpen ?
                        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="absolute w-full bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg">
                            <nav className="flex flex-col justify-center items-start p-5 gap-2">
                                {navLinks}
                            </nav>
                        </motion.div>
                    :
                        <nav className="hidden"></nav>
                    }
                </div>
            </header>
    )
}

export default Navbar;
import React, { FC, useState } from "react";
import Link from "next/link";
import SpotifyWidget from "./SpotifyWidget";
import { useRouter } from "next/router";
import Hamburger from 'hamburger-react';

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
            <button onClick={(e) => handleClick(e, "/")} className="bg-neutral-900 hover:bg-neutral-800 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/">/</Link>
            </button>
            <button onClick={(e) => handleClick(e, "/guestbook")} className="hover:bg-neutral-900 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                <Link href="/guestbook">/guestbook</Link>    
            </button>
        </>
    )
    if (path === "/") {
        return (
            <header className="sticky md:relative flex justify-between items-center w-full top-2 md:top-0 gap-5">
                <div className="visible md:hidden bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg text-gray-500">
                    <Hamburger size={20} toggled={isOpen} toggle={setOpen} rounded />
                </div>
                <nav className="hidden md:flex gap-5">
                    {navLinks}
                </nav>

                <SpotifyWidget />
            </header>
        )
    } else if (path === "/guestbook") {
        return (
            <header className="pt-10 px-14 md:px-20 flex flex-wrap justify-between items-center relative w-full top-0 gap-5">
                <nav className="flex gap-5">
                    <button onClick={(e) => handleClick(e, "/")} className="hover:bg-neutral-900 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                        <Link href="/">/</Link>
                    </button>
                    <button onClick={(e) => handleClick(e, "/guestbook")} className="bg-neutral-900 hover:bg-neutral-800 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                        <Link href="/guestbook">/guestbook</Link>    
                    </button>
                </nav>

                <SpotifyWidget />
            </header>
        )
    }

    return (
        <header className="pt-10 px-14 md:px-20 flex flex-wrap justify-between items-center relative w-full top-0 gap-5">
                <nav className="flex gap-5">
                    <button onClick={(e) => handleClick(e, "/")} className="bg-neutral-900 hover:bg-neutral-800 text-gray-300 rounded-lg transition duration-200 px-4 py-2">
                        <Link href="/">/</Link>
                    </button>
                    <button onClick={(e) => handleClick(e, "/guestbook")} className="hover:bg-neutral-900 text-gray-500 rounded-lg transition duration-200 px-4 py-2">
                        <Link href="/guestbook">/guestbook</Link>    
                    </button>
                </nav>

                <SpotifyWidget />
            </header>
    )
}

export default Navbar;
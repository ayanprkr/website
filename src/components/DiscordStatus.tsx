import React, { FC } from "react";
import { FaCircle, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useLanyard } from "react-use-lanyard";

const DiscordStatus = () => {
    const { loading, status } = useLanyard({
        userId: "331005037062914050",
        socket: true,
    });

    let icon;
    if (status?.discord_status === "online") {
        icon = (
            <span className="text-xs text-green-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else if (status?.discord_status === "idle") {
        icon = (
            <span className="text-xs text-yellow-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else if (status?.discord_status === "dnd") {
        icon = (
            <span className="text-xs text-red-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else {
        icon = (
            <span className="text-xs text-gray-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    }

    if (!loading && status) {
        return (
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex flex-row gap-3 text-neutral-400">
                    <Link href="https://github.com/MetalOoze05" className="hover:text-neutral-300 transition duration-200"><FaGithub /></Link>
                    <Link href="https://twitter.com/ayxnxd" className="hover:text-neutral-300 transition duration-200"><FaTwitter /></Link>
                    <Link href="https://instagram.com/ayanprkr" className="hover:text-neutral-300 transition duration-200"><FaInstagram /></Link>
                </div>
                <p className="flex flex-row justify-center items-center gap-2 text-neutral-400">
                    {icon}
                    {status.discord_user.username}#{status.discord_user.discriminator}
                </p>
            </div>
        )
    }

    return (
        <p className="pb-10 flex flex-row justify-center items-center gap-2">
            {icon}
            loading...
        </p>
    )
}

export default DiscordStatus;
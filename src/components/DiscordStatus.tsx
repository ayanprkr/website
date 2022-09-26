import React, { FC } from "react";
import useSWR from "swr";
import { FaCircle } from "react-icons/fa";

type Response = {
    success: boolean,
    data: {
        discord_user: {
            username: string,
            public_flags: number,
            id: string,
            discriminator: string,
            bot: boolean,
            avatar: string
        },
        discord_status: string,
    }
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DiscordStatus = () => {
    const { data, error } = useSWR<Response>("https://api.lanyard.rest/v1/users/331005037062914050", fetcher);

    let icon;
    if (data?.data.discord_status === "online") {
        icon = (
            <span className="text-xs text-green-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else if (data?.data.discord_status === "idle") {
        icon = (
            <span className="text-xs text-yellow-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else if (data?.data.discord_status === "dnd") {
        icon = (
            <span className="text-xs text-red-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    } else {
        icon = (
            <span className="text-xs text-gray-500 animate-pulse"><FaCircle></FaCircle></span>
        )
    }

    if (data && data.data.discord_status) {
        return (
            <p className="flex flex-row justify-center items-center gap-2 text-gray-400">
                {icon}
                {data.data.discord_user.username}#{data.data.discord_user.discriminator}
            </p>
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
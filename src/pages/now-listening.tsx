import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";

import { FaSpotify } from "react-icons/fa";

export interface LanyardData {
    spotify?: {
        track_id: string,
        timestamps: {
            start: number,
            end: number,
        },
        song: string,
        artist: string,
        album_art_url: string,
        album: string
    };
	listening_to_spotify: boolean;
	discord_user: object,
	discord_status: "online" | "idle" | "dnd" | "offline";
	kv?: any;
	activities: object,
	active_on_discord_web: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
}

const Spotify: NextPage = () => {
    const [status, setStatus] = useState<LanyardData>();
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);

    let heartbeat: NodeJS.Timeout;
    let socket: WebSocket;  

    useEffect(() => {        
        const connect = () => {
            if (heartbeat) clearInterval(heartbeat);
    
            socket = new WebSocket("wss://lanyard.rest/socket");
            setWs(socket);
            setLoading(true);
            
            console.log(socket.url)

            socket.addEventListener("open", () => {
                socket.send(
                    JSON.stringify({
                        op: 2,
                        d: {
                            subscribe_to_id: "331005037062914050"
                        }
                    })
                );
    
                heartbeat = setInterval(() => {
                    socket.send(
                        JSON.stringify({
                            op: 3
                        })
                    )
                }, 30000)
            });
    
            socket.addEventListener("message", ({ data }) => {
                const { t, d } = JSON.parse(data) as {
                    t: "INIT_STATE" | "PRESENCE_UPDATE";
                    d: LanyardData;
                };
                if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
                    setStatus(d || ({} as LanyardData));
                    if (loading) setLoading(false);
                }
            });
    
            socket.addEventListener("close", connect); 
        }
    
        connect();

        return () => {
            clearInterval(heartbeat);
            socket.removeEventListener("close", connect);
            socket.close();
        };
    }, []);

    console.log(status);
    
    if (status?.spotify) {
        const total = status.spotify.timestamps.end - status.spotify.timestamps.start;
        const progress = 100 - (100 * (status.spotify.timestamps.end - new Date().getTime())) / total;

        return (
            <>
                <div className="py-10 md:py-20 flex flex-col items-center justify-center">
                    <div className="bg-neutral-900 max-w-sm rounded-lg px-6 py-6 flex flex-col flex-wrap justify-center items-start gap-5">
                        <div>
                            <Image className="rounded-lg" src={status.spotify.album_art_url} alt={status.spotify.artist} width="500" height="500" loading="lazy" />
                        </div>
                        <div className="flex flex-col flex-wrap gap-2">
                            <h1 className="text-neutral-300 text-3xl font-bold">{status.spotify.song}</h1>
                            <h2 className="text-neutral-300 flex flex-row flex-wrap">
                                {status.spotify.album}

                                <p className="text-neutral-500 ml-2">~ {status.spotify.artist}</p>
                            </h2>

                        </div>
                            <div className="w-full h-1 rounded-full bg-neutral-700/20">
                                <div
                                    className="h-1 rounded-full bg-neutral-300 transition-all duration-1000 ease-linear will-change-[width]"
                                    style={{ width: `${progress}%`}}
                                ></div>
                            </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="py-10 md:py-20 flex flex-col items-center justify-center">
                <div className="bg-neutral-900 rounded-lg px-6 py-6 flex flex-col justify-center items-center gap-5 animate-pulse">
                    <span className="text-neutral-500 text-9xl"><FaSpotify /></span>
                    <h1 className="text-neutral-500 text-4xl font-bold">Not Listening to Anything!</h1>
                </div>
            </div>
        </>
    )
}

export default Spotify;
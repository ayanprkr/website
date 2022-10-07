import { FaSpotify } from "react-icons/fa";
import useSWR from "swr";

type Response = {
    success: boolean,
    data: {
        spotify?: {
            track_id: string,
            song: string,
            artist: string
        },
        listening_to_spotify: boolean
    }
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SpotifyWidget = () => {
    const { data, error } = useSWR<Response>("https://api.lanyard.rest/v1/users/331005037062914050", fetcher);

    if (data && data.data.listening_to_spotify) {
        return (
            <div className="cursor-pointer bg-green-900 bg-opacity-50 backdrop-blur-md rounded-lg px-4 py-2 max-w-fit text-xs md:text-sm">
                <div className="flex flex-row justify-center items-center gap-3 text-green-400">
                    <FaSpotify />
                    <p className="font-bold">Listening to {data.data.spotify?.song}</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="cursor-not-allowed bg-neutral-900 bg-opacity-50 md:bg-opacity-100 backdrop-blur-md rounded-lg px-4 py-2 max-w-fit text-xs md:text-sm">
            <div className="flex flex-row justify-center items-center gap-3 text-gray-500">
                <FaSpotify />
                <p className="font-bold text-gray-500">Not Playing Anything</p>
            </div>
        </div>
    )
}

export default SpotifyWidget;
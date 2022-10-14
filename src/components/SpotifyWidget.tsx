import { FaSpotify } from "react-icons/fa";
import { useLanyard } from "react-use-lanyard";

const SpotifyWidget = () => {
    const { loading, status } = useLanyard({
        userId: "331005037062914050",
        socket: true,
    });

    if (!loading && status?.spotify !== null) {
        return (
            <div className="cursor-pointer bg-green-900 bg-opacity-50 backdrop-blur-md rounded-lg px-4 py-2 max-w-fit text-xs md:text-sm">
                <div className="flex flex-row justify-center items-center gap-3 text-green-400">
                    <FaSpotify />
                    <p className="font-bold">Listening to {status?.spotify?.song}</p>
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
import { FaSpotify } from "react-icons/fa";
import { useLanyard } from "react-use-lanyard";

const SpotifyWidget = () => {
    const { loading, status } = useLanyard({
        userId: "331005037062914050",
        socket: true,
    });

    if (!loading && status?.spotify !== null) {
        return (
            <div className="cursor-pointer bg-green-900 backdrop-blur-md rounded-lg px-4 py-2 max-w-fit text-xs md:text-sm">
                <div className="flex flex-row justify-center items-center gap-3 text-green-300">
                    <FaSpotify />
                    <p className="">Listening to {status?.spotify?.song}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="cursor-not-allowed bg-neutral-900 backdrop-blur-md rounded-lg px-4 py-2 max-w-fit text-xs md:text-sm">
            <div className="flex flex-row justify-center items-center gap-3 text-neutral-500">
                <FaSpotify />
                <p className="text-neutral-500">Not Playing Anything</p>
            </div>
        </div>
    )
}

export default SpotifyWidget;
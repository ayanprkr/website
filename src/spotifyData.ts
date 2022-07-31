import { SpotifyData } from "./@types/SpotifyData"

export function getSpotifyData(): Promise<SpotifyData> {
    return fetch("https://api.lanyard.rest/v1/users/331005037062914050")
        .then((res) => res.json())
        .then((data) => {
            return data as SpotifyData
        })
}
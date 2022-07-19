import { DiscordData } from "../interfaces/DiscordData"

export function getDiscordData(): Promise<DiscordData> {
    return fetch("https://api.lanyard.rest/v1/users/331005037062914050")
        .then((res) => res.json())
        .then((data) => {
            return data as DiscordData
        })
}

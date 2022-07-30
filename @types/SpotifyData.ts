export type SpotifyData = {
    success: boolean,
    data: {
        spotify?: {
            track_id: string,
            timestamps: {
                start: string,
                end: string,
            },
            song: string,
            artist: string
        },
        listening_to_spotify?: boolean,
    }
}
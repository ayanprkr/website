export interface DiscordData {
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

        activities?: [],

        active_on_discord_web: boolean,
        active_on_discord_mobile: boolean,
        active_on_discord_desktop: boolean
    }
}
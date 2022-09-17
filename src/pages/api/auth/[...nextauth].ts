import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db/client";

const scopes = ["identify"].join(" ");

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: scopes } }
        })
    ],
    callbacks: {
        async signIn({ user, profile }: any) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    image: profile.image_url
                }
            })
            return true
        }
    },
}

export default NextAuth(authOptions);
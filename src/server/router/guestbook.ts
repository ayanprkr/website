import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const GuestBookRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            try {
                return await ctx.prisma.guestbook.findMany({
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        hidden: true,
                        message: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    })
    .middleware(async ({ ctx, next }) => {
        if (!ctx.session) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next();
    })
    .mutation("post", {
        input: z.object({
            email: z.string(),
            name: z.string(),
            message: z.string(),
        }),
        async resolve({ ctx, input }) {
            try {
                await ctx.prisma.guestbook.create({
                    data: {
                        email: input.email,
                        name: input.name,
                        message: input.message,
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    })
    .mutation("delete", {
        input: z.object({
            id: z.bigint()
        }),
        async resolve({ ctx, input }) {
            try {
                await ctx.prisma.guestbook.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        hidden: true
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    })
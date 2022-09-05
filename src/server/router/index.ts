import superjson from "superjson";

import { createRouter } from "./context";
import { guestbookRouter } from "./subrouters/guestbook";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("guestbook.", guestbookRouter);

export type AppRouter = typeof appRouter;
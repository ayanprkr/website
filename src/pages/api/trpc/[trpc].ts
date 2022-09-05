import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  responseMeta({ ctx, paths, type, errors }) {
    const allPublic = paths && paths.every((path) => path.includes("stats"));
    const allOk = errors.length === 0;
    const isQuery = type === "query";

    if (ctx?.res && allPublic && allOk && isQuery) {
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    }

    return {};
  },
});
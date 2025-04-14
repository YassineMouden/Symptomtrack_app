import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { aiRouter } from "~/server/api/routers/ai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: aiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.ai.analyzeSymptoms();
 */
export const createCaller = createCallerFactory(appRouter);

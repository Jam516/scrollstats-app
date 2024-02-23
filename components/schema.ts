import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const appSchema = z.object({
    PROJECT: z.string(),
    ETH_FEES: z.string(),
    ETH_FEES_GROWTH: z.string(),
    TRANSACTIONS: z.number(),
    TRANSACTIONS_GROWTH: z.string(),
    WALLETS: z.number(),
    WALLETS_GROWTH: z.string(),
    TVL: z.number().nullable().optional(),
    CATEGORY: z.string(),
})

export type App = z.infer<typeof appSchema>
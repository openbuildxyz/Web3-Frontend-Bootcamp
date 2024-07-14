import * as z from "zod"

export const MintSchema = z.object({
  address: z.string().refine((value) => value.startsWith("0x"), {
    message: "Please enter a valid address",
  }),
  uri: z.string(),
})

export const ListNFTSchema = z.object({
  tokenid: z.coerce.number().min(1),
  price: z.coerce.number().min(1, {
    message: "Please enter a price greater than 0",
  }),
})

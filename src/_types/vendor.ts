import { z } from "zod";

export const vendorSchema = z.object({
  id:  z.optional(z.string().uuid()),
  company_id: z.optional(z.number()),
  name: z.string(),
  contact_info: z.string(),
  created_at: z.optional(z.date())
})

export type Vendor = z.infer<typeof vendorSchema>

export type VendorRow = Vendor & {company: string}
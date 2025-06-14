import { z } from "zod"
import { string } from "zod/v4"

export const procurementSchema = z.object({
  id: z.optional(z.string()),
  company_id: z.number(),
  vendor_id: z.string().uuid(),
  name: z.string(),
  status: z.union([
    z.literal('approved'),
    z.literal('pending'),
    z.literal('completed'),
  ]),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
})

export type Procurement = z.infer<typeof procurementSchema>

export const ProcurementRow = z.object({
  id: z.string(),
  company: z.string(),
  vendor: z.string(),
  name: z.string(),
  status: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

export type ProcurementRow = z.infer<typeof ProcurementRow>

export const procurementPaymentSchema = z.object({
  id: z.string(),
  payment_type: z.string(),
  total_amount: z.number(),
  paid_amount: z.number(),
  remaining_amount: z.number(),
  payment_status: z.union([
    z.literal('full'),
    z.literal('down_payment'),
    z.literal('installment'),
  ]),
  payment_date: z.optional(z.date())
})

export type ProcurementPayment = z.infer<typeof procurementPaymentSchema>


export const procurementItemSchema = z.object({
  id: z.optional(z.string()),
  procurement_id: z.string().uuid(),
  product: z.string(),
  quantity: z.number(),
  total_price: z.number(),
})

export type ProcurementItem = z.infer<typeof procurementItemSchema>

export const procurementItemPayload = z.object({
  id: z.optional(z.string()),
  procurement_id: z.string().uuid(),
  product_id: z.string(),
  quantity: z.number(),
  total_price: z.number(),
})

export type ProcurementItemPayload = z.infer<typeof procurementItemPayload>
import { z } from "zod";

export const companySchema = z.object({
    id: z.number().int().nullable().optional(),
    name: z.string().max(255),
    parent_id: z.optional(z.number()),
    description: z.optional(z.string()),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    deleted_at: z.optional(z.date()),
});

export type Company = z.infer<typeof companySchema>;

export const userCompanySchema = z.object({
    id: z.optional(z.number().int().nullable()),
    company_id: z.number(),
    user_id: z.number(),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date())
})

export type UserCompany = z.infer<typeof userCompanySchema>

export const userCompanyRowSchema = z.object({
    id: z.optional(z.number().int().nullable()),
    company_id: z.number(),
    user_id: z.number(),
    company: z.string(),
    user: z.string(),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date())
})

export type UserCompanyRow = z.infer<typeof userCompanyRowSchema>

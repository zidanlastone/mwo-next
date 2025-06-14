import { z } from "zod";

// Matches the Rust Customer struct
export const CustomerSchema = z.object({
    id: z.number().int(),
    company_id: z.number().int(),
    name: z.string(),
    phone: z.string(),
    description: z.string(),
    address: z.string(),
    created_by: z.number().int(),
    created_at: z.string(), // ISO date string
    updated_at: z.string().nullable(), // ISO date string or null
    deleted_at: z.string().nullable(), // ISO date string or null
});

export type Customer = z.infer<typeof CustomerSchema>;

// Matches the Rust CustomerDTO struct with validation
export const CustomerDTOSchema = z.object({
    company_id:  z.optional(z.number().int().min(1, { message: "company_id is required" })),
    name: z.string().min(1, { message: "name is required" }),
    phone: z.string().min(1, { message: "phone is required" }),
    description: z.string().min(1, { message: "description is required" }),
    address: z.string().min(1, { message: "address is required" }),
});

export type CustomerDTO = z.infer<typeof CustomerDTOSchema>;
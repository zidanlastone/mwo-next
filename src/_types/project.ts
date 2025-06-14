import { z } from "zod";

// Helper schemas
const uuidSchema = z.string().uuid();
const decimalSchema = z.union([z.string(), z.number()]); // Adjust as needed for your decimal handling
const dateTimeSchema = z.string(); // ISO string, adjust if you use Date objects
const dateSchema = z.string(); // ISO date string

// Project
export const ProjectSchema = z.object({
    id: uuidSchema,
    company_id: z.number().int(),
    company: z.optional(z.string()),
    name: z.string(),
    customer: z.optional(z.string()),
    customer_id: z.number().int(),
    total_cost: decimalSchema,
    status: z.string(),
    start_date: dateTimeSchema,
    end_date: dateTimeSchema.optional(),
    created_at: dateTimeSchema,
});
export type Project = z.infer<typeof ProjectSchema>;

// ProjectDTO
export const ProjectDTOSchema = z.object({
    company_id:  z.optional(z.number().int()),
    name: z.string().min(1, "name is required"),
    customer_id: z.optional(z.number().int()),
    total_cost: decimalSchema,
    status: z.string(),
    start_date: dateTimeSchema,
    end_date: dateTimeSchema.optional(),
});
export type ProjectDTO = z.infer<typeof ProjectDTOSchema>;

// ProjectMilestone
export const ProjectMilestoneSchema = z.object({
    id: uuidSchema,
    project_id: uuidSchema,
    name: z.string().min(1, "name is required"),
    description: z.string().min(1, "description is required").optional(),
    due_date: dateSchema,
    status: z.string().min(1, "status is required"),
    created_at: dateTimeSchema,
});
export type ProjectMilestone = z.infer<typeof ProjectMilestoneSchema>;

// ProjectMilestoneDTO
export const ProjectMilestoneDTOSchema = z.object({
    name: z.string().min(1, "name is required"),
    description: z.string().optional(),
    due_date: dateSchema,
    status: z.string().min(1, "status is required"),
});
export type ProjectMilestoneDTO = z.infer<typeof ProjectMilestoneDTOSchema>;

// ProjectPayment
export const ProjectPaymentSchema = z.object({
    id: uuidSchema,
    project_id: uuidSchema,
    payment_type: z.string(),
    milestone_id: uuidSchema.optional(),
    total_amount: decimalSchema,
    paid_amount: decimalSchema,
    remaining_amount: decimalSchema,
    payment_status: z.string(),
    payment_date: dateTimeSchema,
});
export type ProjectPayment = z.infer<typeof ProjectPaymentSchema>;

// ProjectPaymentDTO
export const ProjectPaymentDTOSchema = z.object({
    payment_type: z.string().min(1, "payment_type is required"),
    milestone_id: uuidSchema.optional(),
    total_amount: decimalSchema,
    paid_amount: decimalSchema,
    payment_status: z.string().min(1, "payment_status is required"),
});
export type ProjectPaymentDTO = z.infer<typeof ProjectPaymentDTOSchema>;
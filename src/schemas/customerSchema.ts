import { z } from "zod";

export const createCustomerSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "el nombre debe tener al menos 2 caracteres")
    .max(100, "el nombre no puede superar los 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("el formato del email no es válido"),
  telefono: z
    .string()
    .trim()
    .min(7, "el teléfono debe tener al menos 7 caracteres")
    .max(20, "el teléfono no puede superar los 20 caracteres"),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;


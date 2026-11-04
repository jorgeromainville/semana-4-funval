import { z } from "zod";

export const createProductSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "el nombre debe tener al menos 2 caracteres")
    .max(100, "el nombre no puede superar los 100 caracteres"),
  descripcion: z
    .string()
    .trim()
    .min(3, "la descripción debe tener al menos 3 caracteres"),
  precio: z
    .number({ message: "el precio debe ser un número" })
    .positive("el precio debe ser mayor a 0"),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

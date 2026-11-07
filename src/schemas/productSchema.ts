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
export const getProductsQuerySchema = z.object({
  nombre: z.string().optional(),
  page: z
    .string()
    .regex(/^\d+$/, "la pagina debe ser un número")
    .transform(Number)
    .default(1),
  limit: z
    .string()
    .regex(/^\d+$/, "el limite debe ser un número")
    .transform(Number)
    .default(5), //5 por que no hay muchos datos
  maxPrice: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "el precio debe ser un número")//la ia me dijo para que sean numeros decimales
    .transform(Number)
    .optional(),
});

export type GetProductsQueryInput = z.infer<typeof getProductsQuerySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

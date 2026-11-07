import { z } from "zod";

export const createSaleSchema = z.object({
  id_cliente: z.number({ message: "el id_cliente debe ser un número" }).int().positive(),
  estado: z.string().optional().default("PENDIENTE"),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;


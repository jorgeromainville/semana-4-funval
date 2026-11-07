import { Router } from "express";
import {
    getSales,
    getSale,
    createSale
} from "../controllers/sale.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createSaleSchema } from "../schemas/saleSchema.js";

const router: Router = Router();

router.get("/sales", getSales);
router.get("/sales/:id", getSale);
router.post("/sales", validateSchema(createSaleSchema), createSale);

export default router;


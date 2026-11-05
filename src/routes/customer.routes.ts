import { Router } from "express";
import {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer
} from "../controllers/customer.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    createCustomerSchema,
    updateCustomerSchema
} from "../schemas/customerSchema.js";

const router: Router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateSchema(createCustomerSchema), createCustomer);
router.put("/customers/:id", validateSchema(updateCustomerSchema), updateCustomer);

export default router;


import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import productRoutes from "./routes/product.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import cors from "cors";

const port = process.env.PORT || 3000; 

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use("/api/docs", swaggerRouter);

// Endpoint de prueba
app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

// Rutas de la API (MVC)
app.use("/api", productRoutes);
app.use("/api", customerRoutes);

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});


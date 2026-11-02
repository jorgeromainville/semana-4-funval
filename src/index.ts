import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import pool from "./config/db.js";

const port = process.env.PORT || 3000; 

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);

app.get("/api/menu", async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Menu']
       #summary = 'Obtiene todos los productos del menú'
       #description = 'Obtiene todos los productos del menú' 
    */
    try {
        const result = await pool.query("SELECT * FROM producto;");
        res.json(result.rows);
    } catch (error) {
        console.error("ERROR al consultar productos", error);
        res.status(500).json({
            error: "ERROR al obtener el menu"
        });
    }
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});

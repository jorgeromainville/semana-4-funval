import { type Request, type Response } from "express";
import * as saleModel from "../models/sale.model.js";

// GET /api/sales
export const getSales = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Sales']
       #swagger.summary = 'Obtiene todas las ventas' 
    */
    try {
        const sales = await saleModel.getAllSales();
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
};

// GET /api/sales/:id
export const getSale = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Sales']
       #swagger.summary = 'Obtiene una venta por su ID' 
    */
    try {
        const id = Number(req.params.id);
        const sale = await saleModel.getSaleById(id);

        if (!sale) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        res.json(sale);
    } catch (error) {
        console.error("Error al obtener venta:", error);
        res.status(500).json({ error: "Error al obtener la venta" });
    }
};

// POST /api/sales
export const createSale = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Sales']
       #swagger.summary = 'Crea una nueva venta' 
    */
    try {
        const { id_cliente, estado } = req.body;
        const newSale = await saleModel.insertSale(Number(id_cliente), estado);
        res.status(201).json(newSale);
    } catch (error) {
        console.error("Error al crear venta:", error);
        res.status(500).json({ error: "Error al registrar la venta" });
    }
};


import { type Request, type Response } from "express";
import * as productModel from "../models/product.model.js";

// GET /api/menu
export const getMenu = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Products']
       #swagger.summary = 'Obtiene todos los productos del menú' 
    */
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener el menú:", error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
};

// GET /api/menu/:id
export const getProduct = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Products']
       #swagger.summary = 'Obtiene un producto por su ID' 
    */
    try {
        const id = Number(req.params.id);
        const product = await productModel.getProductById(id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// POST /api/menu
export const createProduct = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Products']
       #swagger.summary = 'Crea un nuevo producto en el menú' 
    */
    try {
        const { nombre, descripcion, precio } = req.body;
        const newProduct = await productModel.insertProduct(nombre, descripcion, Number(precio));
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error interno al crear producto" });
    }
};

// PUT /api/menu/:id
export const updateProduct = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Products']
       #swagger.summary = 'Actualiza un producto existente' 
    */
    try {
        const id = Number(req.params.id);
        const { nombre, descripcion, precio } = req.body;

        const updated = await productModel.updateProduct(id, nombre, descripcion, Number(precio));

        if (!updated) {
            return res.status(404).json({ error: "Producto no encontrado para actualizar" });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error interno al actualizar producto" });
    }
};


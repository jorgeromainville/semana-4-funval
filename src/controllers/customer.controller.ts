import { type Request, type Response } from "express";
import * as customerModel from "../models/customer.model.js";

// GET /api/customers
export const getCustomers = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Customers']
       #swagger.summary = 'Obtiene todos los clientes' 
    */
    try {
        const customers = await customerModel.getAllCustomers();
        res.json(customers);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ error: "Error interno al obtener los clientes" });
    }
};

// GET /api/customers/:id
export const getCustomer = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Customers']
       #swagger.summary = 'Obtiene un cliente por su ID' 
    */
    try {
        const id = Number(req.params.id);
        const customer = await customerModel.getCustomerById(id);

        if (!customer) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json(customer);
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// POST /api/customers
export const createCustomer = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Customers']
       #swagger.summary = 'Crea un nuevo cliente' 
    */
    try {
        const { nombre, email, telefono } = req.body;

        const emailExists = await customerModel.getCustomerByEmail(email);
        if (emailExists) {
            return res.status(400).json({ error: "Ya existe un cliente con ese email" });
        }

        const newCustomer = await customerModel.insertCustomer(nombre, email, telefono);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: "Error interno al crear el cliente" });
    }
};

// PUT /api/customers/:id
export const updateCustomer = async (req: Request, res: Response) => {
    /* 
       #swagger.tags = ['Customers']
       #swagger.summary = 'Actualiza un cliente existente' 
    */
    try {
        const id = Number(req.params.id);
        const { nombre, email, telefono } = req.body;

        const updated = await customerModel.updateCustomer(id, nombre, email, telefono);

        if (!updated) {
            return res.status(404).json({ error: "Cliente no encontrado para actualizar" });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error interno al actualizar el cliente" });
    }
};


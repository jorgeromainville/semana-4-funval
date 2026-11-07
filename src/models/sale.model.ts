import pool from "../config/db.js";

// 1. Obtener todas las ventas
export const getAllSales = async () => {
    const query = `
        SELECT p.id, p.id_cliente, c.nombre AS cliente_nombre, c.email AS cliente_email, p.fecha_pedido, p.estado
        FROM pedido p
        INNER JOIN cliente c ON p.id_cliente = c.id
        ORDER BY p.id ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
};

// 2. Obtener una venta por ID
export const getSaleById = async (id: number) => {
    const query = `
        SELECT p.id, p.id_cliente, c.nombre AS cliente_nombre, c.email AS cliente_email, p.fecha_pedido, p.estado
        FROM pedido p
        INNER JOIN cliente c ON p.id_cliente = c.id
        WHERE p.id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

// 3. Crear una nueva venta
export const insertSale = async (id_cliente: number, estado?: string) => {
    const query = `
        INSERT INTO pedido (id_cliente, estado, fecha_pedido)
        VALUES ($1, $2, CURRENT_DATE)
        RETURNING *;
    `;
    const result = await pool.query(query, [id_cliente, estado || "PENDIENTE"]);
    return result.rows[0];
};


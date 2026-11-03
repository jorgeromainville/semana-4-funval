import pool from "../config/db.js";

// 1. Obtener todos los productos del menú
export const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM producto;");
    return result.rows;
};

// 2. Obtener un producto por su ID
export const getProductById = async (id: number) => {
    const result = await pool.query("SELECT * FROM producto WHERE id = $1;", [id]);
    return result.rows[0] || null;
};

// 3. Insertar un nuevo producto
export const insertProduct = async (nombre: string, descripcion: string, precio: number) => {
    const result = await pool.query(
        "INSERT INTO producto (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *;",
        [nombre, descripcion, precio]
    );
    return result.rows[0];
};

// 4. Actualizar un producto existente
export const updateProduct = async (id: number, nombre: string, descripcion: string, precio: number) => {
    const result = await pool.query(
        "UPDATE producto SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *;",
        [nombre, descripcion, precio, id]
    );
    return result.rows[0] || null;
};

import pool from "../config/db.js";

// 1. Obtener todos los clientes
export const getAllCustomers = async () => {
    const result = await pool.query("SELECT * FROM cliente ORDER BY id ASC;");
    return result.rows;
};

// 2. Obtener cliente por ID
export const getCustomerById = async (id: number) => {
    const result = await pool.query("SELECT * FROM cliente WHERE id = $1;", [id]);
    return result.rows[0] || null;
};

// 3. Obtener cliente por Email (útil para validar duplicados)
export const getCustomerByEmail = async (email: string) => {
    const result = await pool.query("SELECT * FROM cliente WHERE email = $1;", [email]);
    return result.rows[0] || null;
};

// 4. Crear un nuevo cliente con parámetros seguros
export const insertCustomer = async (nombre: string, email: string, telefono: string) => {
    const result = await pool.query(
        "INSERT INTO cliente (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *;",
        [nombre, email, telefono]
    );
    return result.rows[0];
};

// 5. Actualizar un cliente existente
export const updateCustomer = async (id: number, nombre?: string, email?: string, telefono?: string) => {
    const query = `
        UPDATE cliente 
        SET nombre = COALESCE($1, nombre),
            email = COALESCE($2, email),
            telefono = COALESCE($3, telefono)
        WHERE id = $4
        RETURNING *;
    `;
    const result = await pool.query(query, [nombre || null, email || null, telefono || null, id]);
    return result.rows[0] || null;
};


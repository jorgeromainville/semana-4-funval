import pool from "../config/db.js";

// 1. Obtener todos los productos del menú
export const getAllProducts = async (filters: {
    nombre?: string | undefined;
    maxPrice?: number | undefined;
    limit: number;
    page: number;
}) => {
    const { nombre, maxPrice, page, limit } = filters;

    let sqlBase = "WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    if (nombre) {
        sqlBase += ` AND nombre LIKE $${paramIndex}`;
        values.push(`%${nombre}%`);
        paramIndex++;
    }

    if (maxPrice) {
        sqlBase += ` AND precio <= $${paramIndex}`;
        values.push(maxPrice);
        paramIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM producto ${sqlBase};`;
    const countResult = await pool.query(countQuery, values);
    const totalItem = parseInt(countResult.rows[0].count, 10);

    const offset = (page - 1) * limit;
    const dataQuery = `SELECT * FROM producto ${sqlBase} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1};`;
    const queryValues = [...values, limit, offset];
    const { rows } = await pool.query(dataQuery, queryValues);

    return {
        data: rows,
        pagination: {
            totalItem,
            itemsPerPage: limit,
            currentPage: page,
            totalPages: Math.ceil(totalItem / limit),
        },
    };
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

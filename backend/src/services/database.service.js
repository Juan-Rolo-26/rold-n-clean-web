import { pool } from '../config/database.js';

/**
 * Obtiene información relevante de la base de datos según la intención del usuario
 * @param {string} intent  - Intención detectada (precio, tamanos, zonas, etc.)
 * @returns {Promise<Object>} - Información relevante de la base de datos
 */
export async function getDatabaseInfo(intent) {
    const connection = await pool.getConnection();

    try {
        let info = {
            empresa: await getEmpresaInfo(connection),
            intent: intent
        };

        switch (intent) {
            case 'precio':
            case 'tamanos':
                info.volquetes = await getVolquetes(connection);
                info.servicios = await getServicios(connection);
                break;

            case 'zonas':
                info.zonas = await getZonas(connection);
                break;

            case 'tierra':
                info.servicios = await getServiciosTierra(connection);
                break;

            case 'contacto':
            case 'horarios':
                // Ya tenemos info.empresa que incluye contacto y horarios
                break;

            default:
                info.volquetes = await getVolquetes(connection);
                info.faqs = await getFAQs(connection);
                break;
        }

        return info;

    } finally {
        connection.release();
    }
}

async function getEmpresaInfo(connection) {
    try {
        const [rows] = await connection.query(
            'SELECT clave, valor FROM informacion_empresa'
        );
        return rows.reduce((acc, row) => {
            acc[row.clave] = row.valor;
            return acc;
        }, {});
    } catch (error) {
        console.warn('⚠️  Tabla informacion_empresa no encontrada, usando valores por defecto');
        return {
            nombre_empresa: 'Volquetes Roldán',
            telefono: '+54 9 341 362-3232',
            whatsapp: 'https://wa.me/5493413623232',
            email: 'info@volquetesroldan.com',
            ubicacion: 'Roldán, Santa Fe, Argentina',
            horario_atencion: 'Lunes a Viernes 8:00-18:00, Sábados 8:00-13:00',
            tiempo_entrega: 'Entrega y retiro el mismo día'
        };
    }
}

async function getVolquetes(connection) {
    try {
        const [rows] = await connection.query(
            `SELECT nombre, capacidad_m3, descripcion, recomendado_para, precio_base
       FROM tamanos_volquetes
       WHERE disponible = TRUE
       ORDER BY capacidad_m3 ASC`
        );
        return rows;
    } catch (error) {
        console.warn('⚠️  Tabla tamanos_volquetes no encontrada');
        return [];
    }
}

async function getServicios(connection) {
    try {
        const [rows] = await connection.query(
            `SELECT nombre, descripcion, precio_desde, precio_hasta, unidad
       FROM servicios
       WHERE activo = TRUE`
        );
        return rows;
    } catch (error) {
        console.warn('⚠️  Tabla servicios no encontrada');
        return [];
    }
}

async function getServiciosTierra(connection) {
    try {
        const [rows] = await connection.query(
            `SELECT nombre, descripcion, precio_desde, precio_hasta, unidad
       FROM servicios
       WHERE activo = TRUE AND nombre LIKE '%Tierra%'`
        );
        return rows;
    } catch (error) {
        console.warn('⚠️  Tabla servicios no encontrada o sin datos de tierra');
        return [];
    }
}

async function getZonas(connection) {
    try {
        const [rows] = await connection.query(
            `SELECT nombre, ciudad, costo_flete, tiempo_entrega
       FROM zonas_cobertura
       WHERE activo = TRUE
       ORDER BY costo_flete ASC`
        );
        return rows;
    } catch (error) {
        console.warn('⚠️  Tabla zonas_cobertura no encontrada');
        return [];
    }
}

async function getFAQs(connection) {
    try {
        const [rows] = await connection.query(
            `SELECT pregunta, respuesta FROM faqs ORDER BY orden ASC LIMIT 5`
        );
        return rows;
    } catch (error) {
        console.warn('⚠️  Tabla faqs no encontrada');
        return [];
    }
}

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS volquetes_roldan DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE volquetes_roldan;

-- Tabla de información de la empresa
CREATE TABLE IF NOT EXISTS informacion_empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(50) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    categoria VARCHAR(50),
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB;

-- Tabla de tamaños de volquetes
CREATE TABLE IF NOT EXISTS tamanos_volquetes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    capacidad_m3 DECIMAL(4,2) NOT NULL,
    descripcion TEXT,
    recomendado_para TEXT,
    precio_base DECIMAL(10,2),
    disponible BOOLEAN DEFAULT TRUE,
    imagen_url VARCHAR(255),
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_disponible (disponible),
    INDEX idx_capacidad (capacidad_m3)
) ENGINE=InnoDB;

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS servicios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_desde DECIMAL(10,2),
    precio_hasta DECIMAL(10,2),
    unidad VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activo (activo)
) ENGINE=InnoDB;

-- Tabla de zonas de cobertura
CREATE TABLE IF NOT EXISTS zonas_cobertura (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    provincia VARCHAR(100) DEFAULT 'Santa Fe',
    costo_flete DECIMAL(10,2) DEFAULT 0,
    tiempo_entrega VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activo (activo),
    INDEX idx_ciudad (ciudad)
) ENGINE=InnoDB;

-- Tabla de preguntas frecuentes
CREATE TABLE IF NOT EXISTS faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    categoria VARCHAR(50),
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_orden (orden),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB;

-- Vista para facilitar consultas
CREATE OR REPLACE VIEW vista_volquetes_disponibles AS
SELECT 
    nombre,
    capacidad_m3,
    descripcion,
    recomendado_para,
    precio_base,
    CONCAT('$', FORMAT(precio_base, 0, 'es_AR'), '/día') as precio_formateado
FROM tamanos_volquetes
WHERE disponible = TRUE
ORDER BY capacidad_m3 ASC;

-- Vista de servicios activos
CREATE OR REPLACE VIEW vista_servicios_activos AS
SELECT 
    nombre,
    descripcion,
    precio_desde,
    precio_hasta,
    unidad,
    CONCAT('$', FORMAT(precio_desde, 0, 'es_AR'), ' - $', FORMAT(precio_hasta, 0, 'es_AR'), ' ', unidad) as rango_precio
FROM servicios
WHERE activo = TRUE
ORDER BY orden ASC;

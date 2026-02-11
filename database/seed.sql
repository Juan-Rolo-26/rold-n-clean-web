-- Datos de ejemplo para Volquetes Roldán
USE volquetes_roldan;

-- Información de la empresa
INSERT INTO informacion_empresa (clave, valor, categoria) VALUES
('nombre_empresa', 'Volquetes Roldán', 'general'),
('telefono', '+54 9 341 362-3232', 'contacto'),
('email', 'MauricioandresBay123@hotmail.com', 'contacto'),
('ubicacion', 'Roldán, Santa Fe, Argentina', 'general'),
('horario_atencion', 'Lunes a Viernes 8:00-18:00, Sábados 8:00-13:00', 'general'),
('tiempo_entrega', 'Entrega y retiro el mismo día', 'servicio'),
('whatsapp', 'https://wa.me/5493413623232', 'contacto'),
('descripcion_corta', 'Alquiler de volquetes y venta de tierra en Roldán y zona', 'general'),
('años_experiencia', '10+', 'general');

-- Tamaños de volquetes
INSERT INTO tamanos_volquetes (nombre, capacidad_m3, descripcion, recomendado_para, precio_base, disponible, orden) VALUES
('Volquete Chico', 1.5, 'Volquete de 1.5m³ ideal para espacios reducidos', 'Limpiezas pequeñas, reformas de baños, cocinas', 8000.00, TRUE, 1),
('Volquete Mediano', 3.0, 'Volquete de 3m³ para obras medianas', 'Reformas de departamentos, jardines medianos', 12000.00, TRUE, 2),
('Volquete Grande', 6.0, 'Volquete de 6m³ - el más elegido por nuestros clientes', 'Construcciones, demoliciones, obras grandes', 18000.00, TRUE, 3),
('Volquete con Barandas', 7.0, 'Volquete de 7m³ con barandas para máxima capacidad', 'Grandes volúmenes de escombros, proyectos industriales', 22000.00, TRUE, 4);

-- Servicios
INSERT INTO servicios (nombre, descripcion, precio_desde, precio_hasta, unidad, activo, orden) VALUES
('Alquiler de Volquetes', 'Alquiler de volquetes de diferentes tamaños con entrega y retiro incluido', 8000.00, 22000.00, 'por día', TRUE, 1),
('Retiro de Escombros', 'Servicio de retiro y disposición final de escombros de construcción', 5000.00, 15000.00, 'por viaje', TRUE, 2),
('Venta de Tierra Negra Zarandeada', 'Tierra negra de primera calidad zarandeada, ideal para jardinería fina', 15000.00, 25000.00, 'por m³', TRUE, 3),
('Venta de Tierra Negra Común', 'Tierra negra para relleno y nivelación de terrenos', 8000.00, 12000.00, 'por m³', TRUE, 4),
('Venta de Tierra Colorada', 'Tierra colorada compacta para bases y rellenos estructurales', 6000.00, 10000.00, 'por m³', TRUE, 5);

-- Zonas de cobertura
INSERT INTO zonas_cobertura (nombre, ciudad, provincia, costo_flete, tiempo_entrega, activo) VALUES
('Roldán Centro', 'Roldán', 'Santa Fe', 0.00, 'Mismo día', TRUE),
('Roldán Zona Norte', 'Roldán', 'Santa Fe', 0.00, 'Mismo día', TRUE),
('Funes', 'Funes', 'Santa Fe', 1500.00, '24 horas', TRUE),
('Pérez', 'Pérez', 'Santa Fe', 2000.00, '24 horas', TRUE),
('Rosario Norte', 'Rosario', 'Santa Fe', 3000.00, '24-48 horas', TRUE),
('Rosario Sur', 'Rosario', 'Santa Fe', 3000.00, '24-48 horas', TRUE),
('Capitán Bermúdez', 'Capitán Bermúdez', 'Santa Fe', 2500.00, '24 horas', TRUE),
('Granadero Baigorria', 'Granadero Baigorria', 'Santa Fe', 2500.00, '24 horas', TRUE);

-- Preguntas frecuentes
INSERT INTO faqs (pregunta, respuesta, categoria, orden, activo) VALUES
('¿Cuánto tiempo puedo tener el volquete?', 'Nuestro servicio incluye hasta 3 días de alquiler. Si necesitas más tiempo, podés consultar por extensión del plazo sin cargo adicional.', 'alquiler', 1, TRUE),
('¿Hacen retiro el mismo día que entregaron?', 'Sí, podemos coordinar entrega y retiro el mismo día si tu obra lo requiere. Solo avisanos con anticipación.', 'logistica', 2, TRUE),
('¿Qué tipo de residuos puedo tirar?', 'Aceptamos escombros de construcción, tierra, cascotes, maderas, metales. NO aceptamos residuos peligrosos, químicos, orgánicos ni líquidos.', 'normativa', 3, TRUE),
('¿Necesito permiso municipal para el volquete?', 'Para volquetes en vía pública, puede ser necesario permiso municipal según tu localidad. En Roldán podemos asesorarte sobre los trámites.', 'normativa', 4, TRUE),
('¿Cómo se cobra el servicio?', 'Se cobra por día de alquiler. El precio incluye entrega, retiro y disposición final en planta habilitada.', 'precios', 5, TRUE),
('¿Entregan los fines de semana?', 'Entregamos de lunes a sábados. Para entregas domingos o feriados, consultá disponibilidad.', 'logistica', 6, TRUE),
('¿La tierra que venden es de buena calidad?', 'Sí, toda nuestra tierra es de primera calidad. La negra zarandeada es ideal para jardines, sin piedras ni contaminantes.', 'tierra', 7, TRUE),
('¿Puedo cargar el volquete hasta arriba?', 'Podés llenarlo hasta el borde. Para materiales sueltos que se desparramen, recomendamos el volquete con barandas.', 'alquiler', 8, TRUE);

-- Verificar datos insertados
SELECT 'Información insertada correctamente' as status;
SELECT COUNT(*) as total_volquetes FROM tamanos_volquetes;
SELECT COUNT(*) as total_servicios FROM servicios;
SELECT COUNT(*) as total_zonas FROM zonas_cobertura;
SELECT COUNT(*) as total_faqs FROM faqs;

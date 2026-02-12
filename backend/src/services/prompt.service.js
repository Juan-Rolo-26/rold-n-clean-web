/**
 * Construye un prompt optimizado con contexto de negocio
 * @param {string} userMessage - Mensaje del usuario
 * @param {Object} dbInfo - Información de la base de datos
 * @param {Array} conversationHistory - Últimos mensajes de la conversación
 * @returns {string} - Prompt completo para Ollama
 */
export function buildPrompt(userMessage, dbInfo, conversationHistory) {
    const systemContext = buildSystemContext(dbInfo);
    const conversationContext = buildConversationContext(conversationHistory);

    return `${systemContext}

${conversationContext}

Usuario: ${userMessage}
Asistente:`;
}

/**
 * Construye mensajes compatibles con APIs tipo OpenAI (ej: Grok)
 * @param {string} userMessage - Mensaje del usuario
 * @param {Object} dbInfo - Información de la base de datos
 * @param {Array} conversationHistory - Últimos mensajes de la conversación
 * @returns {Array} - Mensajes estructurados
 */
export function buildChatMessages(userMessage, dbInfo, conversationHistory) {
    const systemContext = buildSystemContext(dbInfo);

    const messages = [
        { role: 'system', content: systemContext },
    ];

    if (Array.isArray(conversationHistory)) {
        conversationHistory.forEach((msg) => {
            if (!msg?.role || !msg?.content) return;
            messages.push({
                role: msg.role,
                content: msg.content,
            });
        });
    }

    messages.push({ role: 'user', content: userMessage });

    return messages;
}

/**
 * Construye el contexto del sistema con información del negocio
 * @param {Object} dbInfo - Información de la base de datos
 * @returns {string} - Contexto del sistema
 */
function buildSystemContext(dbInfo) {
    const { empresa, volquetes, servicios, zonas, faqs } = dbInfo;

    let context = `Eres RoldánIA, un asistente virtual profesional de ${empresa.nombre_empresa}.

INSTRUCCIONES ESTRICTAS:
- Solo respondes sobre: alquiler de volquetes, precios, servicios, tierra, zonas de cobertura
- NO inventes información ni precios
- Si no tienes la información exacta, di: "No dispongo de esa información en este momento, pero puedo ayudarte con otra consulta o podés contactarnos directamente"
- Sé breve, profesional y amigable (máximo 3-4 líneas)
- Usa saltos de línea para mejor legibilidad
- Siempre termina preguntando si necesita más ayuda
- NO respondas preguntas fuera del rubro de volquetes/construcción
- Si te preguntan algo no relacionado con volquetes, di cortésmente que solo puedes ayudar con temas de volquetes

INFORMACIÓN DE LA EMPRESA:
- Nombre: ${empresa.nombre_empresa}
- Teléfono: ${empresa.telefono}
- WhatsApp: ${empresa.whatsapp}
- Email: ${empresa.email}
- Ubicación: ${empresa.ubicacion}
- Horarios: ${empresa.horario_atencion}
- Entrega: ${empresa.tiempo_entrega}
`;

    if (volquetes && volquetes.length > 0) {
        context += `\nTAMAÑOS DE VOLQUETES DISPONIBLES:\n`;
        volquetes.forEach(v => {
            context += `- ${v.nombre} (${v.capacidad_m3}m³): ${v.descripcion}. Recomendado para: ${v.recomendado_para}. Precio: $${formatPrice(v.precio_base)}/día\n`;
        });
    }

    if (servicios && servicios.length > 0) {
        context += `\nSERVICIOS:\n`;
        servicios.forEach(s => {
            context += `- ${s.nombre}: ${s.descripcion}. Desde $${formatPrice(s.precio_desde)} hasta $${formatPrice(s.precio_hasta)} ${s.unidad}\n`;
        });
    }

    if (zonas && zonas.length > 0) {
        context += `\nZONAS DE COBERTURA:\n`;
        zonas.forEach(z => {
            const flete = z.costo_flete > 0 ? `+ $${formatPrice(z.costo_flete)} flete` : 'sin cargo de flete';
            context += `- ${z.nombre}, ${z.ciudad}: ${z.tiempo_entrega} (${flete})\n`;
        });
    }

    if (faqs && faqs.length > 0) {
        context += `\nPREGUNTAS FRECUENTES:\n`;
        faqs.forEach(faq => {
            context += `P: ${faq.pregunta}\nR: ${faq.respuesta}\n\n`;
        });
    }

    context += `\nRECUERDA: 
- Responde en español argentino
- Sé conciso (máximo 3-4 líneas)
- Usa emoticones ocasionalmente 💚🚛
- Si mencionás precios, siempre aclara que pueden variar
- Invita a contactar por WhatsApp para presupuestos exactos`;

    return context;
}

/**
 * Construye el contexto de la conversación (últimos mensajes)
 * @param {Array} history - Histórico de mensajes
 * @returns {string} - Contexto de la conversación
 */
function buildConversationContext(history) {
    if (!history || history.length === 0) {
        return 'CONVERSACIÓN NUEVA';
    }

    let context = 'CONTEXTO DE LA CONVERSACIÓN ANTERIOR:\n';
    history.forEach(msg => {
        const role = msg.role === 'user' ? 'Usuario' : 'Asistente';
        context += `${role}: ${msg.content}\n`;
    });

    return context;
}

/**
 * Formatea precios al estilo argentino
 * @param {number} price - Precio
 * @returns {string} - Precio formateado
 */
function formatPrice(price) {
    if (!price) return '0';
    return price.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

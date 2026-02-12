import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, HardHat, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConstructorAvatar from '@/components/ConstructorAvatar';
import { API_BASE_URL, postApiJson } from '@/lib/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatApiResponse {
    response?: string;
    error?: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '¡Hola! 👋 Soy RoldánIA, tu asistente virtual de Volquetes Roldán. Estoy aquí para ayudarte con todo lo que necesites sobre volquetes, tierra y servicios de obra. ¿En qué puedo ayudarte?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const failureCountRef = useRef(0);
    const lastFailureRef = useRef(0);

    const whatsappUrl = 'https://wa.me/5493413623232';
    const whatsappCta = [
        'Para responderte más rápido, escribinos por WhatsApp:',
        whatsappUrl
    ].join('\n');
    const whatsappIfNoQuickReplies = [
        'Si no usás los botones rápidos, estas consultas las respondemos por WhatsApp:',
        whatsappUrl
    ].join('\n');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const quickReplies = [
        { id: 1, text: '📦 Tamaños de volquetes', emoji: '📦' },
        { id: 2, text: '💰 Consultar precio', emoji: '💰' },
        { id: 3, text: '🌱 Venta de tierra', emoji: '🌱' },
        { id: 4, text: '📍 Zonas de cobertura', emoji: '📍' },
        { id: 5, text: '⏱️ Tiempos de entrega', emoji: '⏱️' },
        { id: 6, text: '🧱 Residuos permitidos', emoji: '🧱' },
        { id: 7, text: '📝 Cómo reservar', emoji: '📝' },
        { id: 8, text: '📞 Contacto', emoji: '📞' },
    ];

    const quickReplyFallbacks: Record<string, string> = {
        '📦 Tamaños de volquetes': [
            'Tenemos 4 tamaños:',
            '• Volquete Chico 1.5m³',
            '• Volquete Mediano 3m³',
            '• Volquete Grande 6m³',
            '• Volquete con Barandas 7m³',
            '¿Querés que te asesore con el ideal para tu obra?'
        ].join('\n'),
        '💰 Consultar precio': [
            'Los precios dependen del tamaño, la zona y la duración.',
            'Para cotizar rápido, decime tamaño, dirección y fecha.',
            'Si querés, te atiendo por WhatsApp:'
        ].join('\n') + '\n' + whatsappUrl,
        '🌱 Venta de tierra': [
            'Vendemos:',
            '• Tierra negra zarandeada',
            '• Tierra negra común',
            '• Tierra colorada',
            '¿Querés que te asesore con el tipo ideal para tu obra?'
        ].join('\n'),
        '📍 Zonas de cobertura': [
            'Cubrimos Roldán y zonas cercanas:',
            '• Roldán',
            '• Funes',
            '• Pérez',
            '• Rosario (Norte y Sur)',
            '• Granadero Baigorria',
            '• Capitán Bermúdez',
            'Decime tu dirección y te confirmo.'
        ].join('\n'),
        '⏱️ Tiempos de entrega': [
            'En Roldán solemos entregar en el día.',
            'En otras zonas, 24 a 48 hs según disponibilidad.',
            'Si querés, coordinamos por WhatsApp:'
        ].join('\n') + '\n' + whatsappUrl,
        '🧱 Residuos permitidos': [
            'Aceptamos: escombros, tierra, cascotes, maderas y metales.',
            'No aceptamos: residuos peligrosos, químicos, orgánicos ni líquidos.'
        ].join('\n'),
        '📝 Cómo reservar': [
            'Para reservar necesitamos:',
            '• Tamaño de volquete',
            '• Dirección exacta',
            '• Fecha y horario',
            'Escribinos por WhatsApp y lo coordinamos rápido:'
        ].join('\n') + '\n' + whatsappUrl,
        '📞 Contacto': [
            'Tel: +54 9 341 362-3232',
            `WhatsApp: ${whatsappUrl}`,
            'Email: MauricioandresBay123@hotmail.com'
        ].join('\n'),
    };

    const isApiConfigured = Boolean(API_BASE_URL);

    const buildConversationHistory = (history: Message[]) =>
        history
            .slice(-6)
            .map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
            }));

    const registerFailure = (status?: number) => {
        const now = Date.now();
        if (now - lastFailureRef.current > 120000) {
            failureCountRef.current = 0;
        }
        failureCountRef.current += 1;
        lastFailureRef.current = now;

        return failureCountRef.current >= 2 || status === 429 || status === 503 || status === 504;
    };

    const resetFailures = () => {
        failureCountRef.current = 0;
        lastFailureRef.current = 0;
    };

    const renderTextWithLinks = (text: string) => {
        const parts = text.split(/(https?:\/\/[^\s]+)/g);

        return parts.map((part, index) => {
            if (part.startsWith('http://') || part.startsWith('https://')) {
                return (
                    <a
                        key={`link-${index}`}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary hover:text-primary-dark"
                    >
                        {part}
                    </a>
                );
            }

            return <span key={`text-${index}`}>{part}</span>;
        });
    };

    const appendBotMessage = (text: string) => {
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text,
            sender: 'bot',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
    };

    const handleSendMessage = async (
        text: string,
        options: { fallbackText?: string } = {}
    ) => {
        const trimmed = text.trim();
        if (!trimmed || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmed,
            sender: 'user',
            timestamp: new Date(),
        };

        const conversationHistory = buildConversationHistory(messages);

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        if (!isApiConfigured && import.meta.env.PROD) {
            appendBotMessage(options.fallbackText || `La IA no está configurada todavía.\n${whatsappCta}`);
            return;
        }

        // Solo respuestas rápidas por defecto: cualquier consulta manual va a WhatsApp.
        appendBotMessage(options.fallbackText || whatsappIfNoQuickReplies);
    };

    const handleQuickReply = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmed,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        const predefined = quickReplyFallbacks[text] || whatsappIfNoQuickReplies;
        appendBotMessage(predefined);
    };

    return (
        <>
            {/* Botón flotante - Responsive: más pequeño en móvil */}
            <div className="fixed bottom-6 left-4 sm:left-6 z-40">
                {!isOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="group relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-primary via-primary-light to-tertiary shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-110 border-0 overflow-visible"
                    >
                        {/* Anillo exterior giratorio 1 */}
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{ animationDuration: '8s' }}>
                            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50" />
                        </div>

                        {/* Anillo exterior giratorio 2 - dirección opuesta */}
                        <div className="absolute inset-1 rounded-full border-2 border-dashed border-white/20 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                            <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/50" />
                        </div>

                        {/* Fondo con efecto de pulso */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-tertiary animate-pulse" style={{ animationDuration: '3s' }} />

                        {/* Centro con ícono de Bot/IA */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Ícono principal del Bot - Responsive */}
                            <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />

                            {/* Partículas brillantes flotantes */}
                            <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                            <div className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }} />
                            <div className="absolute top-1/2 right-1 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                        </div>

                        {/* Efecto de brillo en hover */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Tooltip mejorado */}
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10">
                            💬 Chateá con RoldánIA
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full border-[6px] border-transparent border-r-slate-900" />
                        </div>
                    </Button>
                )}
            </div>

            {/* Ventana del chat - Responsive: fullscreen en móvil, ventana en desktop */}
            {isOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:left-6 z-50 w-full h-full sm:w-[420px] md:w-[520px] sm:h-[620px] md:h-[720px] flex flex-col bg-white sm:rounded-3xl shadow-2xl border-0 sm:border-2 border-primary/20 overflow-hidden animate-scale-in">
                    {/* Header mejorado */}
                    <div className="relative bg-gradient-to-br from-primary via-primary-light to-tertiary p-6 text-white">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXwid2lkdGg9IjEiLz48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvczJnPg==')] opacity-30" />

                        {/* Decoración adicional */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/20 rounded-full blur-2xl" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Avatar animado del constructor */}
                                <div className="relative">
                                    <ConstructorAvatar size={64} className="drop-shadow-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        RoldánIA
                                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-normal">Beta</span>
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-white/90">
                                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                        <span>Asistente Virtual</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Mensajes mejorados */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-slate-50 via-white to-slate-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}
                            >
                                {/* Avatar mejorado con animación */}
                                {message.sender === 'bot' ? (
                                    <div className="flex-shrink-0">
                                        <ConstructorAvatar size={48} />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-tertiary via-tertiary-light to-tertiary-dark text-white ring-2 ring-tertiary/20">
                                        <User className="w-6 h-6" />
                                    </div>
                                )}

                                {/* Mensaje mejorado con texto más grande */}
                                <div
                                    className={`max-w-[75%] rounded-2xl px-6 py-4 ${message.sender === 'bot'
                                        ? 'bg-white border-2 border-slate-100 text-slate-800 rounded-tl-none shadow-md hover:shadow-lg transition-shadow'
                                        : 'bg-gradient-to-br from-primary via-primary-light to-tertiary text-white rounded-tr-none shadow-lg'
                                        }`}
                                >
                                    <p className="text-lg leading-relaxed whitespace-pre-line font-medium">
                                        {renderTextWithLinks(message.text)}
                                    </p>
                                    <span
                                        className={`text-sm mt-2 block font-medium ${message.sender === 'bot' ? 'text-slate-400' : 'text-white/80'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString('es-AR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Indicador de escritura */}
                        {isTyping && (
                            <div className="flex gap-3 animate-fade-in-up">
                                <div className="flex-shrink-0">
                                    <ConstructorAvatar size={48} />
                                </div>
                                <div className="bg-white border-2 border-slate-100 rounded-2xl rounded-tl-none px-5 py-3.5 shadow-md">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Respuestas rápidas */}
                    <div className="px-4 py-3 bg-white border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wide">Respuestas rápidas</p>
                        <div className="flex flex-wrap gap-2">
                            {quickReplies.map((reply) => (
                                <button
                                    key={reply.id}
                                    onClick={() => handleQuickReply(reply.text)}
                                    disabled={isTyping}
                                    className="text-sm px-4 py-2.5 bg-gradient-to-r from-white to-emerald-50 text-slate-800 rounded-full transition-all duration-200 font-semibold border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {reply.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }}
                            className="flex gap-2"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribí tu consulta..."
                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                            />
                            <Button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-gradient-to-br from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white rounded-xl px-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                            Presioná Enter para enviar
                        </p>
                    </div>
                </div >
            )}
        </>
    );
};

export default ChatBot;

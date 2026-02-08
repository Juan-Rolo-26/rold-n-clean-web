import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, HardHat, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConstructorAvatar from '@/components/ConstructorAvatar';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
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
        { id: 4, text: '📞 Contacto', emoji: '📞' },
    ];

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simular respuesta del bot (aquí irá la IA después)
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const getBotResponse = (userText: string): string => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes('tamaño') || lowerText.includes('volquete') || lowerText.includes('medida')) {
            return '¡Perfecto! Tenemos volquetes de diferentes tamaños:\n\n📦 1.5m³ - Chico (ideal para limpiezas pequeñas)\n📦 3m³ - Mediano (obras medianas)\n📦 6m³ - Grande (el más elegido)\n📦 7m³ - Con barandas (máxima capacidad)\n\n¿Te gustaría más información sobre alguno en particular?';
        }

        if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('tarifa')) {
            return '💰 Para brindarte un presupuesto exacto, necesito algunos datos:\n\n• ¿Qué tamaño de volquete necesitás?\n• ¿Por cuántos días?\n• ¿En qué zona?\n\n¿Te gustaría que te contacte un asesor por WhatsApp para darte un precio personalizado?';
        }

        if (lowerText.includes('tierra') || lowerText.includes('jardin') || lowerText.includes('relleno')) {
            return '🌱 Vendemos tierra de primera calidad:\n\n• Tierra Negra Zarandeada (ideal para jardinería fina)\n• Tierra Negra Común (para relleno y nivelación)\n• Tierra Colorada (bases compactas)\n\nEntrega en volquetes o a granel. ¿Qué cantidad necesitás?';
        }

        if (lowerText.includes('contacto') || lowerText.includes('telefono') || lowerText.includes('whatsapp')) {
            return '📞 ¡Estamos para ayudarte!\n\n📱 WhatsApp: +54 9 341 362-3232\n📧 Email: info@volquetesroldan.com\n📍 Rosario, Santa Fe\n\n¿Querés que te conecte directamente con WhatsApp?';
        }

        if (lowerText.includes('horario') || lowerText.includes('hora') || lowerText.includes('cuando')) {
            return '🕐 Nuestros horarios:\n\nLunes a Viernes: 8:00 - 18:00\nSábados: 8:00 - 13:00\n\n¡Entrega y retiro en el día! ¿En qué más puedo ayudarte?';
        }

        if (lowerText.includes('gracias') || lowerText.includes('thank')) {
            return '¡De nada! 😊 Estoy aquí para lo que necesites. ¿Hay algo más en lo que pueda ayudarte?';
        }

        if (lowerText.includes('hola') || lowerText.includes('buenos') || lowerText.includes('buenas')) {
            return '¡Hola! 👋 ¿En qué puedo ayudarte hoy? Puedo informarte sobre:\n\n📦 Tamaños de volquetes\n💰 Precios\n🌱 Venta de tierra\n📞 Contacto\n\n¿Qué te interesa saber?';
        }

        return '🤔 Entiendo tu consulta. Para darte la mejor respuesta, ¿podrías darme más detalles? También puedo conectarte con un asesor por WhatsApp para una atención personalizada. ¿Te gustaría?';
    };

    const handleQuickReply = (text: string) => {
        handleSendMessage(text);
    };

    return (
        <>
            {/* Botón flotante - Posicionado a la izquierda para no superponerse con redes sociales */}
            <div className="fixed bottom-6 left-6 z-50">
                {!isOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="group relative h-16 w-16 rounded-full bg-gradient-to-br from-primary via-primary-light to-tertiary shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 border-4 border-white"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                        <MessageCircle className="w-7 h-7 text-white relative z-10" />

                        {/* Badge de notificación */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-tertiary rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            ¿Necesitás ayuda? 🏗️
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full border-8 border-transparent border-r-slate-900" />
                        </div>
                    </Button>
                )}
            </div>

            {/* Ventana del chat - MUCHO MÁS GRANDE */}
            {isOpen && (
                <div className="fixed bottom-6 left-6 z-50 w-[500px] h-[750px] flex flex-col bg-white rounded-3xl shadow-2xl border-2 border-primary/20 overflow-hidden animate-scale-in">
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
                                    <p className="text-lg leading-relaxed whitespace-pre-line font-medium">{message.text}</p>
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
                    {messages.length === 1 && (
                        <div className="px-4 py-2 bg-white border-t border-slate-100">
                            <p className="text-xs text-slate-500 mb-2 font-medium">Respuestas rápidas:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply.id}
                                        onClick={() => handleQuickReply(reply.text)}
                                        className="text-xs px-3 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-full transition-all duration-200 font-medium border border-slate-200 hover:border-primary hover:shadow-md"
                                    >
                                        {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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
                                disabled={!inputValue.trim()}
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

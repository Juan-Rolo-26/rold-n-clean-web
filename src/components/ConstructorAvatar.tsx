import React from 'react';

interface ConstructorAvatarProps {
    size?: number;
    className?: string;
}

const ConstructorAvatar: React.FC<ConstructorAvatarProps> = ({ size = 48, className = '' }) => {
    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Fondo circular con gradiente */}
                <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4DBF49" />
                        <stop offset="50%" stopColor="#6DD669" />
                        <stop offset="100%" stopColor="#E94F37" />
                    </linearGradient>

                    <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>

                    <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFDAB9" />
                        <stop offset="100%" stopColor="#FFB380" />
                    </linearGradient>
                </defs>

                {/* Fondo circular animado */}
                <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" opacity="0.2">
                    <animate
                        attributeName="r"
                        values="48;50;48"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Cuerpo (camisa verde) */}
                <path
                    d="M 30 65 Q 30 55 35 55 L 65 55 Q 70 55 70 65 L 70 85 Q 70 90 65 90 L 35 90 Q 30 90 30 85 Z"
                    fill="#4DBF49"
                />

                {/* Cuello de la camisa */}
                <rect x="45" y="55" width="10" height="8" fill="#3A9F3F" rx="2" />

                {/* Cara */}
                <ellipse cx="50" cy="45" rx="18" ry="20" fill="url(#faceGradient)" />

                {/* Casco de obra */}
                <g>
                    {/* Base del casco */}
                    <path
                        d="M 32 40 Q 32 25 50 22 Q 68 25 68 40 L 70 42 Q 70 45 68 45 L 32 45 Q 30 45 30 42 Z"
                        fill="url(#helmetGradient)"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 50 35; -2 50 35; 0 50 35; 2 50 35; 0 50 35"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Visera del casco */}
                    <ellipse cx="50" cy="42" rx="20" ry="3" fill="#FFA500" opacity="0.6" />

                    {/* Franja reflectante */}
                    <rect x="35" y="32" width="30" height="3" fill="#FF6B00" rx="1.5">
                        <animate
                            attributeName="opacity"
                            values="0.6;1;0.6"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </rect>
                </g>

                {/* Ojos */}
                <g>
                    <ellipse cx="42" cy="46" rx="2.5" ry="3" fill="#2C3E50">
                        <animate
                            attributeName="ry"
                            values="3;0.5;3"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </ellipse>
                    <ellipse cx="58" cy="46" rx="2.5" ry="3" fill="#2C3E50">
                        <animate
                            attributeName="ry"
                            values="3;0.5;3"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </ellipse>

                    {/* Brillo en los ojos */}
                    <circle cx="43" cy="45" r="1" fill="white" opacity="0.8" />
                    <circle cx="59" cy="45" r="1" fill="white" opacity="0.8" />
                </g>

                {/* Sonrisa */}
                <path
                    d="M 42 52 Q 50 56 58 52"
                    stroke="#2C3E50"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="d"
                        values="M 42 52 Q 50 56 58 52; M 42 52 Q 50 58 58 52; M 42 52 Q 50 56 58 52"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Herramienta (llave inglesa pequeña) */}
                <g transform="translate(72, 70)">
                    <rect x="0" y="0" width="3" height="12" fill="#95A5A6" rx="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 1.5 6; 15 1.5 6; 0 1.5 6; -15 1.5 6; 0 1.5 6"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </rect>
                    <circle cx="1.5" cy="2" r="2.5" fill="none" stroke="#95A5A6" strokeWidth="1.5" />
                </g>

                {/* Partículas flotantes (chispas de trabajo) */}
                <g opacity="0.6">
                    <circle cx="25" cy="30" r="1.5" fill="#FFD700">
                        <animate
                            attributeName="cy"
                            values="30;20;30"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="75" cy="35" r="1.5" fill="#FFD700">
                        <animate
                            attributeName="cy"
                            values="35;25;35"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="20" cy="60" r="1" fill="#4DBF49">
                        <animate
                            attributeName="cy"
                            values="60;50;60"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0;0.8;0"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>

            {/* Badge de IA con animación */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-tertiary to-tertiary-dark rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            </div>
        </div>
    );
};

export default ConstructorAvatar;

# 📸 Guía para Añadir Imágenes a la Web de Volquetes

## 🎯 Ubicaciones para las Imágenes

### 1. **Carpeta Principal de Imágenes**
```
/home/juampi26/rold-n-clean-web/src/assets/
```

Esta es la ubicación principal donde debes colocar TODAS tus imágenes.

### 2. **Imágenes Requeridas**

#### **Hero / Banner Principal:**
- **Archivo actual:** `hero-volquete.jpg`
- **Ubicación:** `/home/juampi26/rold-n-clean-web/src/assets/hero-volquete.jpg`
- **Descripción:** Imagen principal del banner superior
- **Dimensiones recomendadas:** 1920x1080px (Full HD)
- **Formato:** JPG o WebP para mejor rendimiento

#### **Galería de Volquetes:**
Crear subcarpeta: `/home/juampi26/rold-n-clean-web/src/assets/gallery/`

Nombres sugeridos:
- `volquete-1.jpg` - Volquete de 4m³
- `volquete-2.jpg` - Volquete de 6m³
- `volquete-3.jpg` - Volquete de 8m³
- `volquete-action-1.jpg` - Volquete siendo cargado
- `volquete-action-2.jpg` - Volquete en obra
- `volquete-action-3.jpg` - Volquete en entrega
- **Dimensiones recomendadas:** 800x600px
- **Formato:** JPG o WebP

#### **Servicios:**
Crear subcarpeta: `/home/juampi26/rold-n-clean-web/src/assets/services/`

Nombres sugeridos:
- `alquiler-volquetes.jpg` - Imagen de alquiler de volquetes
- `venta-materiales.jpg` - Tierra, arena, piedra
- `gestion-residuos.jpg` - Gestión de residuos
- **Dimensiones recomendadas:** 600x400px
- **Formato:** JPG o WebP

#### **Logo de la Empresa:**
- **Ubicación:** `/home/juampi26/rold-n-clean-web/public/`
- **Nombre sugerido:** `logo.png` o `logo.svg`
- **Dimensiones:** 200x200px (PNG transparente) o SVG
- **Uso:** Se mostrará en el header/navbar

#### **Favicon:**
- **Ubicación:** `/home/juampi26/rold-n-clean-web/public/`
- **Nombre:** `favicon.ico`
- **Dimensiones:** 32x32px o 64x64px
- **Formato:** ICO o PNG

## 🚀 Cómo Usar las Imágenes en el Código

### Ejemplo 1: Importar en componentes
```tsx
import volqueteImg from '@/assets/gallery/volquete-1.jpg';

<img src={volqueteImg} alt="Volquete 4m³" />
```

### Ejemplo 2: Desde la carpeta public
```tsx
<img src="/logo.png" alt="Logo Volquetes Roldán" />
```

### Ejemplo 3: Como fondo CSS
```tsx
<div 
  style={{
    backgroundImage: `url(${volqueteImg})`
  }}
/>
```

## 📋 Checklist de Imágenes Necesarias

- [ ] **Hero principal** - 1 imagen (ya existe: hero-volquete.jpg)
- [ ] **Galería de volquetes** - 6-9 imágenes
- [ ] **Servicios** - 3 imágenes
- [ ] **Logo de la empresa** - 1 imagen PNG/SVG
- [ ] **Favicon** - 1 icono
- [ ] **Testimonios** (opcional) - Fotos de clientes
- [ ] **Equipo/Nosotros** (opcional) - Fotos del equipo

## 💡 Mejores Prácticas

### 1. **Optimización de Imágenes**
- Usa herramientas como TinyPNG o Squoosh para comprimir
- Formato WebP para mejor rendimiento web
- JPG para fotos, PNG para logos con transparencia

### 2. **Nombres de Archivo**
- Usa nombres descriptivos: `volquete-grande-8m3.jpg`
- Sin espacios, usa guiones: `-`
- Todo en minúsculas
- Sin caracteres especiales

### 3. **Dimensiones Óptimas**
- **Hero/Banner:** 1920x1080px (16:9)
- **Galería:** 800x600px (4:3)
- **Thumbnails:** 400x300px
- **Logo:** 200x200px (cuadrado) o proporción original
- **Icons:** 64x64px

### 4. **Accesibilidad**
- Siempre usa el atributo `alt` descriptivo
- Ejemplo: `alt="Volquete de 8 metros cúbicos en obra de construcción"`

## 🔄 Actualizar Componentes con Nuevas Imágenes

### Gallery.tsx
Ubicación: `/home/juampi26/rold-n-clean-web/src/components/Gallery.tsx`

Busca el array de imágenes y actualiza:
```tsx
const galleryImages = [
  { src: '/assets/gallery/volquete-1.jpg', alt: 'Volquete 4m³' },
  { src: '/assets/gallery/volquete-2.jpg', alt: 'Volquete 6m³' },
  // ... más imágenes
];
```

### Hero.tsx
Ubicación: `/home/juampi26/rold-n-clean-web/src/components/Hero.tsx`

Ya está configurado para usar `hero-volquete.jpg`, pero puedes cambiarlo:
```tsx
import heroImage from '@/assets/tu-nueva-imagen.jpg';
```

## 📱 Contacto y Soporte

Si necesitas ayuda para:
- Redimensionar imágenes
- Optimizar para web
- Configurar nuevos componentes con imágenes

¡Avísame y te ayudo!

## 🎨 Inspiración Visual

La web está diseñada con:
- ✨ Animaciones suaves y elegantes
- 🎨 Gradientes vibrantes (azul y naranja)
- 💎 Efectos glassmorphism
- 🌊 Transiciones fluidas
- ⚡ Diseño premium y moderno

**Asegúrate de que tus imágenes sean de alta calidad para mantener este nivel premium!**

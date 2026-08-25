# Raúl Butací UTMB 100 Millas - Video Compositions Guide

## 📹 Overview

Este proyecto contiene tres composiciones de video viral sobre **Raúl Butací** compitiendo en las **100 Millas UTMB 2024**. Cada composición está optimizada para diferentes plataformas y duraciones.

---

## 🎥 Composiciones Disponibles

### 1. **RaulButaciUTMB** (Composición Principal)
**Duración:** 10 segundos (300 frames @ 30fps)  
**ID:** `RaulButaciUTMB`  
**Plataformas:** Todas

#### Características:
- Animación de título con efectos de escala y rotación
- Transiciones suaves con opacidad
- Sección de estadísticas con 3 tarjetas (160km, 10k metros, 46h)
- Colores: Dorado (#FFD700) y Carmesí (#DC143C)
- Efectos de sombra y brillo para máximo impacto
- Diseño limpio y profesional

#### Animación Timeline:
- **0-3s:** Entrada de título principal
- **3-5s:** Deslizamiento de imagen secundaria
- **5-8s:** Texto descriptivo con desvanecimiento
- **8-10s:** Sección de estadísticas

---

### 2. **RaulButaciUTMBAdvanced** (Versión Premium)
**Duración:** 12 segundos (360 frames @ 30fps)  
**ID:** `RaulButaciUTMBAdvanced`  
**Plataformas:** YouTube, redes profesionales

#### Características:
- Entrada dramática con animación de resorte
- Visualización de montañas con gradientes SVG
- Sección de perfil del corredor con deslizamiento
- Sección de desafío con mensajes motivacionales
- Barra de borde animado con gradiente
- Diseño cinematográfico de alta producción

#### Animación Timeline:
- **0-4s:** Abertura dramática con título UTMB 2024
- **2-3s:** Visualización de picos de montaña
- **4-6s:** Perfil de Raúl Butací
- **6-10s:** Sección "El Desafío Más Extremo"
- **10-12s:** Cierre motivacional

---

### 3. **RaulButaciShorts** (Optimizado para Redes Sociales)
**Duración:** 12 segundos (360 frames @ 30fps)  
**ID:** `RaulButaciShorts`  
**Plataformas:** Instagram Reels, TikTok, YouTube Shorts, Twitter

#### Características:
- Efectos de líneas de velocidad
- Entrada rápida y dinámica
- Tarjetas de estadísticas con emojis (⛰️, ⏱️, 🏔️)
- Mensajería viral con hooks
- Esquinas animadas con acentos
- Diseño vertical/cuadrado optimizado

#### Animación Timeline:
- **0-2s:** Entrada explosiva: 160 KM
- **1-2s:** Efectos de líneas de velocidad
- **1-4s:** Tarjetas de estadísticas con stagger
- **3-6s:** "Sin Parar" hook
- **6-10s:** Sección "Raúl Butací" con mensaje viral
- **9-12s:** CTA final: ¡VAMOS!

---

## 🎨 Especificaciones Técnicas

### Configuración General
- **Resolución:** 1920 x 1080 (Full HD)
- **FPS:** 30 frames por segundo
- **Formato:** MP4 (con comando `npm run build`)

### Paleta de Colores
- **Dorado (Primario):** `#FFD700`
- **Carmesí (Secundario):** `#DC143C`
- **Blanco (Texto):** `#FFFFFF`
- **Negro (Fondo):** `#000000`

### Tipografía
- **Fuente Primaria:** "Arial Black", sans-serif
- **Pesos:** 500-900 (Bold, Extra Bold, Black)
- **Espaciado de letras:** 2-6px para máximo impacto

---

## 🚀 Cómo Renderizar

### Renderizar una composición específica:

```bash
# Renderizar RaulButaciUTMB
npm run build -- --composition=RaulButaciUTMB

# Renderizar RaulButaciUTMBAdvanced
npm run build -- --composition=RaulButaciUTMBAdvanced

# Renderizar RaulButaciShorts
npm run build -- --composition=RaulButaciShorts
```

### Vista previa en tiempo real:

```bash
npm start
```

Luego selecciona la composición en la interfaz web de Remotion.

### Crear una imagen estática (preview):

```bash
npm run build-still
```

---

## 📊 Estadísticas del Evento

### UTMB 100 Millas 2024 - Key Metrics
- **Distancia:** 160 kilómetros
- **Elevación:** 10,000 metros de desnivel positivo
- **Límite de tiempo:** 46 horas
- **Recorrido:** Mont Blanc (Europa)
- **Dificultad:** Extrema - Solo campeones
- **Competidor:** Raúl Butací

---

## 🎯 Estrategia de Distribución

### Instagram Reels & TikTok
→ Usar **RaulButaciShorts**
- Formato vertical/cuadrado
- Duración rápida (12 segundos)
- Hashtags: #UTMB #ULTRARUNNER #MONTBLANC

### YouTube
→ Usar **RaulButaciUTMBAdvanced**
- Formato horizontal
- Duración media (12 segundos)
- Puede usarse en YouTube Shorts también

### Twitter/X & LinkedIn
→ Usar **RaulButaciUTMB**
- Versión clásica (10 segundos)
- Profesional y concisa

### Sitio Web & Newsletters
→ Usar **RaulButaciUTMBAdvanced**
- Mayor producción visual
- Mensaje inspirador completo

---

## 🎬 Customización

### Para agregar imágenes reales del corredor:

Cada composición puede ser modificada para incluir:
```tsx
import { Img } from 'remotion';

// En cualquier secuencia:
<Img src="/path-to-image.jpg" style={{...}} />
```

### Para agregar audio/música:

```tsx
import { Audio } from 'remotion';

// En la composición:
<Audio src="/path-to-music.mp3" startFrom={0} />
```

---

## 💡 Consejos para Máximo Impacto

1. **Subtítulos:** Agrega subtítulos en español/inglés para máximo reach
2. **Watermark:** Incluye logo/marca en la esquina
3. **Descripción:** Usa hashtags virales: #UTMB #ULTRARUNNER #LIMIT
4. **Timing:** Publica en horarios pico (7-9pm)
5. **Música:** Elige música motivacional (uplifting/epic)
6. **Duraciones:**
   - Para TikTok/Reels: 7-15 segundos (máximo 60s)
   - Para YouTube: 30 segundos - 2 minutos
   - Para Twitter: hasta 30 segundos

---

## 📝 Stack Técnico

- **Remotion:** React-based video framework
- **React 18:** UI components
- **TypeScript:** Type safety
- **FFmpeg:** Video encoding (built-in con Remotion)

---

## 🔗 Resources

- [Remotion Documentation](https://www.remotion.dev/)
- [UTMB Official Website](https://www.utmb.world/)
- [Raúl Butací - Ultra Runner Profile](#)

---

**Created with ❤️ for Raúl Butací & UTMB 2024**

Última actualización: Agosto 25, 2026

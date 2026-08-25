# 🚀 Quick Start - Raúl Butací UTMB Videos

Genera videos virales de Raúl Butací en 3 pasos simples.

---

## ⚡ 3 Pasos Rápidos

### 1️⃣ Instalar Dependencias
```bash
npm install
```

### 2️⃣ Elegir tu Video
```bash
# Opción A: Vista previa en vivo (interactivo)
npm start

# Opción B: Renderizar video específico
npm run build -- --composition=RaulButaciShorts
npm run build -- --composition=RaulButaciUTMB
npm run build -- --composition=RaulButaciUTMBAdvanced
```

### 3️⃣ ¡Listo! 🎉
Tu video MP4 estará en `output.mp4`

---

## 📹 Videos Disponibles

| Video | Duración | Mejor Para | Comando |
|-------|----------|-----------|---------|
| **Shorts** | 12s | TikTok, Reels, Shorts | `--composition=RaulButaciShorts` |
| **Main** | 10s | YouTube, Twitter, Todas | `--composition=RaulButaciUTMB` |
| **Advanced** | 12s | YouTube, Premium | `--composition=RaulButaciUTMBAdvanced` |

---

## 🎨 Visualización Rápida

```bash
# Ver todas las composiciones en tiempo real
npm start

# Luego selecciona en la interfaz web:
# http://localhost:3000
```

---

## 🖼️ Crear Imagen Estática (Preview)

```bash
npm run build-still
```

---

## 📊 Estadísticas del Evento

```
🏃 Corredor: Raúl Butací
🏔️ Evento: UTMB 2024 (100 Millas)
📍 Ubicación: Mont Blanc, Europa
🎯 Distancia: 160 km
⬆️ Elevación: 10,000 metros
⏱️ Límite: 46 horas
```

---

## 🎯 Recomendaciones por Plataforma

### 📱 Instagram Reels
```
Video: RaulButaciShorts
Duración: 12 segundos
Hashtags: #UTMB #ULTRARUNNER #MontBlanc
```

### 🎵 TikTok
```
Video: RaulButaciShorts
Duración: 12 segundos
Sonido: Música motivacional épica
```

### 📺 YouTube Shorts
```
Video: RaulButaciShorts o RaulButaciUTMBAdvanced
Duración: 12 segundos
Descripción: Link a competencia UTMB
```

### 🐦 Twitter/X
```
Video: RaulButaciUTMB
Duración: 10 segundos
Tweet: Mensaje motivador + hashtags
```

---

## 🎬 Opciones de Renderizado Avanzadas

```bash
# Renderizar con codec específico
remotion render src/index.tsx output.mp4 \
  --composition=RaulButaciShorts \
  --codec=h264 \
  --crf=18

# Renderizar con calidad máxima
remotion render src/index.tsx output.mp4 \
  --composition=RaulButaciUTMBAdvanced \
  --concurrency=4 \
  --crf=16
```

---

## 📝 Personalización Rápida

### Cambiar colores:
```tsx
// En cualquier archivo de composición:
color: '#FFD700'  // Dorado → cambiar aquí
color: '#DC143C'  // Rojo Carmesí → cambiar aquí
```

### Cambiar texto:
```tsx
<h1>Nuevo texto aquí</h1>
```

### Cambiar duración:
```tsx
// En index.tsx:
<Composition
  durationInFrames={300}  // ← Cambiar número
  fps={30}
  // ...
/>
```

---

## 🔧 Troubleshooting

### ❌ Error: "Cannot find module"
```bash
npm install
```

### ❌ Video es muy lento/rápido
Ajusta `fps` o `durationInFrames` en `index.tsx`

### ❌ Color se ve diferente
Verifica que los valores hex sean correctos:
- `#FFD700` (Dorado)
- `#DC143C` (Rojo Carmesí)
- `#FFFFFF` (Blanco)
- `#000000` (Negro)

### ❌ Necesito más detalles
📖 Lee [VIDEOS_GUIDE.md](./VIDEOS_GUIDE.md)

---

## 💾 Archivos Generados

```
output.mp4                    ← Video renderizado
still.png                     ← Imagen de preview
videos-metadata.json          ← Metadatos del proyecto
VIDEOS_GUIDE.md              ← Documentación completa
```

---

## 🎯 Próximos Pasos

1. ✅ Renderiza el video
2. 📤 Sube a la plataforma elegida
3. 📊 Monitorea métricas de engagement
4. 🔄 Optimiza según resultados
5. 🚀 ¡Vamos Raúl!

---

## 📞 Soporte

- **Documentación Completa:** [VIDEOS_GUIDE.md](./VIDEOS_GUIDE.md)
- **Metadatos:** [videos-metadata.json](./videos-metadata.json)
- **Remotion Docs:** https://www.remotion.dev/

---

**¡Listo para crear videos virales? ¡Comienza ahora!** 🎬🚀

```bash
npm start
```

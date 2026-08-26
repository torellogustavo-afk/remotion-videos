import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface FeatureShowcaseProps {
  frameProgress: number;
}

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
  frameProgress: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  glowIntensity: number;
}> = ({ icon, title, description, delay, frameProgress, position, glowIntensity }) => {
  const adjustedProgress = Math.max(0, frameProgress - delay);
  // Slower entrance: 0.3s to appear, stays visible, slower exit
  const opacity = interpolate(adjustedProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });
  // Subtle scale: not aggressive
  const scale = interpolate(adjustedProgress, [0, 0.4], [0.85, 1], { easing: Easing.out(Easing.quad) });

  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: 120, left: 60 },
    'top-right': { top: 120, right: 60 },
    'bottom-left': { bottom: 120, left: 60 },
    'bottom-right': { bottom: 120, right: 60 },
  };

  return (
    <div
      style={{
        position: 'absolute',
        ...positionStyles[position],
        width: 350,
        padding: 30,
        background: 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.4) 100%)',
        border: '1px solid rgba(0,184,255,0.2)',
        borderRadius: 16,
        opacity,
        transform: `scale(${scale})`,
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        boxShadow: `0 0 30px rgba(0, 184, 255, ${glowIntensity * 0.2})`,
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#00b8ff', marginBottom: 12, fontFamily: "'Inter', sans-serif", textShadow: `0 0 10px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: '#a0aec0', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
        {description}
      </div>
    </div>
  );
};

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ frameProgress }) => {
  // Keep visible until very end for reading
  const fadeOut = interpolate(frameProgress, [0.92, 1], [1, 0], { easing: Easing.in(Easing.quad) });

  // Title entrance
  const titleOpacity = interpolate(frameProgress, [0, 0.15], [0, 1], { easing: Easing.out(Easing.quad) });

  // Cinematic zoom effect on background
  const bgZoom = interpolate(frameProgress, [0, 1], [1, 1.05], {
    easing: Easing.linear,
  });

  // Glow intensity pulse
  const glowIntensity = interpolate(
    frameProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.5],
    { easing: Easing.inOut(Easing.quad) }
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background elements */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0,184,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '30%',
          right: '-10%',
          filter: `blur(60px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.5,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(0,255,150,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-15%',
          left: '-10%',
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.4,
        }}
      />

      {/* Center title */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 20,
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 52, fontWeight: 900, color: 'white', margin: 0, fontFamily: "'Inter', sans-serif", textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
          Herramientas Profesionales
        </h2>
        <p style={{ fontSize: 18, color: '#a0aec0', marginTop: 16, fontFamily: "'Inter', sans-serif" }}>
          Todo lo que necesitas para tomar decisiones informadas
        </p>
      </div>

      {/* Feature cards - SPACED OUT for clarity */}
      <FeatureCard
        icon="📊"
        title="Mapas de Calor"
        description="Visualización de volatilidad por zonas geográficas y sectores de mercado"
        delay={0.15}
        frameProgress={frameProgress}
        position="top-left"
        glowIntensity={glowIntensity}
      />

      <FeatureCard
        icon="💹"
        title="Cotizaciones Vivas"
        description="Datos en tiempo real de miles de activos financieros"
        delay={0.35}
        frameProgress={frameProgress}
        position="top-right"
        glowIntensity={glowIntensity}
      />

      <FeatureCard
        icon="📈"
        title="Gráficos TradingView"
        description="Análisis técnico avanzado con indicadores profesionales"
        delay={0.55}
        frameProgress={frameProgress}
        position="bottom-left"
        glowIntensity={glowIntensity}
      />

      <FeatureCard
        icon="🎯"
        title="Señales Precisas"
        description="Alertas de compra/venta basadas en estrategias comprobadas"
        delay={0.75}
        frameProgress={frameProgress}
        position="bottom-right"
        glowIntensity={glowIntensity}
      />

      {/* Vignette effect for cinema look */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </AbsoluteFill>
  );
};

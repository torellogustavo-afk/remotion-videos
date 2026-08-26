import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface FeatureShowcaseVerticalProps {
  frameProgress: number;
}

const FeatureCardVertical: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
  frameProgress: number;
  glowIntensity: number;
}> = ({ icon, title, description, delay, frameProgress, glowIntensity }) => {
  const adjustedProgress = Math.max(0, frameProgress - delay);
  const opacity = interpolate(adjustedProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });
  const scale = interpolate(adjustedProgress, [0, 0.4], [0.85, 1], { easing: Easing.out(Easing.quad) });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 320,
        padding: 20,
        marginBottom: 16,
        background: 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.4) 100%)',
        border: '1px solid rgba(0,184,255,0.2)',
        borderRadius: 12,
        opacity,
        transform: `scale(${scale})`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 0 30px rgba(0, 184, 255, ${glowIntensity * 0.2})`,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#00b8ff', marginBottom: 10, fontFamily: "'Inter', sans-serif", textShadow: `0 0 10px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: '#a0aec0', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
        {description}
      </div>
    </div>
  );
};

export const FeatureShowcaseVertical: React.FC<FeatureShowcaseVerticalProps> = ({ frameProgress }) => {
  const fadeOut = interpolate(frameProgress, [0.92, 1], [1, 0], { easing: Easing.in(Easing.quad) });
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: fadeOut,
        flexDirection: 'column',
        padding: '40px 20px',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background elements */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
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
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0,255,150,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-10%',
          left: '-10%',
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.4,
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          zIndex: 20,
          marginBottom: 30,
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 900, color: 'white', margin: 0, fontFamily: "'Inter', sans-serif", marginBottom: 8, textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
          Herramientas
        </h2>
        <p style={{ fontSize: 14, color: '#a0aec0', margin: 0, fontFamily: "'Inter', sans-serif" }}>
          Profesionales y precisas
        </p>
      </div>

      {/* Feature cards - STACKED VERTICALLY */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          maxWidth: '100%',
        }}
      >
        <FeatureCardVertical
          icon="📊"
          title="Mapas de Calor"
          description="Visualización de volatilidad por zonas"
          delay={0.15}
          frameProgress={frameProgress}
          glowIntensity={glowIntensity}
        />

        <FeatureCardVertical
          icon="💹"
          title="Cotizaciones Vivas"
          description="Datos en tiempo real de activos"
          delay={0.35}
          frameProgress={frameProgress}
          glowIntensity={glowIntensity}
        />

        <FeatureCardVertical
          icon="📈"
          title="Gráficos TradingView"
          description="Análisis técnico avanzado"
          delay={0.55}
          frameProgress={frameProgress}
          glowIntensity={glowIntensity}
        />

        <FeatureCardVertical
          icon="🎯"
          title="Señales Precisas"
          description="Alertas de compra/venta"
          delay={0.75}
          frameProgress={frameProgress}
          glowIntensity={glowIntensity}
        />
      </div>

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

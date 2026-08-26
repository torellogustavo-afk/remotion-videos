import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface MetricsSceneVerticalProps {
  frameProgress: number;
}

const AnimatedMetricVertical: React.FC<{
  value: number;
  label: string;
  delay: number;
  frameProgress: number;
  icon: string;
  glowIntensity: number;
}> = ({ value, label, delay, frameProgress, icon, glowIntensity }) => {
  const adjustedProgress = Math.max(0, frameProgress - delay);
  const opacity = interpolate(adjustedProgress, [0, 0.3, 0.75, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });
  const scale = interpolate(adjustedProgress, [0, 0.4], [0.8, 1], { easing: Easing.out(Easing.quad) });
  const displayValue = Math.round(interpolate(adjustedProgress, [0, 0.6], [0, value]));

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: 'center',
        marginBottom: 24,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 36, fontWeight: 900, color: '#00b8ff', fontFamily: "'Inter', sans-serif", textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.4}), 0 0 40px rgba(0, 255, 150, ${glowIntensity * 0.2})` }}>
        {displayValue.toLocaleString()}
      </div>
      <div style={{ fontSize: 14, color: '#a0aec0', marginTop: 6, fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
    </div>
  );
};

export const MetricsSceneVertical: React.FC<MetricsSceneVerticalProps> = ({ frameProgress }) => {
  const fadeOut = interpolate(frameProgress, [0.85, 1], [1, 0], { easing: Easing.in(Easing.quad) });
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
        padding: '40px',
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
          top: '20%',
          right: '-10%',
          filter: `blur(60px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.6,
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
          left: '-15%',
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.4,
        }}
      />

      <div style={{
        position: 'absolute',
        top: 60,
        fontSize: 40,
        fontWeight: 700,
        color: 'white',
        fontFamily: "'Inter', sans-serif",
        opacity: titleOpacity,
        textAlign: 'center',
        textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3})`,
      }}>
        Métricas de Análisis
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: 280,
          marginTop: 40,
        }}
      >
        {/* Staggered delays: 0.2s apart for clear sequential entry */}
        <AnimatedMetricVertical value={5000000} label="Usuarios Activos" delay={0.15} frameProgress={frameProgress} icon="👥" glowIntensity={glowIntensity} />
        <AnimatedMetricVertical value={15000} label="Activos Analizados" delay={0.35} frameProgress={frameProgress} icon="📊" glowIntensity={glowIntensity} />
        <AnimatedMetricVertical value={24} label="Horas Análisis Diario" delay={0.55} frameProgress={frameProgress} icon="⏱️" glowIntensity={glowIntensity} />
        <AnimatedMetricVertical value={99.9} label="% Uptime" delay={0.75} frameProgress={frameProgress} icon="✅" glowIntensity={glowIntensity} />
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

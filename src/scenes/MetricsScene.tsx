import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface MetricsSceneProps {
  frameProgress: number;
}

const AnimatedMetric: React.FC<{
  value: number;
  label: string;
  delay: number;
  frameProgress: number;
  icon: string;
}> = ({ value, label, delay, frameProgress, icon }) => {
  const adjustedProgress = Math.max(0, frameProgress - delay);
  const opacity = interpolate(adjustedProgress, [0, 0.2], [0, 1], { easing: Easing.out(Easing.cubic) });
  const scale = interpolate(adjustedProgress, [0, 0.3], [0.5, 1], { easing: Easing.out(Easing.cubic) });
  const displayValue = Math.round(interpolate(adjustedProgress, [0, 1], [0, value]));

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 48, fontWeight: 900, color: '#00b8ff', fontFamily: "'Inter', sans-serif" }}>
        {displayValue.toLocaleString()}
      </div>
      <div style={{ fontSize: 16, color: '#a0aec0', marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
    </div>
  );
};

export const MetricsScene: React.FC<MetricsSceneProps> = ({ frameProgress }) => {
  const fadeOut = interpolate(frameProgress, [0.8, 1], [1, 0], { easing: Easing.in(Easing.ease) });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      <div style={{ position: 'absolute', top: 80, fontSize: 48, fontWeight: 700, color: 'white', fontFamily: "'Inter', sans-serif" }}>
        Métricas de Análisis
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          maxWidth: 1200,
          padding: '0 40px',
        }}
      >
        <AnimatedMetric value={5000000} label="Usuarios Activos" delay={0} frameProgress={frameProgress} icon="👥" />
        <AnimatedMetric value={15000} label="Activos Analizados" delay={0.1} frameProgress={frameProgress} icon="📊" />
        <AnimatedMetric value={24} label="Horas Análisis Diario" delay={0.2} frameProgress={frameProgress} icon="⏱️" />
        <AnimatedMetric value={99.9} label="% Uptime" delay={0.3} frameProgress={frameProgress} icon="✅" />
      </div>
    </AbsoluteFill>
  );
};

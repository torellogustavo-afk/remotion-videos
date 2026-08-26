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
}> = ({ icon, title, description, delay, frameProgress, position }) => {
  const adjustedProgress = Math.max(0, frameProgress - delay);
  const opacity = interpolate(adjustedProgress, [0, 0.15], [0, 1], { easing: Easing.out(Easing.cubic) });
  const scale = interpolate(adjustedProgress, [0, 0.25], [0.7, 1], { easing: Easing.out(Easing.cubic) });

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
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#00b8ff', marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: '#a0aec0', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
        {description}
      </div>
    </div>
  );
};

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ frameProgress }) => {
  const fadeOut = interpolate(frameProgress, [0.9, 1], [1, 0], { easing: Easing.in(Easing.ease) });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Center title */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 20,
          opacity: interpolate(frameProgress, [0, 0.2], [0, 1], { easing: Easing.out(Easing.cubic) }),
        }}
      >
        <h2 style={{ fontSize: 52, fontWeight: 900, color: 'white', margin: 0, fontFamily: "'Inter', sans-serif" }}>
          Herramientas Profesionales
        </h2>
        <p style={{ fontSize: 18, color: '#a0aec0', marginTop: 16, fontFamily: "'Inter', sans-serif" }}>
          Todo lo que necesitas para tomar decisiones informadas
        </p>
      </div>

      {/* Feature cards */}
      <FeatureCard
        icon="📊"
        title="Mapas de Calor"
        description="Visualización de volatilidad por zonas geográficas y sectores de mercado"
        delay={0.1}
        frameProgress={frameProgress}
        position="top-left"
      />

      <FeatureCard
        icon="💹"
        title="Cotizaciones Vivas"
        description="Datos en tiempo real de miles de activos financieros"
        delay={0.2}
        frameProgress={frameProgress}
        position="top-right"
      />

      <FeatureCard
        icon="📈"
        title="Gráficos TradingView"
        description="Análisis técnico avanzado con indicadores profesionales"
        delay={0.3}
        frameProgress={frameProgress}
        position="bottom-left"
      />

      <FeatureCard
        icon="🎯"
        title="Señales Precisas"
        description="Alertas de compra/venta basadas en estrategias comprobadas"
        delay={0.4}
        frameProgress={frameProgress}
        position="bottom-right"
      />
    </AbsoluteFill>
  );
};

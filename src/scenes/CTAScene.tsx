import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface CTASceneProps {
  frameProgress: number;
}

export const CTAScene: React.FC<CTASceneProps> = ({ frameProgress }) => {
  const mainOpacity = interpolate(frameProgress, [0, 0.15], [0, 1], { easing: Easing.out(Easing.cubic) });
  const titleScale = interpolate(frameProgress, [0, 0.3], [0.8, 1], { easing: Easing.out(Easing.cubic) });
  const subtitleY = interpolate(frameProgress, [0.1, 0.4], [30, 0], { easing: Easing.out(Easing.cubic) });
  const ctaScale = interpolate(frameProgress, [0.2, 0.5], [0.7, 1], { easing: Easing.out(Easing.cubic) });
  const ctaY = interpolate(frameProgress, [0.2, 0.5], [40, 0], { easing: Easing.out(Easing.cubic) });
  const pulseOpacity = interpolate(
    (frameProgress - 0.4) * 2 % 1,
    [0, 0.5, 1],
    [1, 0.6, 1],
    { easing: Easing.linear }
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: mainOpacity,
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0,184,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          animation: `pulse 3s ease-in-out infinite`,
          opacity: pulseOpacity,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            margin: 0,
            color: 'white',
            letterSpacing: '-2px',
            transform: `scale(${titleScale})`,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.1,
          }}
        >
          5 Millones de Traders<br />
          <span style={{ background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ya Están Operando
          </span>
        </h1>

        <p
          style={{
            fontSize: 24,
            color: '#a0aec0',
            marginTop: 24,
            transform: `translateY(${subtitleY}px)`,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          ¿Por qué esperar? Accede hoy a las herramientas que te pueden cambiar el juego
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 48,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
          }}
        >
          <button
            style={{
              padding: '20px 60px',
              fontSize: 22,
              fontWeight: 700,
              color: '#0a0e27',
              background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 0 30px rgba(0, 184, 255, 0.3), 0 0 60px rgba(0, 255, 150, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
            }}
          >
            Accede Ahora
          </button>
        </div>

        {/* Trust badges */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            opacity: interpolate(frameProgress, [0.5, 0.8], [0, 1], { easing: Easing.out(Easing.cubic) }),
            transform: `translateY(${interpolate(frameProgress, [0.5, 0.8], [30, 0], { easing: Easing.out(Easing.cubic) })}px)`,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 12, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>100% Seguro</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
            <div style={{ fontSize: 12, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>Instant Access</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>24/7</div>
            <div style={{ fontSize: 12, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>Soporte Premium</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

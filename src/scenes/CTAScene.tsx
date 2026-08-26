import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface CTASceneProps {
  frameProgress: number;
}

export const CTAScene: React.FC<CTASceneProps> = ({ frameProgress }) => {
  // Main entrance - slower and steadier
  const mainOpacity = interpolate(frameProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });

  // Title: appears smoothly over 0.4s
  const titleScale = interpolate(frameProgress, [0, 0.4], [0.9, 1], { easing: Easing.out(Easing.quad) });
  const titleOpacity = interpolate(frameProgress, [0, 0.25], [0, 1], { easing: Easing.out(Easing.quad) });

  // Subtitle: appears AFTER title is visible (0.3+), with delay
  const subtitleY = interpolate(frameProgress, [0.25, 0.55], [30, 0], { easing: Easing.out(Easing.quad) });
  const subtitleOpacity = interpolate(frameProgress, [0.25, 0.4], [0, 1], { easing: Easing.out(Easing.quad) });

  // CTA: appears last (0.45+), gives focus to conversion message
  const ctaScale = interpolate(frameProgress, [0.45, 0.7], [0.8, 1], { easing: Easing.out(Easing.quad) });
  const ctaOpacity = interpolate(frameProgress, [0.45, 0.6], [0, 1], { easing: Easing.out(Easing.quad) });
  const ctaY = interpolate(frameProgress, [0.45, 0.7], [40, 0], { easing: Easing.out(Easing.quad) });

  // Pulse: only after CTA is stable (0.65+), and subtle
  const pulseOpacity = interpolate(
    frameProgress > 0.65 ? ((frameProgress - 0.65) * 3 % 1) : 0,
    [0, 0.5, 1],
    [1, 0.4, 1],
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
            opacity: titleOpacity,
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
            opacity: subtitleOpacity,
          }}
        >
          ¿Por qué esperar? Accede hoy a las herramientas que te pueden cambiar el juego
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 48,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
            opacity: ctaOpacity,
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

        {/* Trust badges - appear after CTA */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            opacity: interpolate(frameProgress, [0.65, 0.85], [0, 1], { easing: Easing.out(Easing.quad) }),
            transform: `translateY(${interpolate(frameProgress, [0.65, 0.85], [30, 0], { easing: Easing.out(Easing.quad) })}px)`,
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

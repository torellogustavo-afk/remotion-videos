import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface CTASceneVerticalProps {
  frameProgress: number;
}

export const CTASceneVertical: React.FC<CTASceneVerticalProps> = ({ frameProgress }) => {
  const mainOpacity = interpolate(frameProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });

  const titleScale = interpolate(frameProgress, [0, 0.4], [0.9, 1], { easing: Easing.out(Easing.quad) });
  const titleOpacity = interpolate(frameProgress, [0, 0.25], [0, 1], { easing: Easing.out(Easing.quad) });

  const subtitleY = interpolate(frameProgress, [0.25, 0.55], [30, 0], { easing: Easing.out(Easing.quad) });
  const subtitleOpacity = interpolate(frameProgress, [0.25, 0.4], [0, 1], { easing: Easing.out(Easing.quad) });

  const ctaScale = interpolate(frameProgress, [0.45, 0.7], [0.8, 1], { easing: Easing.out(Easing.quad) });
  const ctaOpacity = interpolate(frameProgress, [0.45, 0.6], [0, 1], { easing: Easing.out(Easing.quad) });
  const ctaY = interpolate(frameProgress, [0.45, 0.7], [40, 0], { easing: Easing.out(Easing.quad) });

  const pulseOpacity = interpolate(
    frameProgress > 0.65 ? ((frameProgress - 0.65) * 3 % 1) : 0,
    [0, 0.5, 1],
    [1, 0.4, 1],
    { easing: Easing.linear }
  );

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
        opacity: mainOpacity,
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
          bottom: '-20%',
          left: '-15%',
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.4,
        }}
      />

      {/* Animated background elements - pulse at center */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
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
          maxWidth: '90%',
        }}
      >
        <h1
          style={{
            fontSize: 44,
            fontWeight: 900,
            margin: 0,
            color: 'white',
            letterSpacing: '-1px',
            transform: `scale(${titleScale})`,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.1,
            opacity: titleOpacity,
            textShadow: `0 0 30px rgba(0, 184, 255, ${glowIntensity * 0.4}), 0 0 60px rgba(0, 255, 150, ${glowIntensity * 0.2})`,
          }}
        >
          5 Millones de<br />
          <span style={{
            background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3}))`
          }}>
            Traders Operando
          </span>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: '#a0aec0',
            marginTop: 20,
            transform: `translateY(${subtitleY}px)`,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            lineHeight: 1.5,
            opacity: subtitleOpacity,
            textShadow: `0 0 10px rgba(0, 184, 255, ${glowIntensity * 0.2})`,
          }}
        >
          ¿Por qué esperar?<br />
          Accede a herramientas que te cambian el juego
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 32,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
            opacity: ctaOpacity,
          }}
        >
          <button
            style={{
              padding: '16px 48px',
              fontSize: 18,
              fontWeight: 700,
              color: '#0a0e27',
              background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              boxShadow: `0 0 30px rgba(0, 184, 255, ${0.3 + glowIntensity * 0.3}), 0 0 60px rgba(0, 255, 150, ${0.2 + glowIntensity * 0.2})`,
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
            marginTop: 32,
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            opacity: interpolate(frameProgress, [0.65, 0.85], [0, 1], { easing: Easing.out(Easing.quad) }),
            transform: `translateY(${interpolate(frameProgress, [0.65, 0.85], [30, 0], { easing: Easing.out(Easing.quad) })}px)`,
            fontSize: 12,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>🔒</div>
            <div style={{ color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>Seguro</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>⚡</div>
            <div style={{ color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>Instant</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>24/7</div>
            <div style={{ color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>Soporte</div>
          </div>
        </div>
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

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

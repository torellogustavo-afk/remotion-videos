import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface HeroSceneProps {
  frameProgress: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ frameProgress }) => {
  // Fade: slower entrance (0.2s) + stable hold + slower exit (0.4s)
  const opacity = interpolate(frameProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0], {
    easing: Easing.inOut(Easing.ease),
  });

  // Scale: smooth, not aggressive
  const scale = interpolate(frameProgress, [0, 0.4], [0.95, 1], {
    easing: Easing.out(Easing.quad),
  });

  // Title: enter slowly, stay visible longer
  const titleY = interpolate(frameProgress, [0, 0.5], [50, 0], {
    easing: Easing.out(Easing.quad),
  });

  // Subtitle: staggered entry (starts later), smooth
  const subtitleY = interpolate(frameProgress, [0.15, 0.6], [50, 0], {
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      {/* Animated gradient background elements */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0,184,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '10%',
          right: '-10%',
          filter: 'blur(60px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(0,255,150,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-20%',
          left: '-15%',
          filter: 'blur(80px)',
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 1200,
          transform: `scale(${scale})`,
        }}
      >
        <h1
          style={{
            fontSize: 82,
            fontWeight: 900,
            margin: 0,
            color: 'white',
            letterSpacing: '-2px',
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.1,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          El Poder de los Datos<br />
          <span style={{ background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            en Tus Manos
          </span>
        </h1>

        <p
          style={{
            fontSize: 28,
            color: '#a0aec0',
            marginTop: 30,
            transform: `translateY(${subtitleY}px)`,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Herramientas profesionales de análisis financiero<br />
          diseñadas para traders e inversores ambiciosos
        </p>
      </div>
    </AbsoluteFill>
  );
};

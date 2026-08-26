import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface HeroSceneVerticalProps {
  frameProgress: number;
}

export const HeroSceneVertical: React.FC<HeroSceneVerticalProps> = ({ frameProgress }) => {
  const opacity = interpolate(frameProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0], {
    easing: Easing.inOut(Easing.ease),
  });

  const scale = interpolate(frameProgress, [0, 0.4], [0.95, 1], {
    easing: Easing.out(Easing.quad),
  });

  const titleY = interpolate(frameProgress, [0, 0.5], [50, 0], {
    easing: Easing.out(Easing.quad),
  });

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
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(0,184,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '15%',
          right: '-5%',
          filter: 'blur(60px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0,255,150,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
      />

      {/* Main content - VERTICAL LAYOUT */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '90%',
          transform: `scale(${scale})`,
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 900,
            margin: 0,
            color: 'white',
            letterSpacing: '-1px',
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.1,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          El Poder de los Datos<br />
          <span style={{
            background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            en Tus Manos
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: '#a0aec0',
            marginTop: 20,
            transform: `translateY(${subtitleY}px)`,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            lineHeight: 1.5,
          }}
        >
          Herramientas profesionales<br />
          para traders ambiciosos
        </p>
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface HeroSceneProps {
  frameProgress: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ frameProgress }) => {
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
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background elements - CINEMATIC */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0,184,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '10%',
          right: '-10%',
          filter: `blur(60px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.8,
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
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.6,
        }}
      />

      {/* Additional cinematic light rays */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0,184,255,0.08) 0%, transparent 60%)',
          borderRadius: '50%',
          top: '30%',
          left: '-5%',
          filter: `blur(70px)`,
          opacity: glowIntensity * 0.5,
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
            textShadow: `0 0 30px rgba(0, 184, 255, ${glowIntensity * 0.4}), 0 0 60px rgba(0, 255, 150, ${glowIntensity * 0.2})`,
          }}
        >
          El Poder de los Datos<br />
          <span style={{
            background: 'linear-gradient(90deg, #00b8ff 0%, #00ff96 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3}))`,
          }}>
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
            textShadow: `0 0 10px rgba(0, 184, 255, ${glowIntensity * 0.2})`,
          }}
        >
          Herramientas profesionales de análisis financiero<br />
          diseñadas para traders e inversores ambiciosos
        </p>
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

import React, { useState } from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, Img, interpolate, useCurrentFrame, spring, easeInOut } from 'remotion';

export const RaulButaciVideo: React.FC = () => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  const titleOpacity = spring({
    frame: frame,
    fps: config.fps,
    config: {
      damping: 10,
      mass: 1,
      overshootClamping: false,
      tension: 200,
    },
  });

  const scaleAnimation = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideInX = interpolate(frame, [30, 60], [-1920, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textAnimationFrame = Math.max(0, frame - 90);
  const textOpacity = interpolate(textAnimationFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsAnimationFrame = Math.max(0, frame - 150);
  const statsScale = spring({
    frame: statsAnimationFrame,
    fps: config.fps,
    config: {
      damping: 8,
      mass: 1,
      overshootClamping: false,
      tension: 180,
    },
  });

  const finalOpacity = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(220, 20, 60, 0.1))',
          zIndex: 0,
        }}
      />

      {/* Title with animation */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: titleOpacity,
          transform: `scale(${scaleAnimation})`,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            margin: 0,
            color: '#FFD700',
            textShadow: '0 0 50px rgba(255, 215, 0, 0.8), 0 0 100px rgba(220, 20, 60, 0.6)',
            letterSpacing: '4px',
            textAlign: 'center',
            fontFamily: '"Arial Black", sans-serif',
          }}
        >
          RAÚL BUTACÍ
        </h1>
        <p
          style={{
            fontSize: 60,
            color: '#DC143C',
            margin: '20px 0 0 0',
            textShadow: '0 0 30px rgba(220, 20, 60, 0.8)',
            letterSpacing: '3px',
            fontWeight: 700,
          }}
        >
          UTMB 100 MILLAS
        </p>
      </div>

      {/* Sliding image section */}
      <Sequence from={30} durationInFrames={150}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translateX(${slideInX}px)`,
            overflow: 'hidden',
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.4))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: 200,
                fontWeight: 900,
                color: 'rgba(255, 215, 0, 0.15)',
                letterSpacing: '20px',
                textAlign: 'center',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              ⚡ ULTRA RUNNER ⚡
            </div>
          </div>
        </div>
      </Sequence>

      {/* Description text */}
      <Sequence from={90} durationInFrames={150}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            bottom: '100px',
            textAlign: 'center',
            opacity: textOpacity,
            zIndex: 15,
          }}
        >
          <p
            style={{
              fontSize: 48,
              color: '#FFFFFF',
              margin: '20px auto',
              maxWidth: '90%',
              lineHeight: 1.4,
              textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
              fontWeight: 600,
            }}
          >
            Conquistando las montañas más desafiantes
          </p>
          <p
            style={{
              fontSize: 36,
              color: '#FFD700',
              margin: '10px auto',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              fontWeight: 500,
            }}
          >
            160 km | 10,000m de desnivel | Límite: 46 horas
          </p>
        </div>
      </Sequence>

      {/* Stats section */}
      <Sequence from={150} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 100px',
            opacity: statsScale,
            transform: `scale(${statsScale})`,
            zIndex: 25,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              background: 'rgba(255, 215, 0, 0.1)',
              padding: '40px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              minWidth: '250px',
            }}
          >
            <p style={{ fontSize: 80, color: '#FFD700', margin: 0, fontWeight: 900 }}>160</p>
            <p style={{ fontSize: 40, color: '#FFFFFF', margin: '10px 0 0 0', fontWeight: 600 }}>
              Kilómetros
            </p>
          </div>

          <div
            style={{
              textAlign: 'center',
              background: 'rgba(220, 20, 60, 0.1)',
              padding: '40px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(220, 20, 60, 0.5)',
              minWidth: '250px',
            }}
          >
            <p style={{ fontSize: 80, color: '#DC143C', margin: 0, fontWeight: 900 }}>10K</p>
            <p style={{ fontSize: 40, color: '#FFFFFF', margin: '10px 0 0 0', fontWeight: 600 }}>
              Metros D+
            </p>
          </div>

          <div
            style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              minWidth: '250px',
            }}
          >
            <p style={{ fontSize: 80, color: '#FFFFFF', margin: 0, fontWeight: 900 }}>46H</p>
            <p style={{ fontSize: 40, color: '#FFD700', margin: '10px 0 0 0', fontWeight: 600 }}>
              Límite
            </p>
          </div>
        </div>
      </Sequence>

      {/* Final call to action */}
      <Sequence from={270} durationInFrames={30}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: finalOpacity,
            zIndex: 30,
          }}
        >
          <h2
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: '#FFD700',
              margin: 0,
              textShadow: '0 0 50px rgba(255, 215, 0, 0.8)',
              textAlign: 'center',
            }}
          >
            ¡VAMOS RAÚL!
          </h2>
          <p
            style={{
              fontSize: 50,
              color: '#FFFFFF',
              margin: '20px 0 0 0',
              textShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
              fontWeight: 600,
            }}
          >
            #UTMB2024 #UltraRunner #MontBlanc
          </p>
        </div>
      </Sequence>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </AbsoluteFill>
  );
};

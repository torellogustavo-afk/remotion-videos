import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, interpolate, useCurrentFrame, spring } from 'remotion';

export const RaulButaciShorts: React.FC = () => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  // Quick dramatic entrance
  const titleScale = spring({
    frame: frame,
    fps: config.fps,
    config: {
      damping: 15,
      mass: 0.8,
      tension: 250,
    },
  });

  // Speed effect
  const speedLineOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const speedLineHeight = interpolate(frame, [5, 15], [10, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main stats section
  const statsOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsY = interpolate(frame, [30, 60], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Viral hook text
  const hookOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Closing action
  const closingOpacity = interpolate(frame, [270, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Animated background gradients */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, transparent 40%),
            linear-gradient(225deg, rgba(220, 20, 60, 0.15) 0%, transparent 60%),
            #000
          `,
          zIndex: 0,
        }}
      />

      {/* Speed effect lines */}
      <Sequence from={5} durationInFrames={40}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            opacity: speedLineOpacity,
            zIndex: 5,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                height: `${speedLineHeight * (0.8 + i * 0.05)}px`,
                background: `linear-gradient(90deg, transparent, rgba(255, 215, 0, ${0.6 - i * 0.07}), transparent)`,
                width: '100%',
              }}
            />
          ))}
        </div>
      </Sequence>

      {/* Opening hook - Bold statement */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              transform: `scale(${titleScale})`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 140,
                fontWeight: 900,
                margin: 0,
                color: '#FFD700',
                textShadow: '0 0 60px rgba(255, 215, 0, 0.9)',
                letterSpacing: '3px',
              }}
            >
              160 KM
            </p>
            <p
              style={{
                fontSize: 90,
                fontWeight: 800,
                margin: '10px 0 0 0',
                color: '#DC143C',
                textShadow: '0 0 40px rgba(220, 20, 60, 0.8)',
              }}
            >
              SIN PARAR
            </p>
          </div>
        </div>
      </Sequence>

      {/* Key stats with staggered animation */}
      <Sequence from={30} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            bottom: '150px',
            opacity: statsOpacity,
            transform: `translateY(${statsY}px)`,
            zIndex: 15,
            display: 'flex',
            justifyContent: 'space-around',
            paddingLeft: '100px',
            paddingRight: '100px',
          }}
        >
          {/* Stat card 1 */}
          <div
            style={{
              background: 'rgba(255, 215, 0, 0.1)',
              padding: '30px 40px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              textAlign: 'center',
              backdropFilter: 'blur(15px)',
              flex: 1,
              margin: '0 15px',
            }}
          >
            <p style={{ fontSize: 70, color: '#FFD700', margin: 0, fontWeight: 900 }}>⛰️</p>
            <p style={{ fontSize: 50, color: '#FFD700', margin: '10px 0 5px 0', fontWeight: 800 }}>
              10K+
            </p>
            <p style={{ fontSize: 24, color: '#FFFFFF', margin: 0 }}>Elevación</p>
          </div>

          {/* Stat card 2 */}
          <div
            style={{
              background: 'rgba(220, 20, 60, 0.1)',
              padding: '30px 40px',
              borderRadius: '15px',
              border: '2px solid rgba(220, 20, 60, 0.5)',
              textAlign: 'center',
              backdropFilter: 'blur(15px)',
              flex: 1,
              margin: '0 15px',
            }}
          >
            <p style={{ fontSize: 70, color: '#DC143C', margin: 0, fontWeight: 900 }}>⏱️</p>
            <p style={{ fontSize: 50, color: '#DC143C', margin: '10px 0 5px 0', fontWeight: 800 }}>
              46H
            </p>
            <p style={{ fontSize: 24, color: '#FFFFFF', margin: 0 }}>Límite</p>
          </div>

          {/* Stat card 3 */}
          <div
            style={{
              background: 'rgba(255, 215, 0, 0.05)',
              padding: '30px 40px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(15px)',
              flex: 1,
              margin: '0 15px',
            }}
          >
            <p style={{ fontSize: 70, color: '#FFFFFF', margin: 0, fontWeight: 900 }}>🏔️</p>
            <p style={{ fontSize: 50, color: '#FFFFFF', margin: '10px 0 5px 0', fontWeight: 800 }}>
              UTMB
            </p>
            <p style={{ fontSize: 24, color: '#FFD700', margin: 0 }}>2024</p>
          </div>
        </div>
      </Sequence>

      {/* The Hook - Why you should care */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: hookOpacity,
            zIndex: 20,
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '60px',
              borderRadius: '20px',
              border: '3px solid rgba(255, 215, 0, 0.4)',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: '#FFD700',
                margin: '0 0 20px 0',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
              }}
            >
              RAÚL BUTACÍ
            </p>
            <p
              style={{
                fontSize: 45,
                fontWeight: 700,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: '1.4',
              }}
            >
              Corriendo donde solo los campeones se atreven
            </p>
          </div>
        </div>
      </Sequence>

      {/* Final CTA */}
      <Sequence from={270} durationInFrames={90}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: closingOpacity,
            zIndex: 25,
          }}
        >
          <h2
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: '#FFD700',
              margin: 0,
              textShadow: '0 0 50px rgba(255, 215, 0, 0.9)',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            ¡VAMOS!
          </h2>
          <p
            style={{
              fontSize: 55,
              color: '#DC143C',
              margin: '30px 0 0 0',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(220, 20, 60, 0.7)',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            #UTMB #ULTRARUNNER #LIMIT
          </p>
        </div>
      </Sequence>

      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: 'linear-gradient(90deg, #FFD700, #DC143C, #FFD700)',
          zIndex: 100,
        }}
      />

      {/* Animated corners accent */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(255, 215, 0, 0.5)',
          borderLeft: 'none',
          borderBottom: 'none',
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(220, 20, 60, 0.5)',
          borderRight: 'none',
          borderTop: 'none',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};

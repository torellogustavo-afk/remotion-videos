import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
  spring,
} from 'remotion';

export const RaulButaciAdvanced: React.FC = () => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  // Opening scene with dramatic entrance
  const openingScale = spring({
    frame: frame,
    fps: config.fps,
    config: {
      damping: 12,
      mass: 1.2,
      tension: 180,
    },
  });

  const openingRotate = interpolate(frame, [0, 60], [-5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mountain silhouette animation
  const mountainOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Runner profile section
  const profileSlideX = interpolate(frame, [120, 150], [1920, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Challenge text animation
  const challengeY = interpolate(frame, [180, 210], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const challengeOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Statistics counter animation
  const statsFrame = Math.max(0, frame - 240);
  const statsOpacity = spring({
    frame: statsFrame,
    fps: config.fps,
    config: {
      damping: 10,
      mass: 1,
      tension: 140,
    },
  });

  // Final motivational frame
  const finalOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Dynamic background with multiple layers */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 60%),
            linear-gradient(180deg, #1a1a1a 0%, #000 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* Opening Animation - Dramatic Title */}
      <Sequence from={0} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              transform: `scale(${openingScale}) rotateZ(${openingRotate}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <h1
              style={{
                fontSize: 150,
                fontWeight: 900,
                margin: 0,
                color: '#FFD700',
                textShadow: `
                  0 0 20px rgba(255, 215, 0, 0.8),
                  0 0 40px rgba(255, 215, 0, 0.5),
                  0 0 80px rgba(220, 20, 60, 0.4)
                `,
                letterSpacing: '6px',
                fontFamily: '"Arial Black", sans-serif',
                transform: 'perspective(1200px) rotateX(0deg)',
              }}
            >
              UTMB 2024
            </h1>
            <p
              style={{
                fontSize: 70,
                color: '#FFFFFF',
                margin: '10px 0 0 0',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                letterSpacing: '4px',
                textAlign: 'center',
              }}
            >
              100 MILLAS
            </p>
          </div>
        </div>
      </Sequence>

      {/* Mountain visualization */}
      <Sequence from={60} durationInFrames={90}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: mountainOpacity,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 15,
          }}
        >
          <svg
            width="100%"
            height="400"
            viewBox="0 0 1920 400"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.3))',
            }}
          >
            {/* Multiple mountain peaks */}
            <polygon points="0,400 200,150 400,400" fill="url(#mountainGradient1)" opacity="0.8" />
            <polygon
              points="300,400 600,50 900,400"
              fill="url(#mountainGradient2)"
              opacity="0.9"
            />
            <polygon points="800,400 1200,100 1600,400" fill="url(#mountainGradient3)" opacity="0.8" />
            <polygon points="1400,400 1800,200 2000,400" fill="url(#mountainGradient1)" opacity="0.7" />

            <defs>
              <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#DC143C" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DC143C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B0000" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </Sequence>

      {/* Runner Profile Section */}
      <Sequence from={120} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '100px',
            transform: `translateX(${profileSlideX}px)`,
            zIndex: 20,
          }}
        >
          <div
            style={{
              textAlign: 'right',
              maxWidth: '600px',
            }}
          >
            <p
              style={{
                fontSize: 60,
                color: '#FFD700',
                margin: '0 0 20px 0',
                fontWeight: 800,
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                letterSpacing: '2px',
              }}
            >
              RAÚL BUTACÍ
            </p>
            <p
              style={{
                fontSize: 40,
                color: '#FFFFFF',
                margin: '0',
                fontWeight: 600,
                lineHeight: '1.6',
              }}
            >
              Ultra Marathoner |
              <br />
              Montañas | Límites
            </p>
            <div
              style={{
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '2px solid rgba(255, 215, 0, 0.4)',
              }}
            >
              <p
                style={{
                  fontSize: 32,
                  color: '#DC143C',
                  margin: '15px 0',
                  fontWeight: 700,
                }}
              >
                🏔️ 160 KM
              </p>
              <p
                style={{
                  fontSize: 32,
                  color: '#DC143C',
                  margin: '15px 0',
                  fontWeight: 700,
                }}
              >
                ⬆️ 10,000 M D+
              </p>
              <p
                style={{
                  fontSize: 32,
                  color: '#DC143C',
                  margin: '15px 0',
                  fontWeight: 700,
                }}
              >
                ⏱️ 46 HORAS
              </p>
            </div>
          </div>
        </div>
      </Sequence>

      {/* Challenge Section */}
      <Sequence from={180} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            bottom: '200px',
            opacity: challengeOpacity,
            transform: `translateY(${challengeY}px)`,
            zIndex: 25,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              margin: '0 auto',
              maxWidth: '1200px',
              border: '2px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            <p
              style={{
                fontSize: 56,
                color: '#FFD700',
                margin: '0 0 20px 0',
                fontWeight: 800,
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              EL DESAFÍO MÁS EXTREMO
            </p>
            <p
              style={{
                fontSize: 40,
                color: '#FFFFFF',
                margin: '0',
                lineHeight: '1.6',
                fontWeight: 600,
              }}
            >
              Corriendo donde pocos se atreven. Empujando los límites de la resistencia humana.
              <br />
              Este es más que una carrera. Es una travesía épica.
            </p>
          </div>
        </div>
      </Sequence>

      {/* Final Motivational Section */}
      <Sequence from={300} durationInFrames={60}>
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
              fontSize: 140,
              fontWeight: 900,
              color: '#FFD700',
              margin: 0,
              textShadow: '0 0 50px rgba(255, 215, 0, 0.8)',
              textAlign: 'center',
              letterSpacing: '4px',
            }}
          >
            VAMOS RAÚL
          </h2>
          <div
            style={{
              marginTop: '40px',
              fontSize: 50,
              color: '#DC143C',
              fontWeight: 700,
              textShadow: '0 0 30px rgba(220, 20, 60, 0.6)',
              textAlign: 'center',
              letterSpacing: '3px',
            }}
          >
            #UTMB2024 #ULTRARUNNER #MONTBLANC
          </div>
        </div>
      </Sequence>

      {/* Animated border accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '10px',
          background: 'linear-gradient(90deg, #FFD700, #DC143C, #FFD700)',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s ease infinite',
          zIndex: 100,
        }}
      />

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </AbsoluteFill>
  );
};

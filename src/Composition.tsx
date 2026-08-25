import React from 'react';
import { AbsoluteFill, useVideoConfig, interpolate, useCurrentFrame, Sequence } from 'remotion';

const PremiumBoutiqueVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // ============ ESCENA 1: 0-75 frames (0-2.5s) ============
  // Hook visual - Título principal
  const scene1Start = 0;
  const scene1End = 75;

  // Background depth movement
  const bgZoom = interpolate(
    frame,
    [scene1Start, scene1End],
    [1, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Title reveal with staggered lines
  const line1Opacity = interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1X = interpolate(frame, [5, 20], [-150, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const line2Opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2X = interpolate(frame, [15, 30], [150, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const line1ScaleOut = interpolate(frame, [60, 75], [1, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1OpacityOut = interpolate(frame, [60, 75], [1, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ============ ESCENA 2: 75-150 frames (2.5-5s) ============
  // Keywords con ritmo y microelementos
  const scene2Start = 75;
  const scene2End = 150;

  const word1Opacity = interpolate(frame, [scene2Start + 5, scene2Start + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word1Scale = interpolate(frame, [scene2Start + 5, scene2Start + 20], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word1Y = interpolate(frame, [scene2Start + 5, scene2Start + 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word2Opacity = interpolate(frame, [scene2Start + 25, scene2Start + 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word2Scale = interpolate(frame, [scene2Start + 25, scene2Start + 40], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word2Y = interpolate(frame, [scene2Start + 25, scene2Start + 40], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word3Opacity = interpolate(frame, [scene2Start + 45, scene2Start + 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word3Scale = interpolate(frame, [scene2Start + 45, scene2Start + 60], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word3Y = interpolate(frame, [scene2Start + 45, scene2Start + 60], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Accent line animation
  const accentLineWidth = interpolate(frame, [scene2Start + 15, scene2Start + 35], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ============ ESCENA 3: 150-240 frames (5-8s) ============
  // Servicios presentados de forma editorial
  const scene3Start = 150;
  const scene3End = 240;

  const service1Opacity = interpolate(frame, [scene3Start + 10, scene3Start + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const service1Y = interpolate(frame, [scene3Start + 10, scene3Start + 25], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const service2Opacity = interpolate(frame, [scene3Start + 30, scene3Start + 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const service2Y = interpolate(frame, [scene3Start + 30, scene3Start + 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const service3Opacity = interpolate(frame, [scene3Start + 50, scene3Start + 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const service3Y = interpolate(frame, [scene3Start + 50, scene3Start + 65], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dividerOpacity = interpolate(frame, [scene3Start + 20, scene3Start + 40], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ============ ESCENA 4: 240-300 frames (8-10s) ============
  // Cierre potente
  const scene4Start = 240;
  const scene4End = 300;

  const ctaMainOpacity = interpolate(frame, [scene4Start + 5, scene4Start + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaMainScale = interpolate(frame, [scene4Start + 5, scene4Start + 20], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSubOpacity = interpolate(frame, [scene4Start + 20, scene4Start + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const goldAccentScale = interpolate(frame, [scene4Start + 10, scene4Start + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: '#0a0f1a',
        overflow: 'hidden',
      }}
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      {/* Deep background with subtle gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #0a0f1a 0%, #0f1720 50%, #0a0f1a 100%)',
          opacity: 0.8,
        }}
      />

      {/* Sophisticated glow - top right */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-300px',
          right: '-300px',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle blue glow - bottom left */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-250px',
          left: '-250px',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ===== ESCENA 1: TÍTULO PRINCIPAL (0-2.5s) ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: frame < scene2Start ? 1 : interpolate(frame, [scene1End - 15, scene2Start], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        {/* Line 1: BOUTIQUE DE */}
        <div
          style={{
            opacity: line1Opacity * line1OpacityOut,
            transform: `translateX(${line1X}px) scale(${line1ScaleOut})`,
            fontSize: '120px',
            fontWeight: '300',
            letterSpacing: '8px',
            color: '#e2e8f0',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            lineHeight: '1',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          BOUTIQUE DE
        </div>

        {/* Line 2: GESTIÓN PATRIMONIAL */}
        <div
          style={{
            opacity: line2Opacity * line1OpacityOut,
            transform: `translateX(${line2X}px) scale(${line1ScaleOut})`,
            fontSize: '120px',
            fontWeight: '700',
            letterSpacing: '6px',
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            lineHeight: '1',
            margin: '20px 0 0 0',
            whiteSpace: 'nowrap',
          }}
        >
          GESTIÓN PATRIMONIAL
        </div>
      </div>

      {/* ===== ESCENA 2: PALABRAS CLAVE (2.5-5s) ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: frame >= scene2Start - 10 ? interpolate(frame, [scene2Start - 10, scene2Start + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0,
        }}
      >
        {/* Palabra 1: PATRIMONIO */}
        <div
          style={{
            opacity: word1Opacity,
            transform: `translateY(${word1Y}px) scale(${word1Scale})`,
            fontSize: '96px',
            fontWeight: '600',
            letterSpacing: '4px',
            color: '#fbbf24',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            margin: '20px 0',
            textShadow: '0 4px 20px rgba(251, 191, 36, 0.2)',
          }}
        >
          PATRIMONIO
        </div>

        {/* Accent line */}
        <div
          style={{
            width: `${accentLineWidth}px`,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
            margin: '30px 0',
            opacity: 0.6,
          }}
        />

        {/* Palabra 2: INVERSIÓN */}
        <div
          style={{
            opacity: word2Opacity,
            transform: `translateY(${word2Y}px) scale(${word2Scale})`,
            fontSize: '96px',
            fontWeight: '600',
            letterSpacing: '4px',
            color: '#cbd5e1',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            margin: '20px 0',
          }}
        >
          INVERSIÓN
        </div>

        {/* Palabra 3: ESTRATEGIA */}
        <div
          style={{
            opacity: word3Opacity,
            transform: `translateY(${word3Y}px) scale(${word3Scale})`,
            fontSize: '96px',
            fontWeight: '600',
            letterSpacing: '4px',
            color: '#cbd5e1',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
            margin: '20px 0',
          }}
        >
          ESTRATEGIA
        </div>
      </div>

      {/* ===== ESCENA 3: SERVICIOS EDITORIAL (5-8s) ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 80px',
          opacity: frame >= scene3Start - 10 ? interpolate(frame, [scene3Start - 10, scene3Start + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0,
        }}
      >
        {/* Service 1 */}
        <div
          style={{
            opacity: service1Opacity,
            transform: `translateY(${service1Y}px)`,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h3
            style={{
              fontSize: '52px',
              fontWeight: '600',
              color: '#fbbf24',
              margin: '0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Gestión Patrimonial
          </h3>
          <p
            style={{
              fontSize: '18px',
              color: '#a0aec0',
              margin: '12px 0 0 0',
              fontWeight: '300',
              maxWidth: '600px',
            }}
          >
            Administración integral y maximización de tu patrimonio
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '200px',
            height: '1px',
            background: '#fbbf24',
            margin: '30px 0',
            opacity: dividerOpacity,
          }}
        />

        {/* Service 2 */}
        <div
          style={{
            opacity: service2Opacity,
            transform: `translateY(${service2Y}px)`,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h3
            style={{
              fontSize: '52px',
              fontWeight: '600',
              color: '#e2e8f0',
              margin: '0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Inversiones Estratégicas
          </h3>
          <p
            style={{
              fontSize: '18px',
              color: '#a0aec0',
              margin: '12px 0 0 0',
              fontWeight: '300',
              maxWidth: '600px',
            }}
          >
            Oportunidades seleccionadas con análisis técnico profundo
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '200px',
            height: '1px',
            background: '#fbbf24',
            margin: '30px 0',
            opacity: dividerOpacity,
          }}
        />

        {/* Service 3 */}
        <div
          style={{
            opacity: service3Opacity,
            transform: `translateY(${service3Y}px)`,
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '52px',
              fontWeight: '600',
              color: '#e2e8f0',
              margin: '0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Consultoría Técnica
          </h3>
          <p
            style={{
              fontSize: '18px',
              color: '#a0aec0',
              margin: '12px 0 0 0',
              fontWeight: '300',
              maxWidth: '600px',
            }}
          >
            Asesoramiento experto personalizado para decisiones seguras
          </p>
        </div>
      </div>

      {/* ===== ESCENA 4: CIERRE POTENTE (8-10s) ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: frame >= scene4Start - 10 ? interpolate(frame, [scene4Start - 10, scene4Start + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0,
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
            marginBottom: '30px',
            opacity: goldAccentScale,
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        />

        {/* Main CTA */}
        <div
          style={{
            opacity: ctaMainOpacity,
            transform: `scale(${ctaMainScale})`,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '88px',
              fontWeight: '700',
              color: '#fbbf24',
              margin: '0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 8px 30px rgba(251, 191, 36, 0.25)',
            }}
          >
            LOS ÚNICOS
          </h2>
          <h3
            style={{
              fontSize: '72px',
              fontWeight: '600',
              color: '#fbbf24',
              margin: '10px 0 0 0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            EN LA PAMPA
          </h3>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: ctaSubOpacity,
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '22px',
              color: '#cbd5e1',
              margin: '0',
              fontWeight: '300',
              letterSpacing: '1px',
              maxWidth: '800px',
            }}
          >
            Gestión Patrimonial, Inversiones y Consultoría Técnica
          </p>
        </div>
      </div>

      {/* ===== BOTTOM ACCENT ===== */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #fbbf24 25%, #fbbf24 75%, transparent)',
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};

export const MyComposition = PremiumBoutiqueVideo;

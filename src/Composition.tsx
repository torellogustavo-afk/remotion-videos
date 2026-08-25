import React from 'react';
import { AbsoluteFill, useVideoConfig, Img, interpolate, useCurrentFrame, spring } from 'remotion';

const PremiumBoutiqueVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animations with spring for smooth, premium feel
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subtitleOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleScale = interpolate(frame, [30, 60], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const featureOpacity1 = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const featureX1 = interpolate(frame, [60, 90], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const featureOpacity2 = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const featureX2 = interpolate(frame, [85, 115], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const featureOpacity3 = interpolate(frame, [110, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const featureY3 = interpolate(frame, [110, 140], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = interpolate(frame, [160, 180], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      {/* Background glow elements */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px',
          right: '-200px',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-150px',
          left: '-150px',
          filter: 'blur(50px)',
        }}
      />

      {/* Main Title */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: '72px',
            fontWeight: '700',
            margin: 0,
            color: '#fbbf24',
            textShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
            letterSpacing: '2px',
            fontFamily: 'Georgia, serif',
          }}
        >
          BOUTIQUE DE
        </h1>
        <h2
          style={{
            fontSize: '64px',
            fontWeight: '600',
            margin: '10px 0 0 0',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: 'Georgia, serif',
          }}
        >
          GESTIÓN PATRIMONIAL
        </h2>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subtitleOpacity,
          transform: `scale(${subtitleScale})`,
        }}
      >
        <p
          style={{
            fontSize: '28px',
            color: '#e2e8f0',
            margin: '0 0 15px 0',
            fontWeight: '300',
            letterSpacing: '1px',
          }}
        >
          Inversiones • Consultoría Técnica
        </p>
        <div
          style={{
            width: '120px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
            margin: '15px auto',
          }}
        />
      </div>

      {/* Feature 1 */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          top: '55%',
          opacity: featureOpacity1,
          transform: `translateX(${featureX1}px)`,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>💼</div>
        <h3 style={{ color: '#fbbf24', fontSize: '20px', margin: '0 0 10px 0' }}>
          Gestión de Patrimonio
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
          Asesoramiento integral en la administración y maximización de tu patrimonio
        </p>
      </div>

      {/* Feature 2 */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '55%',
          opacity: featureOpacity2,
          transform: `translateX(${featureX2}px)`,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
        <h3 style={{ color: '#fbbf24', fontSize: '20px', margin: '0 0 10px 0' }}>
          Inversiones Estratégicas
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
          Oportunidades de inversión seleccionadas con análisis técnico profundo
        </p>
      </div>

      {/* Feature 3 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: `translateX(-50%) translateY(${featureY3}px)`,
          top: '72%',
          opacity: featureOpacity3,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</div>
        <h3 style={{ color: '#fbbf24', fontSize: '20px', margin: '0 0 10px 0' }}>
          Consultoría Técnica
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
          Análisis experto y asesoría personalizada para decisiones financieras seguras
        </p>
      </div>

      {/* CTA Section */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '20px 50px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '50px',
            marginBottom: '20px',
            boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              color: '#0f172a',
              letterSpacing: '1px',
            }}
          >
            LOS ÚNICOS EN LA PAMPA
          </p>
        </div>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: '15px 0 0 0' }}>
          Servicios Premium de Gestión Patrimonial e Inversiones
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
        }}
      />
    </AbsoluteFill>
  );
};

export const MyComposition = PremiumBoutiqueVideo;

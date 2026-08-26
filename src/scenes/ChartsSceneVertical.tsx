import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface ChartsSceneVerticalProps {
  frameProgress: number;
}

const AnimatedChartVertical: React.FC<{ frameProgress: number; glowIntensity: number }> = ({ frameProgress, glowIntensity }) => {
  const generateChartPath = (progress: number) => {
    const points = [];
    const steps = 60;
    for (let i = 0; i <= steps * progress; i++) {
      const x = (i / steps) * 400;
      const noise = Math.sin(i * 0.3) * 20 + Math.cos(i * 0.15) * 15;
      const trend = (i / steps) * 80;
      const y = 150 - trend + noise;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  const lineOpacity = interpolate(frameProgress, [0, 0.25, 0.5, 0.75], [0, 1, 1, 0.3], { easing: Easing.out(Easing.quad) });
  const fillOpacity = interpolate(frameProgress, [0.1, 0.35, 0.5, 0.75], [0, 0.15, 0.15, 0.05], { easing: Easing.out(Easing.quad) });

  const candleOpacity = interpolate(frameProgress, [0.5, 0.65, 0.85, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });
  const candleScale = interpolate(frameProgress, [0.5, 0.75], [0, 1], { easing: Easing.out(Easing.quad) });

  return (
    <div style={{ position: 'relative', width: '100%', height: 240 }}>
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        viewBox="0 0 500 200"
      >
        <defs>
          <linearGradient id="chartGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00b8ff" stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor="#00b8ff" stopOpacity="0" />
          </linearGradient>
          <filter id="chartGlowVertical">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        <g stroke="#1e293b" strokeWidth="0.5" opacity="0.5">
          {[0, 1, 2, 3].map((i) => (
            <line key={`h-${i}`} x1="0" y1={60 * i} x2="500" y2={60 * i} />
          ))}
          {[0, 2, 4].map((i) => (
            <line key={`v-${i}`} x1={150 * i} y1="0" x2={150 * i} y2="200" />
          ))}
        </g>

        {/* Animated line */}
        <path
          d={generateChartPath(frameProgress)}
          stroke="#00b8ff"
          strokeWidth="2"
          fill="none"
          opacity={lineOpacity}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#chartGlowVertical)"
        />

        {/* Candlestick representation */}
        <g opacity={candleOpacity}>
          {[0, 1, 2, 3].map((i) => {
            const x = 80 + i * 100;
            const high = 100 + Math.sin(i * 0.5) * 30;
            const low = 100 + Math.sin(i * 0.5 + 1) * 30;
            const open = 100 + Math.sin(i * 0.3) * 25;
            const close = 100 + Math.sin(i * 0.4 + 0.5) * 25;

            const color = close > open ? '#00ff96' : '#ff4757';

            return (
              <g key={`candle-${i}`} opacity={candleScale} transform={`scale(${candleScale}) translate(${(1 - candleScale) * x / 2}, 0)`}>
                <line x1={x} y1={high} x2={x} y2={low} stroke={color} strokeWidth="1" opacity="0.7" />
                <rect
                  x={x - 12}
                  y={Math.min(open, close)}
                  width="24"
                  height={Math.abs(close - open) || 2}
                  fill={color}
                  opacity="0.8"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export const ChartsSceneVertical: React.FC<ChartsSceneVerticalProps> = ({ frameProgress }) => {
  const contentOpacity = interpolate(frameProgress, [0, 0.15], [0, 1], { easing: Easing.out(Easing.quad) });
  const fadeOut = interpolate(frameProgress, [0.9, 1], [1, 0], { easing: Easing.in(Easing.quad) });
  const percentageOpacity = interpolate(frameProgress, [0.65, 0.8], [0, 1], { easing: Easing.out(Easing.quad) });

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
        opacity: fadeOut,
        flexDirection: 'column',
        padding: '40px',
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
          bottom: '-10%',
          left: '-15%',
          filter: `blur(80px)`,
          transform: `scale(${bgZoom})`,
          opacity: glowIntensity * 0.4,
        }}
      />

      <div
        style={{
          opacity: contentOpacity,
          zIndex: 10,
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: 'white', fontFamily: "'Inter', sans-serif", marginBottom: 8, textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
          Gráficos Avanzados
        </div>
        <div style={{ fontSize: 14, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>
          Análisis técnico en tiempo real
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 240 }}>
        <AnimatedChartVertical frameProgress={frameProgress} glowIntensity={glowIntensity} />
      </div>

      <div
        style={{
          opacity: percentageOpacity,
          zIndex: 10,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: '#00ff96', fontFamily: "'Inter', sans-serif", textShadow: `0 0 20px rgba(0, 255, 150, ${glowIntensity * 0.3})` }}>
          +2.85%
        </div>
        <div style={{ fontSize: 12, color: '#a0aec0', marginTop: 4, fontFamily: "'Inter', sans-serif" }}>
          Señales Precisas
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
    </AbsoluteFill>
  );
};

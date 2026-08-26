import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface ChartsSceneProps {
  frameProgress: number;
}

const AnimatedChart: React.FC<{ frameProgress: number; glowIntensity: number }> = ({ frameProgress, glowIntensity }) => {
  const generateChartPath = (progress: number) => {
    const points = [];
    const steps = 100;
    for (let i = 0; i <= steps * progress; i++) {
      const x = (i / steps) * 800;
      const noise = Math.sin(i * 0.3) * 30 + Math.cos(i * 0.15) * 20;
      const trend = (i / steps) * 150;
      const y = 200 - trend + noise;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // LINE CHART: enters slowly, stays visible, then fades when candlesticks come
  const lineOpacity = interpolate(frameProgress, [0, 0.25, 0.5, 0.75], [0, 1, 1, 0.3], { easing: Easing.out(Easing.quad) });
  const fillOpacity = interpolate(frameProgress, [0.1, 0.35, 0.5, 0.75], [0, 0.15, 0.15, 0.05], { easing: Easing.out(Easing.quad) });

  // CANDLESTICK: appears AFTER line is understood (not overlapping)
  // Starts entering at 0.5, fully visible 0.65-1.0
  const candleOpacity = interpolate(frameProgress, [0.5, 0.65, 0.85, 1], [0, 1, 1, 0], { easing: Easing.out(Easing.quad) });
  const candleScale = interpolate(frameProgress, [0.5, 0.75], [0, 1], { easing: Easing.out(Easing.quad) });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Line Chart */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        viewBox="0 0 1000 400"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00b8ff" stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor="#00b8ff" stopOpacity="0" />
          </linearGradient>
          <filter id="chartGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        <g stroke="#1e293b" strokeWidth="0.5" opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h-${i}`} x1="0" y1={80 * i} x2="1000" y2={80 * i} />
          ))}
          {[0, 2, 4, 6, 8, 10].map((i) => (
            <line key={`v-${i}`} x1={100 * i} y1="0" x2={100 * i} y2="400" />
          ))}
        </g>

        {/* Animated line */}
        <path
          d={generateChartPath(frameProgress)}
          stroke="#00b8ff"
          strokeWidth="3"
          fill="none"
          opacity={lineOpacity}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#chartGlow)"
        />

        {/* Candlestick representation */}
        <g opacity={candleOpacity}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 150 + i * 120;
            const high = 150 + Math.sin(i * 0.5) * 50;
            const low = 150 + Math.sin(i * 0.5 + 1) * 50;
            const open = 150 + Math.sin(i * 0.3) * 40;
            const close = 150 + Math.sin(i * 0.4 + 0.5) * 45;

            const color = close > open ? '#00ff96' : '#ff4757';

            return (
              <g key={`candle-${i}`} opacity={candleScale} transform={`scale(${candleScale}) translate(${(1 - candleScale) * x / 2}, 0)`}>
                {/* Wick */}
                <line x1={x} y1={high} x2={x} y2={low} stroke={color} strokeWidth="1" opacity="0.7" />
                {/* Body */}
                <rect
                  x={x - 15}
                  y={Math.min(open, close)}
                  width="30"
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

export const ChartsScene: React.FC<ChartsSceneProps> = ({ frameProgress }) => {
  // Title enters early and stays visible
  const contentOpacity = interpolate(frameProgress, [0, 0.15], [0, 1], { easing: Easing.out(Easing.quad) });
  // Fade out at the very end
  const fadeOut = interpolate(frameProgress, [0.9, 1], [1, 0], { easing: Easing.in(Easing.quad) });

  // Percentage badge enters after candlesticks (0.65+)
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
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background elements */}
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
          opacity: glowIntensity * 0.6,
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
          opacity: glowIntensity * 0.4,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          opacity: contentOpacity,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: 'white', fontFamily: "'Inter', sans-serif", marginBottom: 12, textShadow: `0 0 20px rgba(0, 184, 255, ${glowIntensity * 0.3})` }}>
          Gráficos Avanzados
        </div>
        <div style={{ fontSize: 18, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>
          Análisis técnico en tiempo real con TradingView
        </div>
      </div>

      <div style={{ position: 'relative', width: '90%', height: '70%', maxWidth: 1000 }}>
        <AnimatedChart frameProgress={frameProgress} glowIntensity={glowIntensity} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          opacity: percentageOpacity,
          zIndex: 10,
          textAlign: 'right',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, color: '#00ff96', fontFamily: "'Inter', sans-serif", textShadow: `0 0 20px rgba(0, 255, 150, ${glowIntensity * 0.3})` }}>
          +2.85%
        </div>
        <div style={{ fontSize: 14, color: '#a0aec0', marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
          Señales de Compra/Venta
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

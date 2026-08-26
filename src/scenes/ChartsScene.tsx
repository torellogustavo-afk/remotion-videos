import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';

interface ChartsSceneProps {
  frameProgress: number;
}

const AnimatedChart: React.FC<{ frameProgress: number }> = ({ frameProgress }) => {
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

  const lineOpacity = interpolate(frameProgress, [0, 0.2], [0, 1], { easing: Easing.out(Easing.cubic) });
  const fillOpacity = interpolate(frameProgress, [0.1, 0.3], [0, 0.15], { easing: Easing.out(Easing.cubic) });

  // Candlestick animation
  const candleOpacity = interpolate(frameProgress, [0.3, 0.5], [0, 1], { easing: Easing.out(Easing.cubic) });
  const candleScale = interpolate(frameProgress, [0.3, 0.6], [0, 1], { easing: Easing.out(Easing.cubic) });

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
  const contentOpacity = interpolate(frameProgress, [0, 0.1], [0, 1], { easing: Easing.out(Easing.cubic) });
  const fadeOut = interpolate(frameProgress, [0.85, 1], [1, 0], { easing: Easing.in(Easing.ease) });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          opacity: contentOpacity,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: 'white', fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
          Gráficos Avanzados
        </div>
        <div style={{ fontSize: 18, color: '#a0aec0', fontFamily: "'Inter', sans-serif" }}>
          Análisis técnico en tiempo real con TradingView
        </div>
      </div>

      <div style={{ position: 'relative', width: '90%', height: '70%', maxWidth: 1000 }}>
        <AnimatedChart frameProgress={frameProgress} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          opacity: contentOpacity,
          zIndex: 10,
          textAlign: 'right',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, color: '#00ff96', fontFamily: "'Inter', sans-serif" }}>
          +2.85%
        </div>
        <div style={{ fontSize: 14, color: '#a0aec0', marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
          Señales de Compra/Venta
        </div>
      </div>
    </AbsoluteFill>
  );
};

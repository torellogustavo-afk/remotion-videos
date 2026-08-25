import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  interpolate,
  Easing,
  useCurrentFrame,
} from 'remotion';

// Colores de la marca
const COLORS = {
  darkBlue: '#0A1E40',
  gold: '#D4AF37',
  lightGray: '#F5F5F5',
  white: '#FFFFFF',
};

// Scene 1: Entrada de marca (0s-2.5s = 0-75 frames)
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [0, 30], [0.8, 1], {
    easing: Easing.out(Easing.cubic),
  });

  const yOffset = interpolate(frame, [0, 40], [50, 0], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Fondo con efecto de gradiente sutil */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, #0F2847 100%)`,
          opacity: 0.7,
        }}
      />

      {/* Línea decorativa superior */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          width: '100%',
          height: 1,
          background: COLORS.gold,
          opacity: opacity * 0.6,
        }}
      />

      {/* Título principal con animación */}
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${yOffset}px)`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 300,
            letterSpacing: 2,
            color: COLORS.white,
            margin: 0,
            lineHeight: 1.3,
            fontFamily: 'Georgia, serif',
          }}
        >
          BOUTIQUE
        </h1>
        <div
          style={{
            height: 2,
            width: 100,
            backgroundColor: COLORS.gold,
            margin: '12px auto 12px',
          }}
        />
        <h2
          style={{
            fontSize: 40,
            fontWeight: 300,
            letterSpacing: 1.5,
            color: COLORS.gold,
            margin: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          DE GESTIÓN PATRIMONIAL
        </h2>
      </div>

      {/* Línea decorativa inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: 0,
          width: '100%',
          height: 1,
          background: COLORS.gold,
          opacity: opacity * 0.6,
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 2: Tres pilares (2.5s-5.5s = 75-165 frames)
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const pillar1Opacity = interpolate(frame, [0, 15], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillar2Opacity = interpolate(frame, [20, 35], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillar3Opacity = interpolate(frame, [40, 55], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillar1Y = interpolate(frame, [0, 15], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillar2Y = interpolate(frame, [20, 35], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillar3Y = interpolate(frame, [40, 55], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const Pillar: React.FC<{ title: string; opacity: number; yOffset: number }> = ({
    title,
    opacity,
    yOffset,
  }) => (
    <div
      style={{
        opacity,
        transform: `translateY(${yOffset}px)`,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          width: 60,
          height: 2,
          backgroundColor: COLORS.gold,
          margin: '0 auto 16px',
        }}
      />
      <p
        style={{
          fontSize: 22,
          fontWeight: 300,
          letterSpacing: 1,
          color: COLORS.white,
          margin: '0 0 8px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {title}
      </p>
      <div
        style={{
          width: 60,
          height: 1,
          backgroundColor: COLORS.gold,
          margin: '16px auto 0',
          opacity: 0.5,
        }}
      />
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Pillar
          title="Gestión Patrimonial"
          opacity={pillar1Opacity}
          yOffset={pillar1Y}
        />
        <Pillar
          title="Inversiones Estratégicas"
          opacity={pillar2Opacity}
          yOffset={pillar2Y}
        />
        <Pillar
          title="Consultoría Técnica"
          opacity={pillar3Opacity}
          yOffset={pillar3Y}
        />
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Diferencial fuerte (5.5s-8.5s = 165-255 frames)
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const mainOpacity = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mainScale = interpolate(frame, [0, 25], [0.9, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const accentLineScale = interpolate(frame, [15, 35], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 40px',
        overflow: 'hidden',
      }}
    >
      {/* Fondo con patrón sutil */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05,
          background: `repeating-linear-gradient(
            45deg,
            ${COLORS.gold},
            ${COLORS.gold} 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      <div
        style={{
          textAlign: 'center',
          zIndex: 2,
          maxWidth: 500,
        }}
      >
        {/* Línea superior decorativa */}
        <div
          style={{
            width: accentLineScale * 60,
            height: 2,
            backgroundColor: COLORS.gold,
            margin: '0 auto 24px',
            transition: 'none',
          }}
        />

        {/* Texto principal */}
        <h1
          style={{
            opacity: mainOpacity,
            transform: `scale(${mainScale})`,
            fontSize: 52,
            fontWeight: 300,
            letterSpacing: 2,
            color: COLORS.gold,
            margin: 0,
            lineHeight: 1.3,
            fontFamily: 'Georgia, serif',
          }}
        >
          LOS ÚNICOS
          <br />
          EN LA PAMPA
        </h1>

        {/* Línea divisoria */}
        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: COLORS.gold,
            margin: '24px auto',
            opacity: mainOpacity,
          }}
        />

        {/* Subtítulo */}
        <p
          style={{
            opacity: subtitleOpacity,
            fontSize: 18,
            fontWeight: 300,
            letterSpacing: 0.8,
            color: COLORS.lightGray,
            margin: 0,
            lineHeight: 1.6,
            fontFamily: 'Georgia, serif',
          }}
        >
          Servicios premium de gestión
          <br />
          patrimonial e inversiones
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Cierre de marca (8.5s-11s = 255-330 frames)
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(frame, [55, 75], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitScale = interpolate(frame, [55, 75], [1, 0.95], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Fondo con efecto de gradiente */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, #0F2847 100%)`,
          opacity: 0.7,
        }}
      />

      {/* Contenedor principal */}
      <div
        style={{
          opacity: opacity * exitOpacity,
          transform: `scale(${scale * exitScale})`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {/* Línea superior */}
        <div
          style={{
            width: 80,
            height: 1,
            backgroundColor: COLORS.gold,
            margin: '0 auto 20px',
            opacity: 0.6,
          }}
        />

        <h1
          style={{
            fontSize: 44,
            fontWeight: 300,
            letterSpacing: 1.5,
            color: COLORS.white,
            margin: '0 0 8px',
            fontFamily: 'Georgia, serif',
            lineHeight: 1.3,
          }}
        >
          BOUTIQUE
        </h1>
        <p
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: 1.2,
            color: COLORS.gold,
            margin: 0,
            fontFamily: 'Georgia, serif',
            lineHeight: 1.4,
          }}
        >
          DE GESTIÓN PATRIMONIAL
        </p>

        {/* Línea inferior */}
        <div
          style={{
            width: 80,
            height: 1,
            backgroundColor: COLORS.gold,
            margin: '20px auto 0',
            opacity: 0.6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const BoutiquePremiumV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBlue }}>
      {/* Scene 1: Entrada (0-75 frames / 0-2.5s) */}
      <Sequence from={0} durationInFrames={75}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: Pilares (75-165 frames / 2.5-5.5s) */}
      <Sequence from={75} durationInFrames={90}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: Diferencial (165-255 frames / 5.5-8.5s) */}
      <Sequence from={165} durationInFrames={90}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: Cierre (255-330 frames / 8.5-11s) */}
      <Sequence from={255} durationInFrames={75}>
        <Scene4 />
      </Sequence>
    </AbsoluteFill>
  );
};

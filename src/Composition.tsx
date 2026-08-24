import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';

export const MyComposition: React.FC = () => {
  const config = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        Welcome to Remotion
      </h1>
      <p
        style={{
          fontSize: 40,
          marginTop: 20,
        }}
      >
        Duration: {config.durationInFrames} frames
      </p>
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, useVideoConfig, interpolate, useCurrentFrame, Easing } from 'remotion';
import { HeroScene } from './scenes/HeroScene';
import { MetricsScene } from './scenes/MetricsScene';
import { ChartsScene } from './scenes/ChartsScene';
import { FeatureShowcase } from './scenes/FeatureShowcase';
import { CTAScene } from './scenes/CTAScene';

export const MyComposition: React.FC = () => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  // Scene timing (60fps, so divide by 60 for seconds)
  // Increased timing for clarity: 2-4s per scene instead of 1.5s
  const sceneLength = 120; // 2 seconds base per scene @ 60fps
  const totalFrames = config.durationInFrames;

  // Hero: 3s (hook needs impact + readability)
  const heroEnd = sceneLength * 1.5;
  // Metrics: 4s (numbers need time to read and understand)
  const metricsEnd = heroEnd + sceneLength * 2;
  // Charts: 4.5s (animations + analysis comprehension)
  const chartsEnd = metricsEnd + sceneLength * 2.25;
  // Features: 5s (4 cards need individual breathing room)
  const featuresEnd = chartsEnd + sceneLength * 2.5;
  // CTA: 3.5s (conversion message needs clarity)
  const ctaEnd = featuresEnd + sceneLength * 1.75;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0e27', overflow: 'hidden' }}>
      {/* Scene 1: Hero - The Opportunity */}
      {frame < heroEnd && <HeroScene frameProgress={frame / heroEnd} />}

      {/* Scene 2: Metrics & Analytics */}
      {frame >= heroEnd && frame < metricsEnd && (
        <MetricsScene frameProgress={(frame - heroEnd) / sceneLength} />
      )}

      {/* Scene 3: Advanced Charts & Analysis */}
      {frame >= metricsEnd && frame < chartsEnd && (
        <ChartsScene frameProgress={(frame - metricsEnd) / (sceneLength * 1.5)} />
      )}

      {/* Scene 4: Feature Showcase */}
      {frame >= chartsEnd && frame < featuresEnd && (
        <FeatureShowcase frameProgress={(frame - chartsEnd) / (sceneLength * 2)} />
      )}

      {/* Scene 5: CTA */}
      {frame >= featuresEnd && (
        <CTAScene frameProgress={(frame - featuresEnd) / sceneLength} />
      )}
    </AbsoluteFill>
  );
};

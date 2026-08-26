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
  const sceneLength = 90; // 1.5 seconds per scene
  const totalFrames = config.durationInFrames;

  const heroEnd = sceneLength;
  const metricsEnd = heroEnd + sceneLength;
  const chartsEnd = metricsEnd + sceneLength * 1.5;
  const featuresEnd = chartsEnd + sceneLength * 2;
  const ctaEnd = featuresEnd + sceneLength;

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

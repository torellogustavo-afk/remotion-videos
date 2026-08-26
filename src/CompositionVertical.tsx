import React from 'react';
import { AbsoluteFill, useVideoConfig, interpolate, useCurrentFrame, Easing } from 'remotion';
import { HeroSceneVertical } from './scenes/HeroSceneVertical';
import { MetricsSceneVertical } from './scenes/MetricsSceneVertical';
import { ChartsSceneVertical } from './scenes/ChartsSceneVertical';
import { FeatureShowcaseVertical } from './scenes/FeatureShowcaseVertical';
import { CTASceneVertical } from './scenes/CTASceneVertical';

export const MyCompositionVertical: React.FC = () => {
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
      {frame < heroEnd && <HeroSceneVertical frameProgress={frame / heroEnd} />}

      {/* Scene 2: Metrics & Analytics */}
      {frame >= heroEnd && frame < metricsEnd && (
        <MetricsSceneVertical frameProgress={(frame - heroEnd) / sceneLength} />
      )}

      {/* Scene 3: Advanced Charts & Analysis */}
      {frame >= metricsEnd && frame < chartsEnd && (
        <ChartsSceneVertical frameProgress={(frame - metricsEnd) / (sceneLength * 1.5)} />
      )}

      {/* Scene 4: Feature Showcase */}
      {frame >= chartsEnd && frame < featuresEnd && (
        <FeatureShowcaseVertical frameProgress={(frame - chartsEnd) / (sceneLength * 2)} />
      )}

      {/* Scene 5: CTA */}
      {frame >= featuresEnd && (
        <CTASceneVertical frameProgress={(frame - featuresEnd) / sceneLength} />
      )}
    </AbsoluteFill>
  );
};

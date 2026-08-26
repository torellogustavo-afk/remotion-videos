import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { MyCompositionVertical } from './CompositionVertical';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Horizontal 16:9 - YouTube, LinkedIn */}
      <Composition
        id="InvestmentPlatformAd"
        component={MyComposition}
        durationInFrames={1200}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Vertical 9:16 - TikTok, Instagram Reels, Stories */}
      <Composition
        id="InvestmentPlatformAdVertical"
        component={MyCompositionVertical}
        durationInFrames={1200}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};

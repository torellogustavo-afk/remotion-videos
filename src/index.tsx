import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="InvestmentPlatformAd"
      component={MyComposition}
      durationInFrames={540}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};

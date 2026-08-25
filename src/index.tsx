import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BoutiquePresentationVideo"
      component={MyComposition}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

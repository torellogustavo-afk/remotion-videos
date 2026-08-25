import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { BoutiquePremiumV2 } from './BoutiquePremiumV2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BoutiquePremiumV2"
        component={BoutiquePremiumV2}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

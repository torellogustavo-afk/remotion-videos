import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { MyComposition } from './Composition';
import { RaulButaciUTMB } from './RaulButaciUTMB';

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
        id="RaulButaciUTMB"
        component={RaulButaciUTMB}
        durationInFrames={2610}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);

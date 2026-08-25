import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { RaulButaciVideo } from './RaulButaciVideo';
import { RaulButaciAdvanced } from './RaulButaciAdvanced';

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
        component={RaulButaciVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RaulButaciUTMBAdvanced"
        component={RaulButaciAdvanced}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

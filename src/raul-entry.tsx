import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { RaulButaciUTMB } from './RaulButaciUTMB';

const RaulRoot: React.FC = () => {
	return (
		<Composition
			id="RaulButaciUTMB"
			component={RaulButaciUTMB}
			durationInFrames={2610}
			fps={30}
			width={1080}
			height={1920}
		/>
	);
};

registerRoot(RaulRoot);

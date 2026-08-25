import React from 'react';
import {
	AbsoluteFill,
	Img,
	Audio,
	Sequence,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	staticFile,
	spring,
} from 'remotion';

interface CameraShot {
	startFrame: number;
	durationFrames: number;
	startScale: number;
	endScale: number;
	startX: number;
	endX: number;
	startY: number;
	endY: number;
	name: string;
}

const cameraShots: CameraShot[] = [
	// Audio body shots (5.5s onwards)
	{
		name: 'Audio body 1',
		startFrame: 165,
		durationFrames: 180,
		startScale: 1.6,
		endScale: 1.65,
		startX: -80,
		endX: -85,
		startY: -90,
		endY: -95,
	},
	{
		name: 'Audio body 2',
		startFrame: 345,
		durationFrames: 180,
		startScale: 1.55,
		endScale: 1.5,
		startX: -75,
		endX: -65,
		startY: -85,
		endY: -75,
	},
	{
		name: 'Audio body 3',
		startFrame: 525,
		durationFrames: 210,
		startScale: 1.45,
		endScale: 1.55,
		startX: -60,
		endX: -70,
		startY: -70,
		endY: -80,
	},
	{
		name: 'Audio body 4',
		startFrame: 735,
		durationFrames: 210,
		startScale: 1.5,
		endScale: 1.6,
		startX: -70,
		endX: -80,
		startY: -80,
		endY: -90,
	},
	{
		name: 'Audio body 5',
		startFrame: 945,
		durationFrames: 210,
		startScale: 1.65,
		endScale: 1.55,
		startX: -85,
		endX: -70,
		startY: -95,
		endY: -80,
	},
	{
		name: 'Audio body 6',
		startFrame: 1155,
		durationFrames: 210,
		startScale: 1.5,
		endScale: 1.65,
		startX: -65,
		endX: -80,
		startY: -75,
		endY: -90,
	},
	{
		name: 'Audio body 7',
		startFrame: 1365,
		durationFrames: 210,
		startScale: 1.6,
		endScale: 1.5,
		startX: -80,
		endX: -65,
		startY: -90,
		endY: -75,
	},
	{
		name: 'Audio body 8',
		startFrame: 1575,
		durationFrames: 210,
		startScale: 1.55,
		endScale: 1.65,
		startX: -70,
		endX: -85,
		startY: -80,
		endY: -95,
	},
	{
		name: 'Audio body 9',
		startFrame: 1785,
		durationFrames: 210,
		startScale: 1.65,
		endScale: 1.55,
		startX: -85,
		endX: -75,
		startY: -95,
		endY: -85,
	},
	{
		name: 'Audio body 10',
		startFrame: 1995,
		durationFrames: 210,
		startScale: 1.6,
		endScale: 1.5,
		startX: -80,
		endX: -65,
		startY: -90,
		endY: -75,
	},
	{
		name: 'Audio body 11',
		startFrame: 2205,
		durationFrames: 180,
		startScale: 1.5,
		endScale: 1.55,
		startX: -65,
		endX: -70,
		startY: -75,
		endY: -80,
	},
	{
		name: 'Audio body 12',
		startFrame: 2385,
		durationFrames: 120,
		startScale: 1.55,
		endScale: 1.6,
		startX: -70,
		endX: -80,
		startY: -80,
		endY: -90,
	},
];

interface ImageLayerProps {
	shot: CameraShot;
}

const ImageLayer: React.FC<ImageLayerProps> = ({shot}) => {
	const frame = useCurrentFrame();

	const isActive = frame >= shot.startFrame && frame < shot.startFrame + shot.durationFrames;
	if (!isActive) return null;

	const relativeFrame = frame - shot.startFrame;
	const progress = relativeFrame / shot.durationFrames;

	const scale = interpolate(progress, [0, 1], [shot.startScale, shot.endScale]);
	const translateX = interpolate(progress, [0, 1], [shot.startX, shot.endX]);
	const translateY = interpolate(progress, [0, 1], [shot.startY, shot.endY]);

	return (
		<Img
			src={staticFile('raul-butaci-utmb.jpg')}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
			}}
		/>
	);
};

// Hook text components with cinematic sports aesthetic
const HookNameTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	// 0:00-0:01 - Entry animation
	const hookStart = 0;
	const hookEnd = 30; // 1 second

	if (frame < hookStart || frame >= hookEnd) return null;

	const relativeFrame = frame - hookStart;
	const progress = relativeFrame / (hookEnd - hookStart);

	// Aggressive spring entrance
	const springValue = spring({
		frame: relativeFrame,
		fps,
		config: {
			damping: 5,
			mass: 0.5,
			stiffness: 150,
		},
		durationInFrames: hookEnd - hookStart,
	});

	const opacity = interpolate(progress, [0, 0.15, 1], [0, 1, 1]);
	const scale = interpolate(springValue, [0, 1], [0.6, 1]);
	const yOffset = interpolate(springValue, [0, 1], [60, 0]);
	const rotationZ = interpolate(springValue, [0, 1], [3, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				opacity,
				pointerEvents: 'none',
				zIndex: 20,
			}}
		>
			<div
				style={{
					transform: `scale(${scale}) translateY(${yOffset}px) rotateZ(${rotationZ}deg)`,
					fontSize: 64,
					fontWeight: 1000,
					color: '#FFFFFF',
					textAlign: 'center',
					letterSpacing: '-2px',
					textTransform: 'uppercase',
					fontFamily: '"Arial Black", sans-serif',
					textShadow: '0 8px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(255,140,0,0.4)',
					lineHeight: 1.05,
					maxWidth: '90%',
					fontStyle: 'normal',
				}}
			>
				RAÚL<br />
				BUTACI
			</div>
		</div>
	);
};

const HookMainTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	// 0:01-0:02.5 - MASSIVE protagonist text
	const startFrame = 30; // 1 second
	const endFrame = 75; // 2.5 seconds
	const durationFrames = endFrame - startFrame;

	if (frame < startFrame || frame >= endFrame) return null;

	const relativeFrame = frame - startFrame;
	const progress = relativeFrame / durationFrames;

	// Ultra-aggressive spring
	const springValue = spring({
		frame: relativeFrame,
		fps,
		config: {
			damping: 3,
			mass: 0.4,
			stiffness: 200,
		},
		durationInFrames: durationFrames,
	});

	const opacity = interpolate(progress, [0, 0.15, 0.95, 1], [0, 1, 1, 1]);
	const scale = interpolate(springValue, [0, 1], [1.4, 1]);
	const yOffset = interpolate(springValue, [0, 1], [50, 0]);
	const rotationZ = interpolate(springValue, [0, 1], [-2, 0]);

	// Flash effect on entrance
	const flashOpacity = interpolate(progress, [0, 0.1, 0.2], [0.8, 0.4, 0]);

	return (
		<>
			{/* Flash effect */}
			<AbsoluteFill
				style={{
					backgroundColor: 'rgba(255, 255, 255, 0.3)',
					opacity: flashOpacity,
					pointerEvents: 'none',
					zIndex: 21,
				}}
			/>

			{/* Main text */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity,
					pointerEvents: 'none',
					zIndex: 22,
				}}
			>
				<div
					style={{
						transform: `scale(${scale}) translateY(${yOffset}px) rotateZ(${rotationZ}deg)`,
						fontSize: 160,
						fontWeight: 1000,
						color: '#FFFFFF',
						textAlign: 'center',
						letterSpacing: '-3px',
						textTransform: 'uppercase',
						fontFamily: '"Arial Black", sans-serif',
						textShadow: '0 12px 32px rgba(0,0,0,0.97), 0 4px 12px rgba(255,140,0,0.6)',
						lineHeight: 0.95,
						maxWidth: '95%',
						fontStyle: 'normal',
					}}
				>
					CANDIDATO<br />
					<span
						style={{
							color: '#FF8C00',
							display: 'block',
							borderBottom: '4px solid #FF8C00',
							paddingBottom: '12px',
							marginTop: '-8px',
						}}
					>
						AL PODIO
					</span>
				</div>
			</div>
		</>
	);
};

const HookBadge: React.FC = () => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	// 0:02.5-0:03.3 - Orange badge
	const startFrame = 75;
	const endFrame = 99;
	const durationFrames = endFrame - startFrame;

	if (frame < startFrame || frame >= endFrame) return null;

	const relativeFrame = frame - startFrame;
	const progress = relativeFrame / durationFrames;

	const springValue = spring({
		frame: relativeFrame,
		fps,
		config: {
			damping: 4,
			mass: 0.6,
			stiffness: 180,
		},
		durationInFrames: durationFrames,
	});

	const opacity = interpolate(progress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
	const scale = interpolate(springValue, [0, 1], [1.5, 1]);
	const yOffset = interpolate(springValue, [0, 1], [40, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				bottom: '30%',
				left: '50%',
				transform: `translate(-50%, 50%) scale(${scale}) translateY(${yOffset}px)`,
				opacity,
				pointerEvents: 'none',
				zIndex: 23,
			}}
		>
			<div
				style={{
					backgroundColor: '#FF8C00',
					padding: '16px 32px',
					borderRadius: '4px',
					fontSize: 40,
					fontWeight: 1000,
					color: '#FFFFFF',
					letterSpacing: '1px',
					textTransform: 'uppercase',
					textShadow: '0 6px 16px rgba(0,0,0,0.7)',
					fontFamily: '"Arial Black", sans-serif',
				}}
			>
				UTMB 2026
			</div>
		</div>
	);
};

const HookAudioIntro: React.FC = () => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	// 0:03.3-0:05.0 - Audio intro text (50 frames duration)
	const startFrame = 99;
	const endFrame = 150;
	const durationFrames = endFrame - startFrame;

	if (frame < startFrame || frame >= endFrame) return null;

	const relativeFrame = frame - startFrame;
	const progress = relativeFrame / durationFrames;

	const springValue = spring({
		frame: relativeFrame,
		fps,
		config: {
			damping: 5,
			mass: 0.8,
			stiffness: 140,
		},
		durationInFrames: durationFrames,
	});

	const opacity = interpolate(progress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
	const yOffset = interpolate(springValue, [0, 1], [30, 0]);
	const scale = interpolate(springValue, [0, 1], [0.95, 1]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-end',
				paddingBottom: '28%',
				opacity,
				pointerEvents: 'none',
				zIndex: 24,
			}}
		>
			<div
				style={{
					transform: `scale(${scale}) translateY(${yOffset}px)`,
					fontSize: 36,
					fontWeight: 800,
					color: '#FFFFFF',
					textAlign: 'center',
					letterSpacing: '0px',
					textTransform: 'uppercase',
					fontFamily: '"Arial Black", sans-serif',
					textShadow: '0 6px 20px rgba(0,0,0,0.85)',
					maxWidth: '85%',
					lineHeight: 1.25,
					marginBottom: 24,
				}}
			>
				EL AUDIO QUE ENVIÓ<br />
				ANTES DE LA LARGADA
			</div>

			{/* Animated waveform */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '5px',
					height: '50px',
				}}
			>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
					const delay = i * 3;
					const waveProgress = (progress * 60 - delay) / 20;
					const barHeight = interpolate(
						Math.max(0, Math.min(1, waveProgress)),
						[0, 0.5, 1],
						[8, 35, 8]
					) * (0.7 + (i % 2) * 0.3);

					return (
						<div
							key={i}
							style={{
								width: '4px',
								height: `${Math.max(8, barHeight)}px`,
								backgroundColor: '#FF8C00',
								borderRadius: '2px',
								opacity: 0.8,
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const RaulButaciUTMB: React.FC = () => {
	const {fps} = useVideoConfig();

	const HOOK_END = 5.5 * fps; // Frame 165 (5.5 seconds)
	const AUDIO_START = HOOK_END;
	const AUDIO_DURATION = 75;
	const AUDIO_END = AUDIO_START + AUDIO_DURATION * fps;
	const CTA_START = AUDIO_END;
	const CTA_DURATION = 4;
	const CTA_END = CTA_START + CTA_DURATION * fps;

	return (
		<AbsoluteFill style={{backgroundColor: '#0A0A0A'}}>
			{/* Background Image Layer - Always visible with animated shots */}
			<AbsoluteFill style={{overflow: 'hidden', position: 'relative'}}>
				{cameraShots.map((shot, idx) => (
					<ImageLayer key={idx} shot={shot} />
				))}

				{/* Dark overlay for text contrast */}
				<AbsoluteFill
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						backdropFilter: 'blur(1px)',
					}}
				/>
			</AbsoluteFill>

			{/* Premium Hook Sequence (0-5.5s) */}
			<HookNameTitle />
			<HookMainTitle />
			<HookBadge />
			<HookAudioIntro />

			{/* Audio - Starts at frame 165 (5.5 seconds) */}
			<Sequence from={AUDIO_START} durationInFrames={AUDIO_DURATION * fps}>
				<Audio src={staticFile('raul-butaci-audio-body.ogg')} />
			</Sequence>

			{/* CTA Closing (83-87 seconds) */}
			<Sequence from={CTA_START} durationInFrames={CTA_DURATION * fps}>
				<AbsoluteFill
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.85)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 40,
						padding: '40px',
					}}
				>
					<div
						style={{
							fontSize: 60,
							fontWeight: 900,
							color: '#FFFFFF',
							textAlign: 'center',
							letterSpacing: '2px',
							textTransform: 'uppercase',
							marginBottom: 20,
							textShadow: '0 4px 12px rgba(0,0,0,0.8)',
							fontFamily: 'Arial, sans-serif',
						}}
					>
						RAÚL BUTACI
					</div>
					<div
						style={{
							fontSize: 48,
							fontWeight: 700,
							color: '#FF8C00',
							textAlign: 'center',
							letterSpacing: '1px',
							textTransform: 'uppercase',
							marginBottom: 40,
							fontFamily: 'Arial, sans-serif',
						}}
					>
						UTMB 2026
					</div>
					<div
						style={{
							fontSize: 32,
							fontWeight: 600,
							color: '#FFFFFF',
							textAlign: 'center',
							lineHeight: 1.4,
							marginBottom: 30,
							fontFamily: 'Arial, sans-serif',
						}}
					>
						SEGUÍ SU CAMINO EN EL UTMB
					</div>
					<div
						style={{
							fontSize: 28,
							fontWeight: 500,
							color: '#FF8C00',
							textAlign: 'center',
							lineHeight: 1.3,
							fontFamily: 'Arial, sans-serif',
						}}
					>
						SEGUINOS PARA SEGUIR LA CARRERA
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};

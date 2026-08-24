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
} from 'remotion';

// Virtual camera shots - different encadrements of the same photo
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
	// 0-4s: Wide establishing shot with slow zoom
	{
		name: 'Wide establishing',
		startFrame: 0,
		durationFrames: 120,
		startScale: 1,
		endScale: 1.1,
		startX: 0,
		endX: -20,
		startY: 0,
		endY: -15,
	},
	// 4-8s: Slow transition to medium shot
	{
		name: 'Medium transition',
		startFrame: 120,
		durationFrames: 120,
		startScale: 1.1,
		endScale: 1.25,
		startX: -20,
		endX: -40,
		startY: -15,
		endY: -50,
	},
	// 8-15s: Close-up on face
	{
		name: 'Close face',
		startFrame: 240,
		durationFrames: 210,
		startScale: 1.4,
		endScale: 1.5,
		startX: -60,
		endX: -70,
		startY: -100,
		endY: -120,
	},
	// 15-22s: Pull back to medium
	{
		name: 'Medium pull back',
		startFrame: 450,
		durationFrames: 210,
		startScale: 1.3,
		endScale: 1.15,
		startX: -50,
		endX: -30,
		startY: -60,
		endY: -20,
	},
	// 22-29s: Vertical pan down
	{
		name: 'Vertical pan down',
		startFrame: 660,
		durationFrames: 210,
		startScale: 1.2,
		endScale: 1.3,
		startX: -35,
		endX: -40,
		startY: 0,
		endY: -80,
	},
	// 29-36s: Horizontal pan left with slight zoom
	{
		name: 'Horizontal pan left',
		startFrame: 870,
		durationFrames: 210,
		startScale: 1.15,
		endScale: 1.25,
		startX: 0,
		endX: -60,
		startY: -30,
		endY: -50,
	},
	// 36-43s: Wide angle with slow zoom
	{
		name: 'Wide zoom',
		startFrame: 1080,
		durationFrames: 210,
		startScale: 1,
		endScale: 1.2,
		startX: -10,
		endX: -30,
		startY: 0,
		endY: -40,
	},
	// 43-50s: Close focus on expression
	{
		name: 'Expression focus',
		startFrame: 1290,
		durationFrames: 210,
		startScale: 1.35,
		endScale: 1.45,
		startX: -55,
		endX: -65,
		startY: -80,
		endY: -110,
	},
	// 50-57s: Reset to medium-wide
	{
		name: 'Medium reset',
		startFrame: 1500,
		durationFrames: 210,
		startScale: 1.2,
		endScale: 1.15,
		startX: -40,
		endX: -25,
		startY: -50,
		endY: -15,
	},
	// 57-64s: Slow pan with gentle zoom
	{
		name: 'Gentle pan zoom',
		startFrame: 1710,
		durationFrames: 210,
		startScale: 1.1,
		endScale: 1.25,
		startX: -15,
		endX: -45,
		startY: -20,
		endY: -60,
	},
	// 64-71s: Body focus with slight zoom
	{
		name: 'Body shot',
		startFrame: 1920,
		durationFrames: 210,
		startScale: 1.25,
		endScale: 1.35,
		startX: -35,
		endX: -45,
		startY: 10,
		endY: -30,
	},
	// 71-78s: Full frame slow zoom
	{
		name: 'Full zoom out',
		startFrame: 2130,
		durationFrames: 210,
		startScale: 1.3,
		endScale: 1.2,
		startX: -50,
		endX: -35,
		startY: -60,
		endY: -25,
	},
	// 78-83s: Final emphasis close-up
	{
		name: 'Final close',
		startFrame: 2340,
		durationFrames: 150,
		startScale: 1.4,
		endScale: 1.45,
		startX: -60,
		endX: -65,
		startY: -90,
		endY: -105,
	},
];

interface ImageLayerProps {
	shot: CameraShot;
}

const ImageLayer: React.FC<ImageLayerProps> = ({shot}) => {
	const frame = useCurrentFrame();

	// Check if this shot is active
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

const TextOverlay: React.FC<{text: string; startFrame: number; durationFrames: number; fontSize: number; color: string}> = ({
	text,
	startFrame,
	durationFrames,
	fontSize,
	color,
}) => {
	const frame = useCurrentFrame();

	const isActive = frame >= startFrame && frame < startFrame + durationFrames;
	if (!isActive) return null;

	const relativeFrame = frame - startFrame;
	const fadeInFrames = 12; // 0.4s fade in
	const fadeOutFrames = 6; // 0.2s fade out
	const fadeOutStart = durationFrames - fadeOutFrames;

	let opacity = 1;
	if (relativeFrame < fadeInFrames) {
		opacity = relativeFrame / fadeInFrames;
	} else if (relativeFrame > fadeOutStart) {
		opacity = (durationFrames - relativeFrame) / fadeOutFrames;
	}

	const scale = relativeFrame < fadeInFrames ? 0.95 + (relativeFrame / fadeInFrames) * 0.05 : 1;

	return (
		<div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				transform: `scale(${scale})`,
				zIndex: 30,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					fontSize,
					fontWeight: 900,
					color,
					textAlign: 'center',
					textShadow: '0 4px 16px rgba(0,0,0,0.8)',
					letterSpacing: '2px',
					textTransform: 'uppercase',
					lineHeight: 1.2,
					maxWidth: '90%',
				}}
			>
				{text}
			</div>
		</div>
	);
};

export const RaulButaciUTMB: React.FC = () => {
	const {fps} = useVideoConfig();

	// Total frames: 87 seconds @ 30fps = 2610 frames
	const HOOK_START = 0;
	const HOOK_END = 8 * fps; // 8 seconds for hook
	const AUDIO_START = HOOK_END; // Frame 240
	const AUDIO_DURATION = 75; // 75 seconds of audio
	const AUDIO_END = AUDIO_START + AUDIO_DURATION * fps; // Frame 2490
	const CTA_START = AUDIO_END; // Frame 2490
	const CTA_DURATION = 4; // 4 seconds
	const CTA_END = CTA_START + CTA_DURATION * fps; // Frame 2610

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
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						backdropFilter: 'blur(1px)',
					}}
				/>
			</AbsoluteFill>

			{/* Hook Text Layer (0-8 seconds) */}
			<TextOverlay
				text="RAÚL BUTACI"
				startFrame={0}
				durationFrames={60}
				fontSize={72}
				color="#FFFFFF"
			/>

			<TextOverlay
				text="CANDIDATO AL PODIO"
				startFrame={60}
				durationFrames={60}
				fontSize={96}
				color="#FFFFFF"
			/>

			<TextOverlay
				text="UTMB 2026"
				startFrame={120}
				durationFrames={60}
				fontSize={64}
				color="#FF8C00"
			/>

			<TextOverlay
				text="EL AUDIO QUE ENVIÓ ANTES DE LA LARGADA"
				startFrame={180}
				durationFrames={60}
				fontSize={36}
				color="#FFFFFF"
			/>

			{/* Audio - Starts at frame 240 (8 seconds) */}
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
						}}
					>
						SEGUINOS PARA SEGUIR LA CARRERA
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};

import React, { useMemo } from 'react';
import {
	AbsoluteFill,
	Img,
	Audio,
	Sequence,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring,
	staticFile,
} from 'remotion';

const Title: React.FC<{ text: string; delay: number; duration: number }> = ({
	text,
	delay,
	duration,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const startFrame = delay * fps;
	const endFrame = (delay + duration) * fps;
	const progress = Math.max(0, Math.min(1, (frame - startFrame) / (10 * fps)));

	return (
		<Sequence from={startFrame} durationInFrames={duration * fps}>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: 'auto',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
					opacity: progress < 1 ? progress : 1,
					transform: `scale(${1 + (1 - progress) * 0.1})`,
					zIndex: 20,
					fontFamily: 'Arial, sans-serif',
					fontWeight: 700,
					color: '#FFFFFF',
					textShadow: '0 4px 12px rgba(0,0,0,0.8)',
					letterSpacing: '2px',
				}}
			>
				{text}
			</div>
		</Sequence>
	);
};

const PowerText: React.FC = () => {
	return (
		<div
			style={{
				fontSize: 96,
				fontWeight: 900,
				color: '#FFFFFF',
				textShadow: '0 6px 20px rgba(0,0,0,0.9), 0 2px 4px rgba(255,140,0,0.4)',
				textAlign: 'center',
				letterSpacing: '3px',
				lineHeight: 1.2,
				textTransform: 'uppercase',
				position: 'absolute',
				zIndex: 25,
			}}
		>
			CANDIDATO
			<br />
			AL PODIO
		</div>
	);
};

const KenBurnsImage: React.FC<{
	startFrame: number;
	durationFrames: number;
	startScale: number;
	endScale: number;
	startX: number;
	endX: number;
	startY: number;
	endY: number;
}> = ({
	startFrame,
	durationFrames,
	startScale,
	endScale,
	startX,
	endX,
	startY,
	endY,
}) => {
	const frame = useCurrentFrame();

	const isActive = frame >= startFrame && frame < startFrame + durationFrames;
	const relativeFrame = Math.max(0, frame - startFrame);
	const progress = Math.min(1, relativeFrame / durationFrames);

	const currentScale = interpolate(progress, [0, 1], [startScale, endScale]);
	const currentX = interpolate(progress, [0, 1], [startX, endX]);
	const currentY = interpolate(progress, [0, 1], [startY, endY]);

	if (!isActive) return null;

	return (
		<Img
			src={staticFile('raul-butaci-utmb.jpg')}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				transform: `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`,
			}}
		/>
	);
};

export const RaulButaciUTMB: React.FC = () => {
	const { durationInFrames, fps, width, height } = useVideoConfig();

	return (
		<AbsoluteFill style={{ backgroundColor: '#0A0A0A' }}>
			{/* Background Image Layer with Ken Burns */}
			<AbsoluteFill style={{ overflow: 'hidden' }}>
				{/* Shot 1: Wide establishing with slow zoom (0:00-0:02) */}
				<KenBurnsImage
					startFrame={0}
					durationFrames={60}
					startScale={1}
					endScale={1.15}
					startX={0}
					endX={-40}
					startY={0}
					endY={-30}
				/>

				{/* Shot 2: Closer on face with slight pan (0:02-0:04) */}
				<Sequence from={60} durationInFrames={120}>
					<KenBurnsImage
						startFrame={60}
						durationFrames={60}
						startScale={1.3}
						endScale={1.5}
						startX={-60}
						endX={-80}
						startY={-80}
						endY={-120}
					/>
				</Sequence>

				{/* Shot 3: Medium shot (0:04-0:06) */}
				<Sequence from={120} durationInFrames={60}>
					<KenBurnsImage
						startFrame={120}
						durationFrames={60}
						startScale={1.1}
						endScale={1.25}
						startX={-20}
						endX={-40}
						startY={-20}
						endY={-50}
					/>
				</Sequence>

				{/* Shot 4: Wide with downward pan (0:06-0:09) */}
				<Sequence from={180} durationInFrames={90}>
					<KenBurnsImage
						startFrame={180}
						durationFrames={90}
						startScale={1}
						endScale={1.2}
						startX={0}
						endX={30}
						startY={0}
						endY={-60}
					/>
				</Sequence>

				{/* Dark overlay for text contrast */}
				<AbsoluteFill
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.35)',
						backdropFilter: 'blur(2px)',
					}}
				/>
			</AbsoluteFill>

			{/* Text Layer */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '40px',
					zIndex: 20,
				}}
			>
				{/* 0:00-0:02: RAÚL BUTACI */}
				<Sequence from={0} durationInFrames={60}>
					<div
						style={{
							fontSize: 72,
							fontWeight: 900,
							color: '#FFFFFF',
							textAlign: 'center',
							letterSpacing: '2px',
							textTransform: 'uppercase',
							textShadow: '0 4px 12px rgba(0,0,0,0.8)',
							opacity: 1,
							animation: 'fadeInScale 0.6s ease-out forwards',
						}}
					>
						RAÚL BUTACI
					</div>
				</Sequence>

				{/* 0:02-0:04: CANDIDATO AL PODIO (Power Text) */}
				<Sequence from={60} durationInFrames={60}>
					<PowerText />
				</Sequence>

				{/* 0:04-0:06: UTMB 2026 */}
				<Sequence from={120} durationInFrames={60}>
					<div
						style={{
							fontSize: 64,
							fontWeight: 700,
							color: '#FF8C00',
							textAlign: 'center',
							letterSpacing: '1px',
							textShadow: '0 4px 12px rgba(0,0,0,0.8)',
							textTransform: 'uppercase',
						}}
					>
						UTMB 2026
					</div>
				</Sequence>

				{/* 0:06-0:09: EL AUDIO QUE ENVIÓ ANTES DE LA LARGADA */}
				<Sequence from={180} durationInFrames={90}>
					<div
						style={{
							fontSize: 36,
							fontWeight: 600,
							color: '#FFFFFF',
							textAlign: 'center',
							letterSpacing: '1px',
							textShadow: '0 4px 12px rgba(0,0,0,0.8)',
							lineHeight: 1.3,
							maxWidth: '90%',
						}}
					>
						EL AUDIO QUE ENVIÓ
						<br />
						ANTES DE LA LARGADA
					</div>
				</Sequence>
			</AbsoluteFill>

			{/* Audio */}
			<Audio src={staticFile('raul-butaci-audio-trimmed.ogg')} />

			{/* Closing Credits (Last 2 seconds) */}
			<Sequence from={Math.max(0, durationInFrames - 60)} durationInFrames={60}>
				<AbsoluteFill
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 30,
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
							fontSize: 52,
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
							letterSpacing: '0.5px',
							lineHeight: 1.4,
							maxWidth: '90%',
						}}
					>
						SEGUÍ SU CAMINO EN EL UTMB
						<br />
						<br />
						SEGUINOS PARA SEGUIR LA CARRERA
					</div>
				</AbsoluteFill>
			</Sequence>

			<style>{`
				@keyframes fadeInScale {
					from {
						opacity: 0;
						transform: scale(0.8);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
			`}</style>
		</AbsoluteFill>
	);
};

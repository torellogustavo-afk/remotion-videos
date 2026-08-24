#!/usr/bin/env node

import {chromium} from 'playwright';
import {spawn} from 'child_process';
import {createWriteStream, existsSync, mkdirSync} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import http from 'http';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ffmpegPath = '/home/user/remotion-videos/node_modules/ffmpeg-static/ffmpeg';
const framesDir = '/tmp/remotion-frames';
const FPS = 30;
const DURATION_FRAMES = 3600; // 120 seconds at 30 fps
const WIDTH = 1080;
const HEIGHT = 1920;

// Cleanup frames directory
if (existsSync(framesDir)) {
	spawn('rm', ['-rf', framesDir]).on('close', () => {
		mkdirSync(framesDir, {recursive: true});
	});
} else {
	mkdirSync(framesDir, {recursive: true});
}

async function startServer() {
	const app = express();
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

	return new Promise((resolve) => {
		const server = http.createServer(app);
		server.listen(3456, () => {
			console.log('✓ Server started on http://localhost:3456');
			resolve(server);
		});
	});
}

async function captureFrames() {
	console.log('🎥 Starting frame capture...');

	const browser = await chromium.launch({
		executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
		headless: true,
	});

	const page = await browser.newPage({
		viewport: {width: WIDTH, height: HEIGHT},
	});

	// Load the Remotion preview page
	console.log('📄 Loading Remotion preview...');
	await page.goto('http://localhost:3456/src/index.tsx', {
		waitUntil: 'networkidle',
	});

	await page.waitForSelector('[data-remotion-composition="RaulButaciUTMB"]', {
		timeout: 30000,
	}).catch(() => {
		console.log('Note: Composition selector not found, proceeding anyway...');
	});

	// Wait for the preview to be fully loaded
	await page.waitForTimeout(2000);

	console.log('📹 Capturing frames...');

	// Capture frames
	for (let frame = 0; frame < DURATION_FRAMES; frame++) {
		// Update frame number (if the preview has frame control)
		await page.evaluate((f) => {
			window.__remotionFrame = f;
		}, frame);

		// Small delay to ensure frame is rendered
		if (frame % 10 === 0) {
			await page.waitForTimeout(50);
		}

		// Take screenshot
		const filename = path.join(framesDir, `frame-${String(frame).padStart(6, '0')}.png`);
		await page.screenshot({path: filename});

		if ((frame + 1) % 100 === 0) {
			process.stdout.write(`\r  Progress: ${frame + 1}/${DURATION_FRAMES} frames`);
		}
	}

	console.log(`\n✓ All ${DURATION_FRAMES} frames captured`);

	await browser.close();
}

async function createVideo() {
	return new Promise((resolve, reject) => {
		console.log('🎬 Creating video from frames...');

		const pattern = path.join(framesDir, 'frame-%06d.png');
		const outputPath = path.join(__dirname, 'raul-butaci-utmb-2026.mp4');

		const ffmpegArgs = [
			'-y', // Overwrite output file
			'-framerate', String(FPS),
			'-i', pattern,
			'-i', path.join(__dirname, 'public/raul-butaci-audio-trimmed.ogg'),
			'-c:v', 'libx264',
			'-pix_fmt', 'yuv420p',
			'-b:v', '8M',
			'-c:a', 'aac',
			'-b:a', '192k',
			'-shortest',
			outputPath,
		];

		const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs);

		ffmpegProcess.stdout.on('data', (data) => {
			process.stdout.write(data.toString());
		});

		ffmpegProcess.stderr.on('data', (data) => {
			const text = data.toString();
			if (text.includes('frame=') || text.includes('time=')) {
				process.stdout.write(`\r${text.split('\\n')[0]}`);
			}
		});

		ffmpegProcess.on('close', (code) => {
			if (code === 0) {
				console.log('\n✓ Video created successfully');
				resolve(outputPath);
			} else {
				reject(new Error(`FFmpeg exited with code ${code}`));
			}
		});

		ffmpegProcess.on('error', reject);
	});
}

async function main() {
	try {
		console.log('🎬 Raúl Butaci UTMB Video Renderer');
		console.log('===================================');

		// Start server
		const server = await startServer();
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Capture frames
		await captureFrames();

		// Create video
		const outputPath = await createVideo();

		// Cleanup
		console.log('🧹 Cleaning up...');
		server.close();
		spawn('rm', ['-rf', framesDir]).on('close', () => {
			console.log(`\n✅ Video saved to: ${outputPath}`);
			process.exit(0);
		});

	} catch (error) {
		console.error('\n❌ Error:', error.message);
		process.exit(1);
	}
}

main();

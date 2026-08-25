#!/usr/bin/env node

import {chromium} from 'playwright';
import {spawn} from 'child_process';
import {existsSync, statSync} from 'fs';
import {mkdir, rm} from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ffmpegPath = '/home/user/remotion-videos/node_modules/ffmpeg-static/ffmpeg';
const framesDir = '/tmp/remotion-frames';
const FPS = 30;
const DURATION_FRAMES = 3600; // 120 seconds at 30 fps
const DURATION_SECONDS = DURATION_FRAMES / FPS;
const WIDTH = 1080;
const HEIGHT = 1920;

console.log('🎬 Raúl Butaci UTMB Video Renderer');
console.log('===================================');

async function waitForServer() {
	console.log('⏳ Waiting for preview server to start...');
	let attempts = 0;
	const maxAttempts = 120;
	const ports = [3000, 3001, 5173];

	while (attempts < maxAttempts) {
		for (const port of ports) {
			try {
				const response = await fetch(`http://localhost:${port}`);
				if (response.ok) {
					console.log(`✓ Server is ready on port ${port}`);
					globalThis.serverPort = port;
					return true;
				}
			} catch (error) {
				// Server not ready yet
			}
		}
		attempts++;
		await new Promise(r => setTimeout(r, 500));
	}

	throw new Error('Server did not start in time');
}

async function renderVideo() {
	let previewProcess = null;
	let browser = null;

	try {
		// Start preview server
		console.log('1️⃣  Starting Remotion preview server...');
		previewProcess = spawn('npm', ['start', '--', '--force-new'], {
			cwd: __dirname,
			stdio: ['ignore', 'pipe', 'pipe'],
		});

		// Wait for server (may be on port 3001 if 3000 is taken)
		await waitForServer();

		// Create frames directory
		console.log('2️⃣  Preparing render...');
		if (existsSync(framesDir)) {
			await rm(framesDir, {recursive: true, force: true});
		}
		await mkdir(framesDir, {recursive: true});

		// Launch browser
		console.log('🌐 Launching browser...');
		browser = await chromium.launch({
			executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
			headless: true,
		});

		const page = await browser.newPage({
			viewport: {width: WIDTH, height: HEIGHT},
		});

		// Navigate to preview
		const port = globalThis.serverPort || 3001;
		console.log(`📄 Loading Remotion preview on port ${port}...`);
		await page.goto(`http://localhost:${port}`, {
			waitUntil: 'networkidle',
			timeout: 30000,
		});

		// Wait for Remotion to be ready
		await page.waitForTimeout(3000);

		// Capture frames individually
		console.log(`3️⃣  Capturing all ${DURATION_FRAMES} frames...`);

		for (let frame = 0; frame < DURATION_FRAMES; frame++) {
			// Evaluate frame in page context
			await page.evaluate((f) => {
				window.__remotionFrame = f;
			}, frame);

			// Minimal delay for render
			if (frame % 30 === 0) {
				await page.waitForTimeout(10);
			}

			// Screenshot
			const filename = path.join(framesDir, `frame-${String(frame).padStart(6, '0')}.png`);
			await page.screenshot({path: filename});

			if ((frame + 1) % 300 === 0) {
				process.stdout.write(`\r  Progress: ${frame + 1}/${DURATION_FRAMES} frames captured`);
			}
		}

		console.log(`\n  ✓ Captured all ${DURATION_FRAMES} frames`);

		// Close browser
		await browser.close();
		browser = null;

		// Create video from frames
		console.log('4️⃣  Creating video from frames...');
		const outputPath = path.join(__dirname, 'raul-butaci-utmb-2026.mp4');

		return await new Promise((resolve, reject) => {
			const pattern = path.join(framesDir, 'frame-%06d.png');

			const ffmpegArgs = [
				'-y', // Overwrite
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

			const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

			let progress = '';
			ffmpeg.stderr.on('data', (data) => {
				progress = data.toString();
				if (progress.includes('frame=') || progress.includes('time=')) {
					const match = progress.match(/frame=\s*(\d+)/);
					if (match) {
						const currentFrame = parseInt(match[1]);
						process.stdout.write(`\r  Progress: ${currentFrame}/${DURATION_FRAMES} frames encoded`);
					}
				}
			});

			ffmpeg.on('close', (code) => {
				if (code === 0) {
					console.log('\n  ✓ Video created successfully');
					resolve(outputPath);
				} else {
					reject(new Error(`FFmpeg exited with code ${code}`));
				}
			});

			ffmpeg.on('error', reject);
		});

	} finally {
		// Cleanup
		console.log('5️⃣  Cleaning up...');

		if (browser) {
			await browser.close().catch(() => {});
		}

		if (previewProcess) {
			previewProcess.kill('SIGTERM');
		}

		// Delete frames
		if (existsSync(framesDir)) {
			await rm(framesDir, {recursive: true, force: true}).catch(() => {});
		}
	}
}

async function main() {
	try {
		const outputPath = await renderVideo();

		// Show results
		const stats = statSync(outputPath);
		const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

		console.log('\n✅ RENDER COMPLETE!');
		console.log('========================================');
		console.log(`📽️  File: ${path.basename(outputPath)}`);
		console.log(`📊 Size: ${sizeMB} MB`);
		console.log(`⏱️  Duration: ${DURATION_SECONDS} seconds (120 seconds max)`);
		console.log(`📹 Resolution: ${WIDTH}x${HEIGHT} (9:16 vertical)`);
		console.log(`🎬 Frames: ${DURATION_FRAMES} @ ${FPS} fps`);
		console.log(`🎵 Audio: raul-butaci-audio-trimmed.ogg (115 seconds)`);
		console.log('========================================\n');
		process.exit(0);
	} catch (error) {
		console.error('\n❌ Error:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

main();

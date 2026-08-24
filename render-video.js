#!/usr/bin/env node

const path = require('path');
const { renderMedia } = require('@remotion/renderer');

const projectRoot = __dirname;
const srcPath = path.join(projectRoot, 'dist');

async function renderVideo() {
	try {
		console.log('Starting video render...');
		console.log('Project root:', projectRoot);
		console.log('Checking src directory...');

		// First, build the TypeScript
		const { execSync } = require('child_process');
		console.log('Building TypeScript...');
		try {
			execSync('npm run build 2>&1', { cwd: projectRoot, stdio: 'pipe' });
		} catch (e) {
			// npm run build is for rendering, we need to transpile manually
			console.log('Using webpack/esbuild to bundle...');
		}

		// For now, let's use a simpler approach with staticFile resolution
		const result = await renderMedia({
			composition: 'RaulButaciUTMB',
			serveUrl: 'http://localhost:3000', // Will be served dynamically
			outputLocation: path.join(projectRoot, 'raul-butaci-utmb-2026.mp4'),
			inputProps: {},
			codec: 'h264',
			pixelFormat: 'yuv420p',
			audioCodec: 'aac',
			videoBitrate: '8M',
			audioBitrate: '192k',
			timeoutInMilliseconds: 120000,
		});

		console.log('✓ Render completed successfully');
		console.log('Output file:', result);
	} catch (error) {
		console.error('❌ Render failed:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

renderVideo();

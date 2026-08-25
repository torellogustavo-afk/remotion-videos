#!/usr/bin/env node

import {renderMedia} from '@remotion/renderer';
import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import {chromium} from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
	const app = express();

	// Serve static files
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

	// Serve TypeScript files (they should be transpiled by now)
	app.get('*', (req, res) => {
		const filePath = path.join(__dirname, 'src', req.path);
		res.sendFile(filePath, (err) => {
			if (err) {
				// Return a basic HTML that can load remotion
				res.send(`<!DOCTYPE html><html><body>File not found</body></html>`);
			}
		});
	});

	return new Promise((resolve) => {
		const server = app.listen(3000, () => {
			console.log('✓ Server started on http://localhost:3000');
			resolve(server);
		});
	});
}

async function render() {
	try {
		console.log('🎬 Starting Raúl Butaci UTMB video render');
		console.log('========================================');

		// Start server
		const server = await startServer();

		// Give server time to start
		await new Promise(resolve => setTimeout(resolve, 1000));

		console.log('📹 Starting render process...');

		const outputPath = path.join(__dirname, 'raul-butaci-utmb-2026.mp4');

		// Use Playwright's Chromium
		const browser = await chromium.launch({
			executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
		});

		console.log('✓ Browser launched');

		try {
			const result = await renderMedia({
				composition: 'RaulButaciUTMB',
				serveUrl: 'http://localhost:3000',
				outputLocation: outputPath,
				inputProps: {},
				codec: 'h264',
				pixelFormat: 'yuv420p',
				audioCodec: 'aac',
				videoBitrate: '8M',
				audioBitrate: '192k',
				onProgress: ({progress, doneInMs}) => {
					process.stdout.write(
						`\r📊 Progress: ${(progress * 100).toFixed(1)}% | ${(doneInMs / 1000).toFixed(1)}s elapsed`
					);
				},
			});

			console.log('\n✓ Render completed!');
			console.log('Output:', result);

			const fs = await import('fs');
			const stats = fs.statSync(result);
			console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

		} finally {
			await browser.close();
		}

		server.close();
		process.exit(0);

	} catch (error) {
		console.error('\n❌ Error:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

render();

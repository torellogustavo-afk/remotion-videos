import { renderMedia } from '@remotion/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromiumPath = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';

async function render() {
	try {
		console.log('Starting video render with pre-installed Chromium...');
		console.log('Chromium path:', chromiumPath);

		// Verify Chromium exists
		if (!fs.existsSync(chromiumPath)) {
			throw new Error(`Chromium not found at ${chromiumPath}`);
		}

		console.log('✓ Chromium found');

		const outputPath = path.join(__dirname, 'raul-butaci-utmb-2026.mp4');

		console.log('Rendering composition: RaulButaciUTMB');
		console.log('Output: ' + outputPath);

		const result = await renderMedia({
			composition: 'RaulButaciUTMB',
			serveUrl: 'http://localhost:3000',
			outputLocation: outputPath,
			inputProps: {},
			browserExecutable: chromiumPath,
			codec: 'h264',
			pixelFormat: 'yuv420p',
			audioCodec: 'aac',
			videoBitrate: '8M',
			audioBitrate: '192k',
			onProgress: ({ progress, doneInMs }) => {
				process.stdout.write(
					`\r📹 Progress: ${(progress * 100).toFixed(1)}% - Time: ${(doneInMs / 1000).toFixed(1)}s`,
				);
			},
		});

		console.log('\n✓ Render completed successfully!');
		console.log('Output file:', result);

		// Get file info
		const stats = fs.statSync(result);
		console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
	} catch (error) {
		console.error('\n❌ Render failed:', error.message);
		process.exit(1);
	}
}

render();

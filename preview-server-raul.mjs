#!/usr/bin/env node

import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import * as vite_module from 'vite';
const vite = vite_module;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
	const app = express();

	// Create Vite dev server for TypeScript transpilation
	const viteServer = await vite.createServer({
		server: {middlewareMode: true},
		root: __dirname,
		appType: 'custom',
		define: {
			__DEV_MODE__: true,
		},
	});

	// Use Vite's middleware for HMR and transpilation
	app.use(viteServer.middlewares);

	// Serve static files
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

	// Serve the Raúl entry point as a module
	app.get('/', async (req, res) => {
		try {
			let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Remotion - RaulButaciUTMB</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/raul-entry.tsx"></script>
  </body>
</html>
			`;
			html = await viteServer.transformIndexHtml('/', html);
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
		} catch (e) {
			viteServer.ssrFixStacktrace(e);
			res.status(500).end(e.stack);
		}
	});

	return {app, viteServer};
}

async function start() {
	try {
		const {app, viteServer} = await createServer();

		const server = app.listen(3456, () => {
			console.log('✓ Raúl preview server running on http://localhost:3456');
			console.log('  Entry point: src/raul-entry.tsx');
			console.log('  Composition: RaulButaciUTMB (1080x1920, 2610 frames @ 30fps)');
			console.log('Press Ctrl+C to stop...');
		});

		// Graceful shutdown
		process.on('SIGINT', async () => {
			await viteServer.close();
			server.close();
			process.exit(0);
		});

	} catch (error) {
		console.error('Error starting server:', error.message);
		process.exit(1);
	}
}

start();

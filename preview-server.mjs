#!/usr/bin/env node

import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import vite from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
	const app = express();

	// Create Vite dev server for TypeScript transpilation
	const viteServer = await vite.createServer({
		server: {middlewareMode: true},
		root: __dirname,
		appType: 'custom',
	});

	// Use Vite's middleware for HMR and transpilation
	app.use(viteServer.middlewares);

	// Serve static files
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

	// Catch-all for SPA
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'src', 'index.tsx'), (err) => {
			if (err) {
				res.status(404).send('Not found');
			}
		});
	});

	return {app, viteServer};
}

async function start() {
	try {
		const {app, viteServer} = await createServer();

		const server = app.listen(3456, () => {
			console.log('✓ Preview server running on http://localhost:3456');
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

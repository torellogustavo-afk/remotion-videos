import express from 'express';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

ffmpeg.setFfmpegPath(ffmpegStatic);

const app = express();
const PORT = 3333;

// Serve the built TypeScript files
app.use(express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve a basic HTML that loads Remotion
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Remotion Renderer</title>
      <script src="/node_modules/react/index.js"></script>
      <script src="/node_modules/react-dom/index.js"></script>
    </head>
    <body>
      <div id="root"></div>
      <script>
        console.log('Server ready');
      </script>
    </body>
    </html>
  `);
});

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log('Ready to render...');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});

export { server, app };

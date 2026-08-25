#!/usr/bin/env node

const { render } = require('remotion');
const path = require('path');

async function main() {
  console.log('🎬 Starting Remotion render...');

  try {
    await render({
      composition: 'BoutiquePresentationVideo',
      fps: 30,
      height: 1080,
      width: 1920,
      outputLocation: path.join(__dirname, 'out', 'BoutiquePresentationVideo.mp4'),
    });

    console.log('✅ Video rendered successfully!');
    console.log('📁 Output: out/BoutiquePresentationVideo.mp4');
  } catch (error) {
    console.error('❌ Render failed:', error);
    process.exit(1);
  }
}

main();

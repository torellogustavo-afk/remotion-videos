#!/usr/bin/env node

const { render } = require('remotion');
const path = require('path');

const main = async () => {
  console.log('🎬 Rendering premium boutique presentation video...');

  try {
    const outputPath = path.join(__dirname, 'output.mp4');

    const result = await render({
      composition: 'BoutiquePresentationVideo',
      serveUrl: 'http://localhost:3000',
      codec: 'h264',
      crf: 18,
      width: 1920,
      height: 1080,
      fps: 30,
      outputLocation: outputPath,
      onProgress: (progress) => {
        console.log(`Progress: ${Math.round(progress.renderedFrames)}/${progress.totalFrames}`);
      },
    });

    console.log('✅ Video rendered successfully!');
    console.log('📁 Output:', outputPath);
    return result;
  } catch (error) {
    console.error('❌ Rendering failed:', error);
    process.exit(1);
  }
};

main();

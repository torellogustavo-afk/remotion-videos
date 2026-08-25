#!/usr/bin/env node

/**
 * Generate MP4 from Remotion composition using server + FFmpeg
 * This uses Remotion's official server infrastructure to render frames
 * and combines them with ffmpeg (no Playwright/screenshots)
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function startRemotionServer() {
  console.log('🚀 Starting Remotion server...');
  try {
    // Start remotion preview server
    exec('npx remotion preview src/root.tsx', {
      cwd: __dirname,
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('✅ Server started on http://localhost:3000');
    return true;
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    return false;
  }
}

async function generateVideoWithFFmpeg() {
  console.log('🎬 Generating video with FFmpeg...');

  try {
    // Use Remotion's render API via HTTP
    // This is the official Remotion way to generate without browser download issues
    const cmd = `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npx remotion render src/root.tsx BoutiquePresentationVideo out/BoutiquePresentationVideo.mp4 --browser-executable=/opt/pw-browsers/chromium --disable-validate-schema`;

    const { stdout, stderr } = await execAsync(cmd);

    console.log('✅ FFmpeg generation complete');
    console.log(stdout);
    return true;
  } catch (error) {
    console.error('❌ FFmpeg generation failed:', error.message);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

async function main() {
  console.log('📹 Boutique Presentation Video Generator');
  console.log('========================================\n');

  // Create output directory
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }

  try {
    const success = await generateVideoWithFFmpeg();

    if (success && fs.existsSync('out/BoutiquePresentationVideo.mp4')) {
      const stats = fs.statSync('out/BoutiquePresentationVideo.mp4');
      console.log(`\n✅ Video generated successfully!`);
      console.log(`📁 Location: out/BoutiquePresentationVideo.mp4`);
      console.log(`📊 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log('\n❌ Video generation failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Generation error:', error);
    process.exit(1);
  }
}

main();

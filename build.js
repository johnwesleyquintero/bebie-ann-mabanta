const fs = require('fs');
const path = require('path');

const distDir = 'dist';

// Helper function to remove a directory recursively
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

// Helper function to copy a file
function copyFile(source, destination) {
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(source, destination);
}

// Helper function to copy a directory recursively
function copyDir(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDir(sourcePath, destinationPath);
    } else {
      copyFile(sourcePath, destinationPath);
    }
  }
}

// Remove the dist directory
removeDir(distDir);

// Create the dist directory
fs.mkdirSync(distDir, { recursive: true });

// Copy files
copyFile('src/index.html', path.join(distDir, 'index.html'));
copyFile('src/styles.css', path.join(distDir, 'styles.css'));
copyFile('src/script.js', path.join(distDir, 'script.js'));
  const netlifyTomlSource = 'src/netlify.toml';
  const netlifyTomlDestination = path.join(distDir, 'netlify.toml');
  if (fs.existsSync(netlifyTomlSource)) {
    copyFile(netlifyTomlSource, netlifyTomlDestination);
  } else {
    console.error('netlify.toml not found in src directory.');
  }

// Copy assets directory
copyDir('assets', path.join(distDir, 'assets'));

console.log('Build complete!');
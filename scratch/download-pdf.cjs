const https = require('https');
const fs = require('fs');
const path = require('path');

const fileId = '1g2uZF0UTvXazXSVRXucistDMEa-DYaqB';
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
const destDir = path.join(__dirname, '..', 'public', 'documents');
const destPath = path.join(destDir, 'first-learning-brains-newsletter.pdf');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, destPath) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting (status ${res.statusCode}) to: ${res.headers.location}`);
      download(res.headers.location, destPath);
      return;
    }

    if (res.statusCode !== 200) {
      console.error(`Failed to download, status code: ${res.statusCode}`);
      return;
    }

    const fileStream = fs.createWriteStream(destPath);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Download completed successfully!');
      const stats = fs.statSync(destPath);
      console.log(`File size: ${stats.size} bytes`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading file: ${err.message}`);
  });
}

console.log(`Starting download from ${url}...`);
download(url, destPath);

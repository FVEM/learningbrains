const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'learning-brains-logo-transparent-cropped.png');
const outputPath = path.join(__dirname, '..', 'public', 'social-preview.png');

async function createSocialPreview() {
    try {
        // 1. First get the dimensions of the input logo
        const metadata = await sharp(inputPath).metadata();

        // 2. We want the logo to be about 800px wide (leaving 200px padding on each side for a 1200px total width)
        const targetWidth = 800;
        const scaleFactor = targetWidth / metadata.width;
        const targetHeight = Math.round(metadata.height * scaleFactor);

        // 3. Create the 1200x630 white background and composite the resized logo into the center
        await sharp({
            create: {
                width: 1200,
                height: 630,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background
            }
        })
            .composite([
                {
                    input: await sharp(inputPath).resize(targetWidth).toBuffer(),
                    gravity: 'center' // Center the logo on the white background
                }
            ])
            .png()
            .toFile(outputPath);

        console.log('Social preview image successfully created at:', outputPath);
    } catch (error) {
        console.error('Error creating image:', error);
    }
}

createSocialPreview();

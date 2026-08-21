const fs = require('fs');
const { createCanvas } = require('canvas');

function createBanner(filename, text, color1, color2) {
    const width = 800;
    const height = 500;
    
    // Note: requires `npm install canvas`
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`);
    gradient.addColorStop(1, `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    ctx.font = '45px Georgia, serif';
    ctx.fillStyle = '#ffffff';
    
    const words = text.split(' ');
    const lines = [];
    let line = '';
    
    for (let i = 0; i < words.length; i++) {
        if ((line + words[i]).length > 20) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line += words[i] + ' ';
        }
    }
    lines.push(line);
    
    let yText = 150;
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 50, yText);
        yText += 60;
    }
    
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filename, buffer);
}

createBanner("assets/images/blog_sightreading.jpg", "Sight-Reading Secrets for Pianists", [15, 118, 110], [17, 94, 89]);
createBanner("assets/images/blog_metronome.jpg", "Making Friends with the Metronome", [190, 24, 93], [159, 18, 57]);

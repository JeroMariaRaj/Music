const fs = require('fs');
const { createCanvas } = require('canvas');

function createBanner(filename, text, color1, color2) {
    const width = 1200;
    const height = 630;
    
    // Note: requires `npm install canvas`
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`);
    gradient.addColorStop(1, `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw simple decorative lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 110);
    ctx.lineTo(300, 110);
    ctx.stroke();
    
    // Draw small category text
    ctx.font = '30px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.fillText('SYMPHONY BLOG', 100, 300);
    
    // Draw main text
    ctx.font = '60px Georgia, serif';
    ctx.fillStyle = '#ffffff';
    
    const words = text.split(' ');
    const lines = [];
    let line = '';
    
    for (let i = 0; i < words.length; i++) {
        if ((line + words[i]).length > 25) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line += words[i] + ' ';
        }
    }
    lines.push(line);
    
    let yText = 350;
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 100, yText);
        yText += 80;
    }
    
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filename, buffer);
}

createBanner("assets/images/blog_piano.jpg", "Mastering the Piano: 5 Essential Exercises", [185, 28, 28], [127, 29, 29]);
createBanner("assets/images/blog_violin.jpg", "Choosing Your First Violin: A Buyer's Guide", [234, 179, 8], [161, 98, 7]);
createBanner("assets/images/blog_theory.jpg", "Demystifying Music Theory: Where to Start", [15, 23, 42], [30, 41, 59]);
createBanner("assets/images/blog_showcase.jpg", "Highlights from the Winter Showcase 2023", [67, 56, 202], [49, 46, 129]);

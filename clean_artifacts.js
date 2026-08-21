const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Fix footers
    content = content.replace(/<a href="(register|blog-details)\.html"([^>]*)><i class="fab fa-/g, '<a href="#"$2><i class="fab fa-');
    content = content.replace(/<li><a href="(register|blog-details)\.html"([^>]*)>(Piano Lessons|Guitar Lessons|Vocal Training|Violin Lessons|Drums &amp; Percussion|Drums & Percussion)<\/a><\/li>/g, '<li><a href="#"$2>$3</a></li>');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned ${file}`);
    }
});

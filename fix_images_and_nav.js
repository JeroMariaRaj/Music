const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const jsFiles = fs.readdirSync(path.join(dir, 'assets', 'js')).filter(f => f.endsWith('.js')).map(f => path.join(dir, 'assets', 'js', f));

// Static reliable Unsplash images for music
const images = {
    guitar: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    piano: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=800&q=80',
    violin: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
    vocal: 'https://images.unsplash.com/photo-1516280440502-859846b049d5?auto=format&fit=crop&w=800&q=80',
    singer: 'https://images.unsplash.com/photo-1516280440502-859846b049d5?auto=format&fit=crop&w=800&q=80',
    tabla: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80',
    drums: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80',
    concert: 'https://images.unsplash.com/photo-1540039155732-d674149955df?auto=format&fit=crop&w=800&q=80',
    music: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    default: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80'
};

function replaceImages(content) {
    return content.replace(/https:\/\/source\.unsplash\.com\/random\/(?:[0-9x]+)\/\?([a-zA-Z,]+)/g, (match, query) => {
        const q = query.toLowerCase();
        if (q.includes('guitar')) return images.guitar;
        if (q.includes('piano') || q.includes('keys')) return images.piano;
        if (q.includes('violin') || q.includes('orchestra')) return images.violin;
        if (q.includes('vocal') || q.includes('singer')) return images.vocal;
        if (q.includes('tabla') || q.includes('percussion') || q.includes('drums')) return images.tabla;
        if (q.includes('concert')) return images.concert;
        if (q.includes('music')) return images.music;
        return images.default;
    });
}

// 1. Replace images in JS and HTML
[...files, ...jsFiles].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    content = replaceImages(content);
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated images in ${file}`);
    }
});

// 2. Fix Login and Register Nav
const minimalHeader = `
    <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-2 text-2xl font-serif font-bold text-primary">
                <i class="fas fa-music"></i>
                <span>Symphony</span>
            </a>
            <div class="flex items-center space-x-4">
                <a href="index.html" class="hidden sm:block hover:text-primary transition-colors font-medium">Home</a>
                <button id="themeToggle" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" title="Toggle Theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button id="rtlToggle" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors font-bold text-sm" title="Toggle RTL">
                    RTL
                </button>
            </div>
        </div>
    </header>
`;

['login.html', 'register.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the full header with minimal header
    content = content.replace(/<header class="sticky top-0 z-50.*?<\/header>/s, minimalHeader.trim());
    
    // Also remove any standalone floating theme toggles from these pages to avoid duplicates
    content = content.replace(/<div class="absolute top-4 right-4">[\s\S]*?<\/div>\s*<main/s, '<main');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated nav in ${file}`);
});

// 3. Fix buttons: add href="#" to anchor buttons if missing, or fix button onclicks
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix any "Book Trial" buttons missing the onclick
    content = content.replace(/<button([^>]*)>([^<]*Book[^<]*Trial[^<]*)<\/button>/gi, (match, attrs, text) => {
        if (!attrs.includes('onclick') && !attrs.includes('type="submit"')) {
            return `<button${attrs} onclick="document.getElementById('trialModal').classList.remove('hidden')">${text}</button>`;
        }
        return match;
    });

    // Fix empty hrefs in links (preventing them from doing nothing or throwing errors)
    content = content.replace(/href=""/g, 'href="#"');
    
    fs.writeFileSync(file, content, 'utf8');
});

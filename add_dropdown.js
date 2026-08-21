const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dropdownHTML = `
                <div class="relative group">
                    <button class="flex items-center space-x-1 hover:text-primary transition-colors font-medium h-10">
                        <span>Home</span>
                        <i class="fas fa-chevron-down text-[10px]"></i>
                    </button>
                    <!-- Wrapper with padding to bridge the hover gap -->
                    <div class="absolute left-0 top-full pt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div class="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <a href="index.html" class="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">Home 1</a>
                            <a href="home-2.html" class="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">Home 2</a>
                        </div>
                    </div>
                </div>`.trim();

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace <a href="index.html" ...>Home</a> with dropdown
    content = content.replace(/<a href="index\.html"[^>]*>Home<\/a>/g, dropdownHTML);
    
    if (file === 'home-2.html') {
        content = content.replace(/<a href="home-2\.html"[^>]*>Product<\/a>/g, dropdownHTML);
        content = content.replace(/<a href="index\.html"[^>]*>Academy<\/a>/g, '');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated navbar in ${file}`);
    }
});

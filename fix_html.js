const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const standardHeader = fs.readFileSync('header.txt', 'utf8');
const standardFooter = fs.readFileSync('footer.txt', 'utf8');
const standardModal = fs.readFileSync('modal.txt', 'utf8');

const headTemplate = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        primary: '#b91c1c',
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif { font-family: 'Playfair Display', serif; }
    </style>
`;

const standardScripts = `
    <script src="assets/js/data.js"></script>
    <script src="assets/js/main.js"></script>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Replace <head> inner content, but keep <title>
    const titleMatch = content.match(/<title>.*?<\/title>/s);
    let title = titleMatch ? titleMatch[0] : '<title>Symphony Music Academy</title>';
    content = content.replace(/<head>.*?<\/head>/s, `<head>\n${title}\n${headTemplate}</head>`);
    
    // 2. Replace <header>
    if (content.match(/<header.*?>.*?<\/header>/s)) {
        content = content.replace(/<header.*?>.*?<\/header>/s, standardHeader);
    } else {
        // insert after <body>
        content = content.replace(/<body.*?>/, match => match + '\n' + standardHeader);
    }
    
    // 3. Replace <footer>
    if (content.match(/<footer.*?>.*?<\/footer>/s)) {
        content = content.replace(/<footer.*?>.*?<\/footer>/s, standardFooter);
    } else {
        // insert before modal or </body>
    }
    
    // 4. Ensure Modal is present (for Book Free Trial)
    if (!content.includes('id="trialModal"')) {
        content = content.replace(/<\/body>/, `\n${standardModal}\n</body>`);
    }

    // 5. Replace scripts before </body>
    content = content.replace(/<script src="assets\/js\/data\.js"><\/script>.*?<\/body>/s, `${standardScripts}\n</body>`);
    if (!content.includes('assets/js/main.js')) {
        content = content.replace(/<\/body>/, `${standardScripts}\n</body>`);
    }
    
    // Remove duplicate scripts if any
    content = content.replace(/<script src="assets\/js\/data\.js"><\/script>\s*<script src="assets\/js\/main\.js"><\/script>\s*<script src="assets\/js\/data\.js"><\/script>\s*<script src="assets\/js\/main\.js"><\/script>/s, standardScripts);

    // Make body standard
    content = content.replace(/<body[^>]*>/, '<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});

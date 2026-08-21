const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove all null bytes
    content = content.replace(/\x00/g, '');
    
    // Fix layout for login/register
    if (file === 'login.html' || file === 'register.html') {
        content = content.replace(/<body class="[^"]*">/, '<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 flex flex-col min-h-screen">');
        if (!content.includes('<main class="flex-grow flex items-center justify-center py-12">')) {
            content = content.replace(/<div class="w-full max-w-md/s, '<main class="flex-grow flex items-center justify-center py-12">\n<div class="w-full max-w-md');
            content = content.replace(/<\/div>\s*<script src="assets\/js\/data\.js">/s, '</div>\n</main>\n<script src="assets/js/data.js">');
        }
    }

    // Fix dashboards
    if (file === 'student-dashboard.html' || file === 'admin-dashboard.html') {
        content = content.replace(/<body class="[^"]*">/, '<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 flex h-screen overflow-hidden">');
        content = content.replace(/<footer class="bg-gray-900.*?<\/footer>/s, '');
        content = content.replace(/<div id="trialModal".*?<\/div>\s*<\/div>/s, '');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned ${file}`);
});

const fs = require('fs');

const files = fs.readdirSync('.');

files.forEach(file => {
    if (file.startsWith('blog-') && file.endsWith('.html') && file !== 'blog.html') {
        let content = fs.readFileSync(file, 'utf-8');
        
        // Find "<!-- Author Profile -->"
        const authorIndex = content.indexOf('<!-- Author Profile -->');
        if (authorIndex !== -1) {
            // Find the first </article> after author block
            const firstArticleEnd = content.indexOf('</article>', authorIndex);
            
            // Find the <!-- Sidebar -->
            const sidebarIndex = content.indexOf('<!-- Sidebar -->');
            
            if (firstArticleEnd !== -1 && sidebarIndex !== -1) {
                // The correct content should just be </article> right before <!-- Sidebar -->
                // Wait, no. The correct content is we want ONE </article> to close the main article block.
                // Let's replace everything between the end of Author Profile's div and <!-- Sidebar -->
                // with just \n        </article>\n\n        <!-- Sidebar -->
                
                // Author profile div ends around here. Let's just find "View all posts by Elena</a>\n                </div>\n            </div>"
                // Actually, let's just use string replace using a regex.
                // We want to delete from `<article class="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">` 
                // up to the `</article>` just before `<!-- Sidebar -->`.
                
                const regex = /<\/article>\s*<article class="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">[\s\S]*?<\/article>\s*<\/div>\s*<\/div>\s*<\/article>/g;
                
                content = content.replace(regex, '</article>');
                fs.writeFileSync(file, content, 'utf-8');
                console.log(`Fixed ${file}`);
            }
        }
    }
});

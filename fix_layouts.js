const fs = require('fs');

// Fix login and register
['login.html', 'register.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove the injected header and footer from login/register if they look bad,
    // or just wrap the content in a container that centers it.
    
    // Replace the body tag to add flex flex-col min-h-screen
    content = content.replace(/<body class="[^"]*">/, '<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 flex flex-col min-h-screen">');
    
    // Wrap the login box in a flex-grow centered container
    if (!content.includes('<main class="flex-grow flex items-center justify-center py-12">')) {
        content = content.replace(/<div class="w-full max-w-md/s, '<main class="flex-grow flex items-center justify-center py-12">\n<div class="w-full max-w-md');
        content = content.replace(/<\/div>\s*<script src="assets\/js\/data\.js">/s, '</div>\n</main>\n<script src="assets/js/data.js">');
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

// Fix dashboards
['student-dashboard.html', 'admin-dashboard.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Dashboards should not have the global header and footer inside the main body stream,
    // because they have their own sidebar and top nav.
    // Actually, looking at student-dashboard, it has a sidebar and main content.
    content = content.replace(/<body class="[^"]*">/, '<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 flex h-screen overflow-hidden">');
    
    // Wait, the header is injected into the body. Dashboards should not have the global footer or header.
    // Let's remove the global footer and modal from dashboards.
    content = content.replace(/<footer class="bg-gray-900.*?<\/footer>/s, '');
    content = content.replace(/<div id="trialModal".*?<\/div>\s*<\/div>/s, '');
    
    // The header was injected right after body? Wait, my script did:
    // `content = content.replace(/<body.*?>/, match => match + '\n' + standardHeader);`
    // Wait, in student-dashboard, it already had a <main> which is the content. I'll just remove the standardHeader.
    // Actually, the header might have replaced the original dashboard header.
    // Let me check if the original dashboard header is gone.
    fs.writeFileSync(file, content, 'utf8');
});

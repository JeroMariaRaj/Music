const fs = require('fs');

const facultyHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Faculty - Music Academy</title>
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
</head>
<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-2 text-2xl font-serif font-bold text-primary">
                <i class="fas fa-music"></i>
                <span>Symphony</span>
            </a>
            <nav class="hidden lg:flex space-x-6 items-center font-medium text-sm">
                <a href="index.html" class="hover:text-primary transition-colors">Home</a>
                <a href="about.html" class="hover:text-primary transition-colors">About</a>
                <a href="courses.html" class="hover:text-primary transition-colors">Courses</a>
                <a href="faculty.html" class="text-primary hover:text-red-800 font-bold">Faculty</a>
                <a href="schedule.html" class="hover:text-primary transition-colors">Schedule</a>
                <a href="fees.html" class="hover:text-primary transition-colors">Fees</a>
                <a href="performances.html" class="hover:text-primary transition-colors">Performances</a>
                <a href="blog.html" class="hover:text-primary transition-colors">Blog</a>
                <a href="contact.html" class="hover:text-primary transition-colors">Contact</a>
            </nav>
            <div class="hidden lg:flex items-center space-x-4">
                <button id="themeToggle" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" title="Toggle Theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button id="rtlToggle" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors font-bold text-sm" title="Toggle RTL">
                    RTL
                </button>
                <a href="login.html" class="hover:text-primary transition-colors font-medium">Login</a>
                <button class="bg-primary hover:bg-red-800 text-white px-5 py-2 rounded-full font-medium transition-colors" onclick="document.getElementById('trialModal').classList.remove('hidden')">
                    Book Free Trial
                </button>
            </div>
            <button class="lg:hidden text-2xl text-gray-700 dark:text-gray-300">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <main class="py-20">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold font-serif mb-4">Our Distinguished Faculty</h1>
                <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Learn from world-class musicians, recording artists, and passionate educators dedicated to your musical journey.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="faculty-grid">
                <!-- Populated by JS below -->
            </div>
        </div>
    </main>

    <!-- Footer placeholder, we will append it -->
    <script src="assets/js/data.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const grid = document.getElementById('faculty-grid');
            const faculty = getFaculty(); // From data.js
            faculty.forEach(member => {
                grid.innerHTML += \`
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
                        <img src="\${member.image}" alt="\${member.name}" class="w-full h-64 object-cover object-top">
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold font-serif mb-1">\${member.name}</h3>
                            <p class="text-primary font-medium text-sm mb-3">\${member.instrument} Instructor</p>
                            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">\${member.bio}</p>
                            <div class="flex justify-center space-x-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded">\${member.experience}</span>
                            </div>
                        </div>
                    </div>
                \`;
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('faculty.html', facultyHTML, 'utf8');

// Also inject the footer and modal properly using string replacement
let content = fs.readFileSync('faculty.html', 'utf8');
const footer = fs.readFileSync('footer.txt', 'utf8');
const modal = fs.readFileSync('modal.txt', 'utf8');
content = content.replace('<!-- Footer placeholder, we will append it -->', footer + '\\n' + modal);
fs.writeFileSync('faculty.html', content, 'utf8');
console.log('faculty.html generated');

const fs = require('fs');

const filename = 'student-dashboard.html';
let content = fs.readFileSync(filename, 'utf-8');

// Find where page content starts
const startIdx = content.indexOf('<div class="mb-6">');
if (startIdx !== -1) {
    // Insert start of section-overview
    content = content.substring(0, startIdx) + '<div id="section-overview" class="dashboard-section block">\n' + content.substring(startIdx);
}

// Find where the page content ends (last </div> before </main>)
const endIdx = content.lastIndexOf('</div>\n    </main>');
if (endIdx !== -1) {
    const placeholders = `
            </div>
            <!-- Placeholder Sections -->
            <div id="section-classes" class="dashboard-section hidden"><h2 class="text-2xl font-bold mb-6">My Classes</h2><div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"><i class="fas fa-book-open text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-gray-500">You are currently enrolled in 2 active classes.</p></div></div>
            <div id="section-timetable" class="dashboard-section hidden"><h2 class="text-2xl font-bold mb-6">Timetable</h2><div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"><i class="fas fa-calendar-alt text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-gray-500">Your weekly timetable will appear here.</p></div></div>
            <div id="section-assignments" class="dashboard-section hidden"><h2 class="text-2xl font-bold mb-6">Assignments</h2><div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"><i class="fas fa-tasks text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-gray-500">You have 0 pending assignments.</p></div></div>
            <div id="section-payments" class="dashboard-section hidden"><h2 class="text-2xl font-bold mb-6">Payment History</h2><div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"><i class="fas fa-file-invoice-dollar text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-gray-500">Your full payment history goes here. See the overview tab for recent payments.</p></div></div>
            <div id="section-profile" class="dashboard-section hidden"><h2 class="text-2xl font-bold mb-6">My Profile</h2><div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"><i class="fas fa-user-circle text-6xl text-gray-300 dark:text-gray-600 mb-4"></i><p class="text-gray-500">Manage your personal information and preferences.</p></div></div>
`;
    content = content.substring(0, endIdx) + placeholders + content.substring(endIdx);
}

fs.writeFileSync(filename, content, 'utf-8');

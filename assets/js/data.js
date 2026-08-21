// data.js
const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@musicacademy.com', password: 'Admin@123', role: 'admin', instrument: 'All' },
  { id: 2, name: 'Demo Student', email: 'student@musicacademy.com', password: 'Student@123', role: 'student', instrument: 'Guitar' }
];

const MOCK_COURSES = [
  { id: 1, title: 'Beginner Guitar', category: 'Guitar', level: 'Beginner', instructor: 'John Smith', price: 99, duration: '12 Weeks', classes: 24, image: 'assets/images/acoustic_guitar.jpg' },
  { id: 2, title: 'Classical Piano', category: 'Piano', level: 'Intermediate', instructor: 'Sarah Lee', price: 149, duration: '16 Weeks', classes: 32, image: 'assets/images/piano_mastery.jpg' },
  { id: 3, title: 'Vocal Masterclass', category: 'Vocal', level: 'Advanced', instructor: 'Emily Davis', price: 199, duration: '10 Weeks', classes: 20, image: 'assets/images/vocal_training.jpg' },
  { id: 4, title: 'Violin Basics', category: 'Violin', level: 'Beginner', instructor: 'Michael Chang', price: 120, duration: '12 Weeks', classes: 24, image: 'assets/images/violin_course.jpg' },
  { id: 5, title: 'Tabla Rhythms', category: 'Tabla', level: 'Intermediate', instructor: 'Ravi Kumar', price: 110, duration: '14 Weeks', classes: 28, image: 'assets/images/tabla_course.jpg' },
  { id: 6, title: 'Music Theory', category: 'Theory', level: 'All Levels', instructor: 'Dr. Alan Turing', price: 89, duration: '8 Weeks', classes: 16, image: 'assets/images/music_theory.jpg' }
];

const MOCK_FACULTY = [
  { id: 1, name: 'John Smith', instrument: 'Guitar', experience: '15 Years', bio: 'Expert in acoustic and electric guitar.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Sarah Lee', instrument: 'Piano', experience: '20 Years', bio: 'Classical pianist with international experience.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Emily Davis', instrument: 'Vocal', experience: '12 Years', bio: 'Professional opera singer and vocal coach.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Michael Chang', instrument: 'Violin', experience: '18 Years', bio: 'First chair violinist at the symphony.', image: 'https://images.unsplash.com/photo-1552058544-e397bfc48357?auto=format&fit=crop&w=400&q=80' }
];

const MOCK_BOOKINGS = [
  { id: 1, student: 'Demo Student', course: 'Beginner Guitar', date: '2026-08-25', time: '17:00', status: 'Approved' },
  { id: 2, student: 'Alice Johnson', course: 'Classical Piano', date: '2026-08-26', time: '15:00', status: 'Pending' }
];

const MOCK_PAYMENTS = [
  { id: 'INV-0012', student: 'Demo Student', description: 'Beginner Guitar (Monthly)', date: '2026-08-01', amount: 99.00, status: 'Paid' },
  { id: 'INV-0013', student: 'Demo Student', description: 'Sheet Music Bundle', date: '2026-08-15', amount: 25.00, status: 'Paid' }
];

function initData() {
  if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(MOCK_USERS));
  if (!localStorage.getItem('courses')) localStorage.setItem('courses', JSON.stringify(MOCK_COURSES));
  if (!localStorage.getItem('faculty')) localStorage.setItem('faculty', JSON.stringify(MOCK_FACULTY));
  if (!localStorage.getItem('bookings')) localStorage.setItem('bookings', JSON.stringify(MOCK_BOOKINGS));
  if (!localStorage.getItem('payments')) localStorage.setItem('payments', JSON.stringify(MOCK_PAYMENTS));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function addBooking(booking) {
  const bookings = getData('bookings');
  booking.id = Date.now();
  booking.status = 'Pending';
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Initialize data on load
initData();

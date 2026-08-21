// auth.js
function login(email, password) {
  const users = getData('users'); // from data.js
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('sessionUser', JSON.stringify(user));
    if (user.role === 'admin') {
      window.location.href = 'student-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    }
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  localStorage.removeItem('sessionUser');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const instrument = document.getElementById('instrument').value;
      
      const users = getData('users');
      if (users.find(u => u.email === email)) {
        alert('Email already exists');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: 'student',
        instrument
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});

  


// ================= MOBILE MENU =================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close mobile menu after clicking a link
const links = document.querySelectorAll('.nav-links a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// ================= ACTIVE NAV LINK ON SCROLL =================
const sections = document.querySelectorAll('section, footer');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// ================= ONLINE EXAM LOGIN FLOW =================
const onlineExamBtn = document.getElementById('onlineExamBtn');
const examLoginSection = document.getElementById('examLoginSection');
const examDashboardSection = document.getElementById('examDashboardSection');
const examLoginForm = document.getElementById('examLoginForm');
const dashboardWelcome = document.getElementById('dashboardWelcome');

function openExamLogin() {
  if (!examLoginSection || !examDashboardSection) return;

  examLoginSection.classList.remove('hidden');
  examLoginSection.style.display = 'block';
  examDashboardSection.classList.add('hidden');
  examDashboardSection.style.display = 'none';
  examLoginSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openExamDashboard(studentName) {
  if (!examLoginSection || !examDashboardSection || !dashboardWelcome) return;

  dashboardWelcome.textContent = `Welcome, ${studentName}`;
  examLoginSection.classList.add('hidden');
  examLoginSection.style.display = 'none';
  examDashboardSection.classList.remove('hidden');
  examDashboardSection.style.display = 'grid';
  examDashboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (onlineExamBtn && examLoginSection) {
  onlineExamBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openExamLogin();
  });
}

if (examLoginForm) {
  examLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('studentName').value.trim();
    const address = document.getElementById('studentAddress').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const mobile = document.getElementById('studentMobile').value.trim();

    if (!fullName || !address || !email || !mobile) {
      alert('Please complete all required fields before opening the exam dashboard.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const phonePattern = /^\+?[0-9]{7,15}$/;
    const normalizedPhone = mobile.replace(/[^0-9+]/g, '');
    if (!phonePattern.test(normalizedPhone)) {
      alert('Please enter a valid mobile number with 7 to 15 digits.');
      return;
    }

    openExamDashboard(fullName);
  });
}

// --- Navbar Toggle for Mobile ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.createElement('div'); // Create overlay once
overlay.className = 'nav-overlay';
document.body.appendChild(overlay); // Append to body

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active'); // Toggle overlay too
    document.body.classList.toggle('no-scroll'); // Prevent background scrolling
});

// Close mobile nav when a link is clicked or overlay is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close hamburger menu on link click for mobile
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Sticky Navbar logic (Scroll-to-Top Button logic removed)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Project Modal Logic
const projectData = {
    project1: {
        img: 'https://via.placeholder.com/600x300/4CAF50/FFFFFF?text=Personal+Portfolio',
        title: 'Personal Portfolio Website',
        tech: 'HTML, CSS, JavaScript',
        desc: 'Developed and deployed a responsive personal portfolio website using HTML, CSS, and JavaScript to showcase technical skills and projects. Gained hands-on experience in UI/UX design and practical front-end development.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        liveDemo: '[YOUR_PORTFOLIO_LIVE_DEMO_LINK]',
        sourceCode: '[YOUR_PORTFOLIO_GITHUB_LINK]'
    },
    project2: {
        img: 'https://via.placeholder.com/600x300/2196F3/FFFFFF?text=Share+To+Live',
        title: 'Share To Live - Donation Website',
        tech: 'HTML, CSS, JavaScript, Node.js, MongoDB',
        desc: 'Built a web platform to manage donations of food, clothing, and essentials. Developed frontend with HTML, CSS, and JavaScript, and backend with Node.js and MongoDB. Implemented routing and optimized logistics to reduce costs by 25%. Handled over 1,000 donations with real-time database connectivity.',
        stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB', 'Git', 'GitHub'],
        liveDemo: '[YOUR_SHARE_TO_LIVE_LIVE_DEMO_LINK]',
        sourceCode: '[YOUR_SHARE_TO_LIVE_GITHUB_LINK]'
    },
    project3: {
        img: 'https://via.placeholder.com/600x300/FF9800/FFFFFF?text=Banking+App',
        title: 'Cloud-Based Banking Application',
        tech: 'AWS RDS, MySQL, Flask, Python, HTML5, CSS3',
        desc: 'Developed a banking web application demonstrating SQL CRUD operations using a cloud-hosted MySQL database on AWS RDS. Designed both frontend and backend to enable secure, real-time transactions. Leveraged AWS cloud features for backups, high availability, and easy scaling.',
        stack: ['AWS RDS', 'MySQL', 'Flask', 'Python', 'HTML5', 'CSS3', 'Git', 'GitHub'],
        liveDemo: '[YOUR_BANKING_APP_LIVE_DEMO_LINK]',
        sourceCode: '[YOUR_BANKING_APP_GITHUB_LINK]'
    }
};

const projectCards = document.querySelectorAll('.projects-grid .project-card');
const modal = document.getElementById('projectModal');
const modalCloseBtn = document.querySelector('#projectModal .close');

// Select the specific elements within the modal for content update
const modalProjectImg = modal.querySelector('#modalProjectImg'); // Use modal.querySelector for robustness
const modalProjectTitle = modal.querySelector('#modalProjectTitle');
const modalProjectTech = modal.querySelector('#modalProjectTech');
const modalProjectDesc = modal.querySelector('#modalProjectDesc');
const modalProjectStack = modal.querySelector('#modalProjectStack');

projectCards.forEach(card => {
    card.addEventListener('click', function () {
        const projectId = card.dataset.projectId;
        if (projectId && projectData[projectId]) {
            const data = projectData[projectId];

            modalProjectImg.src = data.img;
            modalProjectTitle.textContent = data.title;
            modalProjectTech.textContent = `Technologies: ${data.tech}`;
            modalProjectDesc.textContent = data.desc;

            modalProjectStack.innerHTML = ''; // Clear previous stack items
            data.stack.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalProjectStack.appendChild(span);
            });

            modal.classList.add('active'); // Show modal by adding 'active' class
            document.body.classList.add('no-scroll'); // Prevent background scrolling
        }
    });
});

modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active'); // Hide modal by removing 'active' class
    document.body.classList.remove('no-scroll'); // Re-enable background scrolling
});

// Close modal if clicked outside the content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.classList.remove('active'); // Hide modal by removing 'active' class
        document.body.classList.remove('no-scroll'); // Re-enable background scrolling
    }
});

// ✅ FIXED: Highlight active nav link ONLY after scrolling past the hero section
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const aboutSection = document.querySelector('#about');

    if (scrollY < aboutSection.offsetTop - 200) {
        navLinks.querySelectorAll('a').forEach(link => link.classList.remove('active'));
        return;
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150 && scrollY < sectionTop + sectionHeight - 150) {
            current = section.getAttribute('id');
        }
    });

    if (current && current !== 'home') { // avoid highlighting "Home"
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    }
});

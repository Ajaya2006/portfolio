document.addEventListener('DOMContentLoaded', () => {
            // Typing Effect
            const typingLines = document.querySelectorAll('.typing-line');
            typingLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('typing');
                    line.style.opacity = '1';
                }, index * 2000);
            });

            // Initialize progress rings with 0%
            const progressCircles = document.querySelectorAll('.circular-progress');
            progressCircles.forEach(circle => {
                const percent = circle.getAttribute('data-percent');
                const radius = 45;
                const circumference = 2 * Math.PI * radius;

                const progressCircle = circle.querySelector('.progress-ring__circle');
                progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
                progressCircle.style.strokeDashoffset = circumference;
            });

            // Animate progress rings when skills section comes into view
            const skillsSection = document.getElementById('skills1');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressRings();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            if (skillsSection) {
                observer.observe(skillsSection);
            }

            function animateProgressRings() {
                const progressCircles = document.querySelectorAll('.circular-progress');
                progressCircles.forEach(circle => {
                    const percent = circle.getAttribute('data-percent');
                    const radius = 45;
                    const circumference = 2 * Math.PI * radius;
                    const progress = circumference - (percent / 100) * circumference;

                    const progressCircle = circle.querySelector('.progress-ring__circle');
                    const progressText = circle.querySelector('.progress-text');

                    // Animate the progress ring
                    setTimeout(() => {
                        progressCircle.style.strokeDashoffset = progress;
                    }, 100);

                    // Animate the percentage text
                    let currentPercent = 0;
                    const duration = 1500; // 1.5 seconds
                    const increment = percent / (duration / 16); // 16ms per frame (approx 60fps)

                    const timer = setInterval(() => {
                        currentPercent += increment;
                        if (currentPercent >= percent) {
                            currentPercent = percent;
                            clearInterval(timer);
                        }
                        progressText.textContent = Math.round(currentPercent) + '%';
                    }, 16);
                });
            }

            // Smooth Scrolling for Navbar Links and Buttons
            const scrollLinks = document.querySelectorAll('.navbar a, .myself a');
            scrollLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);

                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });

                    // Update active state for navbar links only
                    if (link.parentElement.classList.contains('navbar')) {
                        document.querySelectorAll('.navbar a').forEach(nav => nav.classList.remove('active'));
                        link.classList.add('active');
                    }

                    // Close the hamburger menu on link click (mobile)
                    const navbar = document.querySelector('.navbar');
                    const hamburger = document.querySelector('.hamburger');
                    navbar.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            // Hamburger Menu Toggle
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar');
            if (hamburger && navbar) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navbar.classList.toggle('active');
                });
            }

            // Animate elements on scroll
            const animateElements = document.querySelectorAll('.animate-text');
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, {
                threshold: 0.1
            });

            animateElements.forEach(element => elementObserver.observe(element));

            // Update Greeting
            function updateGreeting() {
                const now = new Date();
                const hour = now.getHours();
                const greetingElement = document.getElementById('greeting');
                let greeting;

                if (hour >= 5 && hour < 12) {
                    greeting = "Good Morning🌄, Ajaya";
                } else if (hour >= 12 && hour < 17) {
                    greeting = "Good Afternoon🕑, Ajaya";
                } else if (hour >= 17 && hour < 22) {
                    greeting = "Good Evening🌉, Ajaya";
                } else {
                    greeting = "Good Night🌃, Ajaya";
                }

                if (greetingElement) {
                    greetingElement.innerHTML = greeting;
                }
            }

            // Call updateGreeting initially and set interval for periodic updates
            updateGreeting();
            setInterval(updateGreeting, 60000); // Update every minute

            // Scroll-based active navbar link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar a');

            function changeActiveLink() {
                let index = sections.length;

                while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

                navLinks.forEach((link) => link.classList.remove('active'));
                if (index >= 0) {
                    navLinks[index].classList.add('active');
                }
            }

            // Back to top button
            const backToTop = document.getElementById('back-to-top');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            });

            if (backToTop) {
                backToTop.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        });

        // Profile Image Animation
        const profileContainer = document.querySelector('.profile-logo');
        if (profileContainer) {
            profileContainer.addEventListener('mouseenter', () => {
                profileContainer.style.transform = 'scale(1.05)';
            });
            profileContainer.addEventListener('mouseleave', () => {
                profileContainer.style.transform = 'scale(1)';
            });
        }

        // JavaScript for enhanced project card interactions
        document.addEventListener('DOMContentLoaded', function() {
            const projectCards = document.querySelectorAll('.project-card');

            // Add touch support for mobile devices
            projectCards.forEach(card => {
                card.addEventListener('touchstart', function() {
                    // Toggle expanded state on touch devices
                    if (this.classList.contains('expanded')) {
                        this.classList.remove('expanded');
                        this.style.height = '100px';
                    } else {
                        // Close other expanded cards
                        document.querySelectorAll('.project-card.expanded').forEach(otherCard => {
                            otherCard.classList.remove('expanded');
                            otherCard.style.height = '100px';
                        });

                        this.classList.add('expanded');
                        this.style.height = '380px';
                    }
                }, {
                    passive: true
                });
            });

            // Keyboard accessibility
            projectCards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.classList.toggle('expanded');
                        this.style.height = this.classList.contains('expanded') ? '380px' : '100px';
                    }
                });
            });
        });

        // Contact Form Submission
        function submitForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Message sent successfully!');
                document.getElementById('contact-form').reset();
            } else {
                alert('Please fill in all fields.');
            }
        }
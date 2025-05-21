    // Toggle Menu
    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.nav-toggle')) {
                mainNav.classList.remove('active');
            }
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    mainNav.classList.remove('active');
                }
            });
        });
        
        // Parallax effect for hero
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                hero.style.backgroundPositionY = -scrolled * 0.2 + 'px';
            }
        });
        
        // Service Worker for Web Vitals
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(error => {
                    console.error('Error al registrar service worker:', error);
                });
            });
        }
    });
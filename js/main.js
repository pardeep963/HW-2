document.addEventListener('DOMContentLoaded', () => {
    const characters = document.querySelectorAll('.character');
    const lightboxes = document.querySelectorAll('.lightbox');
    const closeBtns = document.querySelectorAll('.close');
    const nav = document.querySelector('nav');

    characters.forEach((character, index) => {
        character.style.opacity = '0';
        character.style.transform = 'translateY(20px)';

        setTimeout(() => {
            character.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            character.style.opacity = '1';
            character.style.transform = 'translateY(0)';
        }, 100 * index);

        character.addEventListener('click', () => {
            const memberId = character.getAttribute('data-member');
            const lightbox = document.getElementById(memberId);
            if (lightbox) {
                document.body.style.overflow = 'hidden'; // Prevent scroll while lightbox is open
                lightbox.classList.add('show');

                // Animate lightbox content
                const content = lightbox.querySelector('.lightbox-content');
                content.style.opacity = '0';
                content.style.transform = 'scale(0.9)';

                requestAnimationFrame(() => {
                    content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    content.style.opacity = '1';
                    content.style.transform = 'scale(1)';
                });
            }
        });
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
            `;
            e.target.appendChild(ripple);

            requestAnimationFrame(() => {
                ripple.style.left = rect.width / 2 + 'px';
                ripple.style.top = rect.height / 2 + 'px';
                ripple.style.transform = 'translate(-50%, -50%) scale(2)';
                ripple.style.opacity = '0';
            });

            setTimeout(() => ripple.remove(), 600);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lightbox = btn.closest('.lightbox');
            if (lightbox) {
                closeLightbox(lightbox);
            }
        });
    });

    lightboxes.forEach(lightbox => {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox(lightbox);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeLightbox = document.querySelector('.lightbox.show');
            if (activeLightbox) {
                closeLightbox(activeLightbox);
            }
        }
    });

    function closeLightbox(lightbox) {
        const content = lightbox.querySelector('.lightbox-content');
        content.style.opacity = '0';
        content.style.transform = 'scale(0.9)';

        setTimeout(() => {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // Restore scroll

            setTimeout(() => {
                content.style.opacity = '';
                content.style.transform = '';
            }, 400);
        }, 300);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
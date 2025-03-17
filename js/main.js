document.addEventListener('DOMContentLoaded', () => {
    // Get all characters and lightboxes
    const characters = document.querySelectorAll('.character');
    const lightboxes = document.querySelectorAll('.lightbox');
    const closeBtns = document.querySelectorAll('.close');

    // Add click event to each character
    characters.forEach(character => {
        character.addEventListener('click', () => {
            const memberId = character.getAttribute('data-member');
            const lightbox = document.getElementById(memberId);
            if (lightbox) {
                lightbox.classList.add('show');
            }
        });
    });

    // Add close functionality
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lightbox = btn.closest('.lightbox');
            if (lightbox) {
                lightbox.classList.remove('show');
            }
        });
    });

    // Close lightbox when clicking outside content
    lightboxes.forEach(lightbox => {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
            }
        });
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightboxes.forEach(lightbox => {
                lightbox.classList.remove('show');
            });
        }
    });
});
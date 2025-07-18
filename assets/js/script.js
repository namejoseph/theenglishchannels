document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.mobile-nav a');

    const openMenu = () => {
        mobileMenuOverlay.classList.add('open');
        document.body.classList.add('no-scroll');
    };

    const close = () => {
        mobileMenuOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    };

    hamburgerMenu.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', close);
    navLinks.forEach(link => {
        link.addEventListener('click', close);
    });
});

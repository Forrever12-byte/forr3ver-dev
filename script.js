const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay')
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

menuToggle.addEventListener('click', function() {
    bar1.classList.toggle('rotate-45');
    bar1.classList.toggle('translate-y-2');
    bar2.classList.toggle('opacity-0');
    bar3.classList.toggle('-rotate-45');
    bar3.classList.toggle('-translate-y-2')

    mobileMenu.classList.toggle('hidden');
    menuOverlay.classList.toggle('hidden');
    menuToggle.classList.toggle('z-60');
}); 

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));
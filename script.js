// Script pour gérer le menu de navigation (burger)
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');

        // Bascule l'icône entre le burger et la croix
        menuToggle.innerHTML = navLinks.classList.contains('open') ? '&times;' : '&#9776;';
    });
});

// Script pour le carrousel d'images
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
});

// Script pour la section FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

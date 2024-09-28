// Script pour gérer le menu de navigation (burger) et le carrousel
document.addEventListener('DOMContentLoaded', function () {
    // Menu de navigation burger
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        // Bascule l'icône entre le burger et la croix
        menuToggle.innerHTML = navLinks.classList.contains('open') ? '&times;' : '&#9776;';
        // Mise à jour de l'attribut aria-expanded pour l'accessibilité
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Carrousel d'images
    const carousel = document.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let isThrottled = false;

    function showImage(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function showNext() {
        if (isThrottled) return;
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        throttle();
    }

    function showPrev() {
        if (isThrottled) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        throttle();
    }

    function throttle() {
        isThrottled = true;
        setTimeout(() => isThrottled = false, 500); // Empêche les clics trop rapides
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
});

// Script pour la section FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('role', 'button'); // Accessibilité
    question.setAttribute('aria-expanded', 'false'); // Par défaut fermé
    question.addEventListener('click', () => {
        const isOpen = question.classList.toggle('active');
        question.nextElementSibling.style.display = isOpen ? 'block' : 'none';
        question.setAttribute('aria-expanded', isOpen); // Mise à jour de l'état aria-expanded
    });
});

// Quiz
const quizData = [
    {
        question: "Combien le chat dort-il en moyenne d'heures par jour ?",
        options: ["8 à 10", "15 à 18", "18 à 20"],
        correctAnswer: 1
    },
    {
        question: "Quel condiment rend certains chats complètement fous ?",
        options: ["L'olive", "Le cornichon", "La câpre"],
        correctAnswer: 0
    },
    {
        question: "Quels chats de gouttière sont toujours des femelles ?",
        options: ["Les tricolore \"écaille de tortue\"", "Les bicolore noir et blanc", "Les roux"],
        correctAnswer: 0
    },
    {
        question: "Quelle race de chat adore se baigner ?",
        options: ["Le Siamois", "Le chat turc du lac de Van", "Le chat des forêts norvégiennes"],
        correctAnswer: 1
    },
    {
        question: "Quelle boisson les chats digèrent-ils mal ?",
        options: ["L'eau", "Le jus de viande", "Le lait de vache"],
        correctAnswer: 2
    },
    {
        question: "À quelle vitesse le chat court-il en moyenne ?",
        options: ["20 km/h", "30 km/h", "40 km/h"],
        correctAnswer: 2
    },
    {
        question: "Combien le chat a-t-il de griffes ?",
        options: ["18", "20", "22"],
        correctAnswer: 0
    },
    {
        question: "Quel est le poids moyen d'un chaton à la naissance ?",
        options: ["60 g", "90 g", "120 g"],
        correctAnswer: 1
    },
    {
        question: "Comment le chat \"goûte\"-t-il les odeurs ?",
        options: ["En les respirant", "Avec son organe de Jacobson", "En les léchant"],
        correctAnswer: 1
    },
    {
        question: "Comment le chat transpire-t-il ?",
        options: ["Par la peau", "Par la bouche et les coussinets", "Il ne transpire pas"],
        correctAnswer: 1
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = quizData.map((questionData, questionIndex) => {
        const answers = questionData.options.map((option, index) => `
            <label>
                <input type="radio" name="question${questionIndex}" value="${index}">
                ${option}
            </label><br>`).join('');

        return `
            <div class="question">
                <h3>Question ${questionIndex + 1}</h3>
                <p>${questionData.question}</p>
                ${answers}
            </div>`;
    }).join('');

    quizContainer.innerHTML = output;
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.question');
    let score = 0;

    quizData.forEach((questionData, questionIndex) => {
        const answerContainer = answerContainers[questionIndex];
        const selector = `input[name=question${questionIndex}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer == questionData.correctAnswer) {
            score++;
            answerContainers[questionIndex].style.color = 'green';
        } else {
            answerContainers[questionIndex].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `Vous avez ${score} bonnes réponses sur ${quizData.length} questions.`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);

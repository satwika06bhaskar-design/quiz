const quizData = [
    {
        question: "What is the capital of India?",
        choices: ["Mumbai", "New Delhi", "Hyderabad", "Chennai"],
        answer: "New Delhi"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Which language runs in a web browser?",
        choices: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Who is the founder of Microsoft?",
        choices: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
        answer: "Bill Gates"
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        choices: ["<h1>", "<head>", "<h6>", "<title>"],
        answer: "<h1>"
    }
];

const startBox = document.getElementById('start-box');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('time');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');

let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

startBtn.addEventListener('click', () => {
    startBox.classList.add('hide');
    quizBox.classList.remove('hide');
    showQuestion();
});

function showQuestion() {
    clearInterval(timer);
    resetState();

    const currentQuestion = quizData[currentIndex];
    questionEl.innerText = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('answer-btn');
        button.onclick = () => selectAnswer(button, currentQuestion.answer);
        li.appendChild(button);
        answersEl.appendChild(li);
    });

    timeLeft = 10;
    timerEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetState() {
    nextBtn.disabled = true;
    answersEl.innerHTML = '';
}

function selectAnswer(button, correctAnswer) {
    clearInterval(timer);
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctAnswer) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
    });

    if (button.innerText === correctAnswer) {
        score++;
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreEl.innerText = `You scored ${score} out of ${quizData.length}`;
    localStorage.setItem('quizScore', score);
}

nextBtn.addEventListener('click', nextQuestion);

restartBtn.addEventListener('click', () => {
    score = 0;
    currentIndex = 0;
    resultBox.classList.add('hide');
    quizBox.classList.remove('hide');
    showQuestion();
});

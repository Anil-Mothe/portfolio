const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "HO2", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<hyperlink>", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlink Texting Mark Language", correct: false }
        ]
    },
    {
        question: "Which Python data type is an ordered collection of items?",
        answers: [
            { text: "List", correct: true },
            { text: "Dictionary", correct: false },
            { text: "Set", correct: false },
            { text: "Tuple", correct: false }
        ]
    },
    {
        question: "What keyword is used to define a function in Python?",
        answers: [
            { text: "function", correct: false },
            { text: "def", correct: true },
            { text: "define", correct: false },
            { text: "func", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });
    selectedButton.classList.add('selected');
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        questionElement.innerText = `Quiz Completed! Your score is ${score} out of ${questions.length}`;
        answerButtonsElement.innerHTML = '';
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    element.classList.remove('selected');
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        startQuiz();
    }
});

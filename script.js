const questions = [
  {
    question: 'HTML stands for?',
    options: [
      'Hyper Text Markup Language',
      'Home Tool Markup Language',
      'Hyperlinks Text Management Language',
      'High-level Text Markup Language',
    ],
    answer: 0,
  },
  {
    question: 'Which language is used for styling web pages?',
    options: ['HTML', 'Python', 'CSS', 'JavaScript'],
    answer: 2,
  },
  {
    question: 'Which JavaScript method is used to select an element by ID?',
    options: ['querySelector', 'getElementById', 'getElementsByClassName', 'querySelectorAll'],
    answer: 1,
  },
  {
    question: 'Which company developed JavaScript?',
    options: ['Microsoft', 'Netscape', 'Google', 'Apple'],
    answer: 1,
  },
  {
    question: 'What does CSS stand for?',
    options: [
      'Cascading Style Sheets',
      'Computer Style Sheets',
      'Creative Style System',
      'Colorful Style Syntax',
    ],
    answer: 0,
  },
];

const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const progressLabel = document.getElementById('progress-label');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const retryBtn = document.getElementById('retry-btn');
const feedbackRow = document.getElementById('feedback-row');
const quizCard = document.getElementById('quiz-card');
const resultCard = document.getElementById('result-card');
const resultScore = document.getElementById('result-score');
const resultMessage = document.getElementById('result-message');

let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let isAnswerSubmitted = false;

function startQuiz() {
  currentQuestionIndex = 0;
  selectedOptionIndex = null;
  score = 0;
  isAnswerSubmitted = false;
  quizCard.classList.remove('hidden');
  resultCard.classList.add('hidden');
  feedbackRow.textContent = '';
  submitBtn.disabled = true;
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  progressLabel.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  optionsGrid.innerHTML = '';
  selectedOptionIndex = null;
  submitBtn.disabled = true;
  feedbackRow.textContent = '';
  feedbackRow.className = 'feedback-row';

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'option-card';
    optionButton.innerHTML = `
      <span class="option-label">${String.fromCharCode(65 + index)}</span>
      <p class="option-text">${option}</p>
    `;

    optionButton.addEventListener('click', () => selectOption(index));

    optionsGrid.appendChild(optionButton);
  });
}

function selectOption(index) {
  if (isAnswerSubmitted) return;
  selectedOptionIndex = index;
  submitBtn.disabled = false;

  const optionCards = optionsGrid.querySelectorAll('.option-card');
  optionCards.forEach((card, cardIndex) => {
    card.classList.toggle('selected', cardIndex === index);
  });
}

function submitAnswer() {
  if (selectedOptionIndex === null || isAnswerSubmitted) return;

  isAnswerSubmitted = true;
  const currentQuestion = questions[currentQuestionIndex];
  const optionCards = optionsGrid.querySelectorAll('.option-card');
  const isCorrect = selectedOptionIndex === currentQuestion.answer;

  optionCards.forEach((card, cardIndex) => {
    card.classList.remove('selected');
    if (cardIndex === currentQuestion.answer) {
      card.classList.add('correct');
    }
    if (cardIndex === selectedOptionIndex && !isCorrect) {
      card.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score += 1;
    feedbackRow.textContent = 'Correct! Great job.';
    feedbackRow.classList.add('correct');
  } else {
    feedbackRow.textContent = `Incorrect. The right answer is "${currentQuestion.options[currentQuestion.answer]}".`;
    feedbackRow.classList.add('incorrect');
  }

  submitBtn.disabled = true;

  setTimeout(() => {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < questions.length) {
      isAnswerSubmitted = false;
      renderQuestion();
    } else {
      showResults();
    }
  }, 1300);
}

function showResults() {
  quizCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  resultScore.textContent = `You scored ${score} / ${questions.length}`;
  const percentage = Math.round((score / questions.length) * 100);
  resultMessage.textContent =
    percentage === 100
      ? 'Perfect score! You nailed every question.'
      : percentage >= 70
      ? 'Great effort! You have a strong grasp of the material.'
      : 'Nice try! Restart the quiz to improve your score.';
}

submitBtn.addEventListener('click', submitAnswer);
restartBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', startQuiz);

window.addEventListener('load', startQuiz);

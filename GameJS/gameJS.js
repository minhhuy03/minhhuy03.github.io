const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
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

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
 
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Ronaldo thi đấu cho CLB nào trước khi chuyển tới Manchester United?',
    answers: [
      { text: 'Newells Old Boys', correct: true },
      { text: 'Real Madrid', correct: false },
      { text: 'Al-Nassr', correct: false },
      { text: 'Bồ Đào Nha', correct: false }
    ]
  },
  {
    question: 'CLB nào có nhiều chức vô địch Champons League nhất?',
    answers: [
      { text: 'ManChester City', correct: false },
      { text: 'Bayern Munich', correct: false },
      { text: 'Real Madrid', correct: true },
      { text: 'Manchester United', correct: false }
    ]
  },
  {
    question: 'Đội tuyển nào vô địch kì World Cup đầu tiên năm 1930?',
    answers: [
      { text: 'Brazil', correct: false },
      { text: 'Italia', correct: false },
      { text: 'France ', correct: false },
      { text: 'Uruguay', correct: true }
    ]
  },
  {
    question: 'Đội bóng nào vô địch giải Ngoại hạng Anh đầu tiên?',
    answers: [
      { text: 'Real Madrid', correct: false },
      { text: 'Manchester United', correct: true },
      { text: 'Aston Villa', correct: false },
      { text: 'Newcastle United', correct: false }
    ]
  },
  {
    question: 'Thủ môn nào đang giữ kỷ lục về số lần giữ sạch lưới (202 trận)?',
    answers: [
      { text: 'Neuer', correct: false },
      { text: 'Petr Cech', correct: true },
      { text: 'Đặng Văn Lâm', correct: false },
      { text: 'David de Gea', correct: false }
    ]
  }
];
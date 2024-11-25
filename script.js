// Question Data
const questions = [
  {
    id: "question01",
    text: "Criticarme constantemente.",
    imgSrc: "img/image01.jpg",
    isViolence: true
  },
  {
    id: "question02",
    text: "Destino tiempo a descansar cuando trabajo duro.",
    imgSrc: "img/image02.jpg",
    isViolence: false
  },
  {
    id: "question03",
    text: "Soy demasiado durx conmigo cuando cometo errores.",
    imgSrc: "img/image03.jpg",
    isViolence: true
  },
  {
    id: "question04",
    text: "Enfocarme y valorar lo bueno en mí.",
    imgSrc: "img/image04.jpg",
    isViolence: false
  },
  {
    id: "question05",
    text: "Organizo y calendarizo mis pendientes.",
    imgSrc: "img/image05.jpg",
    isViolence: false
  },
  {
    id: "question06",
    text: "Compararme negativamente con otrxs.",
    imgSrc: "img/image06.jpg",
    isViolence: true
  },
];

// Track Current Question, Score, and Timer
let currentQuestionIndex = 0;
let score = 0;
let timer = 30; // 30 seconds timer
let timerInterval;

// Scaling factor to reach a max score of 1 million points
const correctAnswerPoints = 21;
const timeBonusRate = 1.5;
const maxQuestions = questions.length;
const maxTime = 30;
const maxCorrectScore = correctAnswerPoints * maxQuestions;
const maxTimeBonus = timeBonusRate * maxTime;
const scalingMultiplier = 2160000 / (maxCorrectScore + maxTimeBonus);

// Utility function to shuffle the question array
function shuffleQuestions(array) {
  for (let i= array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]]; //swap elements
  }
}

//Display Welcome screen
function displayWelcomeScreen() {
  document.querySelector(".game-container").innerHTML = `
  <h1>¡Bienvenidx!</h1>
  <p>Puntaje máximo: 2,160,000</p>
  <button onclick="initGame()">Comenzar juego</button>
  `;
}

// Initialize Game
function initGame() {
  // Reset score and timer at the start
  score = 0;
  currentQuestionIndex = 0;
  timer = 30;

  shuffleQuestions(questions);

  document.querySelector(".game-container").innerHTML = `
    <h1>¿Es violencia psicológica?</h1>
    <div class="timer-section">
      <p>Tiempo: <span id="timer">30</span> segundos</p>
    </div>
    <div class="question-section">
      ${questions.map((q) => `
        <p id="${q.id}" class="question-text" style="display: none;"></p>
        <img id="${q.id}-img" class="question-image" src="" alt="Imagen de referencia" style="display: none;">
      `).join("")}
    </div>
    <div class="response-buttons">
      <button onclick="answerQuestion(true)">Sí, es violencia</button>
      <button onclick="answerQuestion(false)">No, no es violencia</button>
    </div>
  `;
  startTimer();
  displayQuestion(currentQuestionIndex);
}

// Start Timer Countdown
function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    timer--;
    timerElement.textContent = timer;

    // End the game when time runs out
    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000); // Update every second
}

// Display a Specific Question by Index
function displayQuestion(index) {
  // Hide all questions
  questions.forEach((question) => {
    document.getElementById(question.id).style.display = "none";
    document.getElementById(`${question.id}-img`).style.display = "none"; // Hide associated image
  });

  // Show current question text and image
  const question = questions[index];
  const questionText = document.getElementById(question.id);
  const questionImage = document.getElementById(`${question.id}-img`);

  questionText.textContent = question.text;
  questionImage.src = question.imgSrc;

  questionText.style.display = "block";
  questionImage.style.display = "block";
}

// Handle Answer Selection
function answerQuestion(userAnswer) {
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the answer is correct
  if (userAnswer === currentQuestion.isViolence) {
    score += correctAnswerPoints; // Add points for correct answer
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    clearInterval(timerInterval); // Stop the timer if the game ends early
    endGame();
  }
}

// End Game - Display Final Score and Retry Button
function endGame() {
  // Calculate time bonus based on remaining time
  const timeBonus = timer * timeBonusRate;
  
  // Calculate the scaled final score
  const finalScore = Math.floor((score + timeBonus) * scalingMultiplier);

  document.querySelector(".game-container").innerHTML = `
    <h2>¡Juego terminado!</h2>
    <br />
    <p>Puntos por respuestas correctas:</p>
    <p><span>${Math.floor(score * scalingMultiplier).toLocaleString()}</span> puntos</p>
    <br />
    <p>Bonus de tiempo:</p>
    <p><span>${Math.floor(timeBonus * scalingMultiplier).toLocaleString()}</span> puntos</p>
    <br />
    <br />
    <p>Puntaje final:</p>
    <p><span>${finalScore.toLocaleString()}</span> puntos</p>
    <button onclick="initGame()">Reintentar</button>
  `;
}

// Start Game on Load
window.onload = displayWelcomeScreen;
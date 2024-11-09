// Question Data
const questions = [
  {
    id: "question01",
    text: "Criticarme constantemente.",
    imgSrc: "img/image01.jpg", // Replace with actual image URL or path
    isViolence: true
  },
  {
    id: "question02",
    text: "Destino tiempo a descansar cuando trabajo duro.",
    imgSrc: "img/image02.jpg", // Replace with actual image URL or path
    isViolence: false
  },
  {
    id: "question03",
    text: "Soy demasiado durx conmigo cuando cometo errores.",
    imgSrc: "img/image03.jpg", // Replace with actual image URL or path
    isViolence: true
  },
  {
    id: "question04",
    text: "Enfocarme y valorar lo bueno en mí.",
    imgSrc: "img/image04.jpg", // Replace with actual image URL or path
    isViolence: false
  },
  {
    id: "question05",
    text: "Organizo y calendarizo mis pendientes",
    imgSrc: "img/image05.jpg", // Replace with actual image URL or path
    isViolence: false
  },
  {
    id: "question06",
    text: "Compararme negativamente con otrxs.",
    imgSrc: "img/image06.jpg", // Replace with actual image URL or path
    isViolence: true
  }
];

// Track Current Question, Score, and Timer
let currentQuestionIndex = 0;
let score = 0;
let timer = 30; // 30 seconds timer
let timerInterval;

// Initialize Game
function initGame() {
  score = 0;
  currentQuestionIndex = 0;
  timer = 30; // Reset timer to 30 seconds at the start
  document.querySelector(".game-container").innerHTML = `
    <h1>¿Es violencia psicológica?</h1>
    <div class="timer-section">
      <p>Tiempo: <span id="timer">30</span> segundos</p>
    </div>
    <div class="question-section">
      <p id="question01" class="question-text" style="display: none;"></p>
      <img id="question01" class="question-image" src="" alt="Imagen de referencia" style="display: none;">
      
      <p id="question02" class="question-text" style="display: none;"></p>
      <img id="question02" class="question-image" src="" alt="Imagen de referencia" style="display: none;">
      
      <p id="question03" class="question-text" style="display: none;"></p>
      <img id="question03" class="question-image" src="" alt="Imagen de referencia" style="display: none;">
      
      <p id="question04" class="question-text" style="display: none;"></p>
      <img id="question04" class="question-image" src="" alt="Imagen de referencia" style="display: none;">

      <p id="question05" class="question-text" style="display: none;"></p>
      <img id="question05" class="question-image" src="" alt="Imagen de referencia" style="display: none;">

      <p id="question06" class="question-text" style="display: none;"></p>
      <img id="question06" class="question-image" src="" alt="Imagen de referencia" style="display: none;">
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
    document.getElementById(question.id).nextElementSibling.style.display = "none"; // Hide associated image
  });

  // Show current question text and image
  const question = questions[index];
  const questionText = document.getElementById(question.id);
  const questionImage = questionText.nextElementSibling;

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
    score += 10; // Add 10 points for correct answer
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
  document.querySelector(".game-container").innerHTML = `
    <h2>¡Juego terminado!</h2>
    <p>Puntaje final: <span>${score}</span> puntos</p>
    <button onclick="initGame()">Reintentar</button>
  `;
}

// Start Game on Load
window.onload = initGame;
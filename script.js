const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("nav");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameEnd = document.getElementById("game-end");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const word = document.getElementById("word");

let words;
let score = 0;
let time = 20;

// set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

console.log(difficulty);

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

console.log(difficultySelect.value);

// focus on text start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

fetch("https://random-word-api.herokuapp.com/word?number=100")
  .then((data) => data.json())
  .then((res) => {
    words = res;
    // let data = randomWord();
    addToDOM();
  });

//update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

const gameOver = () => {
  gameEnd.innerHTML = `
    <h1>Time ran out</h1>
  <p>Your final score is <span class="score-data">${score}</p>
  <button onClick="location.reload()">Reload</button>
    `;

  gameEnd.style.display = "flex";
};

// select random word
const randomWord = () => {
  updateTime();

  return words[Math.floor(Math.random() * words.length)];
};

// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

// add to DOM
const addToDOM = () => {
  let data = randomWord();
  word.innerHTML = data;
};

//event listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === word.innerText) {
    addToDOM();
    updateScore();
    //clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 6;
    } else {
      time += 7;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);

  location.reload();
});

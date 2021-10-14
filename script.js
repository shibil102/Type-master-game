const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("nav");

let words;
let score = 0;
let 

const callServer = () => {
  fetch("https://random-word-api.herokuapp.com/word?number=5")
    .then((data) => data.json())
    .then((res) => {
      words = res;
    });
};

console.log(words);

//event listeners
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

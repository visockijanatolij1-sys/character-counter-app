const mainTextarea = document.querySelector(".main-textarea");

const totalCharacters = document.querySelector(".total-characters");
const wordCount = document.querySelector(".word-count");
const sentenceCount = document.querySelector(".sentence-count");

const excludeSpacesCheckbox = document.querySelector(
  ".exclude-spaces_checkbox",
);
const setCharacterLimit = document.querySelector(".set-character-limit");

mainTextarea.addEventListener("input", () => {
  let inputValue = mainTextarea.value;

  let inputArray = inputValue.trim().split(" ");
  let wordArray = [];
  inputArray.forEach((element) => {
    if (element !== "") {
      wordArray.push(element);
    }
  });
  if (wordArray.length < 10) {
    wordCount.textContent = `0${wordArray.length}`;
  } else {
    wordCount.textContent = wordArray.length;
  }

  if (!excludeSpacesCheckbox.checked) {
    if (inputValue.length < 10) {
      totalCharacters.textContent = `0${inputValue.length}`;
    } else {
      totalCharacters.textContent = inputValue.length;
    }
  }

  const sentences = inputValue.match(/[.!?]+/g);
  // console.log(sentences);
  if (sentences === null) {
    sentenceCount.textContent = "00";
  }
  if (sentences !== null && sentences.length < 10) {
    sentenceCount.textContent = `0${sentences.length}`;
  } else if (sentences !== null && sentences.length >= 10) {
    sentenceCount.textContent = sentences.length;
  }
});

function excludeSpaces() {
  let inputValue = mainTextarea.value;
  let spaceCounter = 0;
  let inputArray = inputValue.trim().split("");
  inputArray.forEach((element) => {
    if (element === " ") spaceCounter++;
  });
  return spaceCounter;
}

const modeSwitcher = document.querySelector(".mode-switcher");
const headerLogo = document.querySelector(".header-logo img");
const modeSwitcherImg = document.querySelector(".mode-switcher img");

modeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    modeSwitcher.style.backgroundColor = "#f2f2f7";
    headerLogo.src = "./images/logo-light-theme.svg";
    modeSwitcherImg.src = "./images/icon-moon.svg";
    modeSwitcher.setAttribute("aria-label", "Switch to light theme");
  } else {
    modeSwitcher.style.backgroundColor = "#2a2b37";
    headerLogo.src = "./images/logo-dark-theme.svg";
    modeSwitcherImg.src = "./images/icon-sun.svg";
    modeSwitcher.setAttribute("aria-label", "Switch to dark theme");
  }
});

const mainTextarea = document.querySelector(".main-textarea");

const totalCharacters = document.querySelector(".total-characters");
const wordCount = document.querySelector(".word-count");
const sentenceCount = document.querySelector(".sentence-count");

const excludeSpacesCheckbox = document.querySelector(
  ".exclude-spaces_checkbox",
);
const setCharacterLimitCheckbox = document.querySelector(
  ".set-character-limit",
);
const charLimitInput = document.querySelector(".char-limit");
const textareaError = document.querySelector(".textarea-error");
const textareaErrorText = document.querySelector(".textarea-error_text");

const optionsApprox = document.querySelector(".options-approx");

const densityList = document.querySelector(".density-list");

const buttonSeeMore = document.querySelector(".see-more");
const buttonText = document.querySelector(".button-text");
const buttonImage = document.querySelector(".button-img");

let currentLetterArray = [];
let currentTotalLetters = 0;
let onlyVisiblesElems = [];
let buttonVissible = false;

mainTextarea.addEventListener("input", () => {
  buttonVissible = false;
  buttonText.textContent = "See more";
  buttonImage.style.transform = "rotate(0deg)";

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
  const readingTime = Math.ceil(wordArray.length / 200);
  if (readingTime < 2) {
    optionsApprox.textContent = "Approx. reading time: <1 minute";
  } else if (readingTime >= 2) {
    optionsApprox.textContent = `Approx. reading time: < ${readingTime} minutes`;
  }

  if (!excludeSpacesCheckbox.checked) {
    showtotalCharacters();
  } else {
    excludeSpace();
  }

  const sentences = inputValue.match(/[.!?]+/g);
  if (sentences === null) {
    sentenceCount.textContent = "00";
  }
  if (sentences !== null && sentences.length < 10) {
    sentenceCount.textContent = `0${sentences.length}`;
  } else if (sentences !== null && sentences.length >= 10) {
    sentenceCount.textContent = sentences.length;
  }

  if (setCharacterLimitCheckbox.checked) {
    checkCharLimit();
  } else {
    hideError();
  }

  let capitalLetters = [];
  let capitalLettersArray = [];
  wordArray.forEach((element) => {
    capitalLetters.push(element.toUpperCase());
  });
  capitalLetters.forEach((word) => {
    capitalLettersArray.push(word.split(""));
  });
  let flatArray = capitalLettersArray.flat();
  const filteredArray = flatArray.filter((element) => {
    return /[A-Z]/.test(element);
  });
  console.log(flatArray);
  console.log(filteredArray);

  let lettersObject = {};

  filteredArray.forEach((letter) => {
    if (lettersObject[letter]) {
      lettersObject[letter]++;
    } else {
      lettersObject[letter] = 1;
    }
  });
  currentTotalLetters = filteredArray.length;
  densityList.innerHTML = "";

  const letterArray = Object.entries(lettersObject);
  letterArray.sort((a, b) => {
    return b[1] - a[1];
  });
  currentLetterArray = letterArray;

  const visibleLetters = letterArray.slice(0, 5);
  // console.log(visibleLetters);
  onlyVisiblesElems = visibleLetters;

  if (letterArray.length === 0) {
    showStaticText();
    buttonSeeMore.classList.add("hide");
  } else if (letterArray.length <= 5) {
    drawBars(visibleLetters, filteredArray.length);
    buttonSeeMore.classList.add("hide");
  } else if (letterArray.length > 5) {
    drawBars(visibleLetters, filteredArray.length);
    buttonSeeMore.classList.remove("hide");
  }
});

function showtotalCharacters() {
  let inputValue = mainTextarea.value;
  let inputArray = inputValue.split("");
  if (inputValue.length < 10) {
    totalCharacters.textContent = `0${inputValue.length}`;
  } else {
    totalCharacters.textContent = inputValue.length;
  }
}
function drawBars(array, totalLetters) {
  array.forEach((element) => {
    let letter = element[0];
    let quantityLetter = element[1];
    let percent = (quantityLetter / totalLetters) * 100;
    percent = percent.toFixed(2);

    const densityItem = document.createElement("li");
    densityItem.classList.add("density-item");
    densityList.append(densityItem);

    const densityLetter = document.createElement("p");
    densityLetter.textContent = letter;
    densityLetter.classList.add("density-letter");
    densityItem.append(densityLetter);

    const quantity = document.createElement("div");
    quantity.classList.add("density-quantity");
    densityItem.append(quantity);

    const quantityFull = document.createElement("div");
    quantityFull.classList.add("density-quantity_full");
    quantity.append(quantityFull);

    const quantityCurrent = document.createElement("div");
    quantityCurrent.classList.add("density-quantity_current");
    quantity.append(quantityCurrent);

    const densityPercent = document.createElement("p");
    densityPercent.textContent = `${quantityLetter} (${percent}%)`;
    densityPercent.classList.add("density-percent");
    densityItem.append(densityPercent);

    quantityCurrent.style.width = `${percent}%`;
  });
}

function excludeSpace() {
  let inputValue = mainTextarea.value;
  let inputArray = inputValue.split("");
  let spaceCounter = 0;
  inputArray.forEach((element) => {
    if (/\s/.test(element)) spaceCounter++;
  });
  let inputWithoutSpaces = inputValue.length - spaceCounter;
  if (inputWithoutSpaces < 10) {
    totalCharacters.textContent = `0${inputWithoutSpaces}`;
  } else {
    totalCharacters.textContent = inputWithoutSpaces;
  }
}

excludeSpacesCheckbox.addEventListener("change", () => {
  if (excludeSpacesCheckbox.checked) {
    excludeSpace();
  } else {
    showtotalCharacters();
  }
});

setCharacterLimitCheckbox.addEventListener("change", () => {
  if (setCharacterLimitCheckbox.checked) {
    charLimitInput.classList.remove("hide");
  } else {
    charLimitInput.classList.add("hide");
    hideError();
  }
});

charLimitInput.addEventListener("input", checkCharLimit);

function checkCharLimit() {
  if (charLimitInput.value === "") {
    hideError();
  } else {
    let limitValue = +charLimitInput.value;
    let inputValue = mainTextarea.value;

    if (setCharacterLimitCheckbox.checked) {
      if (inputValue.length > limitValue) {
        showError(limitValue);
      } else {
        hideError();
      }
    }
  }
}

function showError(limit) {
  mainTextarea.style.border = "2px solid #fe8159";
  textareaErrorText.textContent = `Limit reached! Your text exceeds ${limit} characters.`;
  textareaError.classList.remove("hide");
}

function hideError() {
  mainTextarea.style.border = "2px solid #12131a";
  textareaError.classList.add("hide");
}

function showStaticText() {
  const emptyText = document.createElement("p");
  emptyText.textContent =
    "No characters found. Start typing to see letter density.";
  emptyText.classList.add("static-denssity_text");
  densityList.append(emptyText);
}

showStaticText();
buttonSeeMore.classList.add("hide");
// let buttonVissible = false;
buttonSeeMore.addEventListener("click", () => {
  buttonVissible = !buttonVissible;

  if (!buttonVissible) {
    buttonSeeMore.setAttribute("aria-expanded", "false");

    densityList.innerHTML = "";
    drawBars(onlyVisiblesElems, currentTotalLetters);
    buttonText.textContent = "See more";
    buttonImage.style.transform = "rotate(0deg)";
  } else {
    buttonSeeMore.setAttribute("aria-expanded", "true");

    densityList.innerHTML = "";
    drawBars(currentLetterArray, currentTotalLetters);
    buttonText.textContent = "See less";
    buttonImage.style.transform = "rotate(180deg)";
  }
});

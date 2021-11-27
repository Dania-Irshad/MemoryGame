const gameContainer = document.getElementById('game');
const end = document.getElementById('end');
const start = document.getElementById('start');
const timer = document.getElementById('timer');
let timeoutId;
let interId;
const gameTime = 15;
let timePassed = 0;
let timeRemaining = gameTime;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForAnimals(animalArray) {
  for (let animal of animalArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(animal);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundImage = "url(" + currentCard.classList[0] + ")";
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundImage = 'none';
        card2.style.backgroundImage = 'none';
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped == ANIMALS.length) {
    alert("You Won, Game Over!");
    clearTimeout(timeoutId);
    endGame();
  }
}

start.addEventListener('click', startFunction);

function startFunction() {
  if (gameContainer.children.length == 0) {
    const ANIMALS = [
      "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1568265112889-c9d3fc50a281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1544779493-aa344a6ddaac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1568265112889-c9d3fc50a281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      "https://images.unsplash.com/photo-1544779493-aa344a6ddaac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    ];
    let shuffledAnimals = shuffle(ANIMALS);
    createDivsForAnimals(shuffledAnimals);
    start.classList.add('hidden');
    end.classList.remove('hidden');
    interId = setInterval(function () {
      timeRemaining = gameTime - timePassed;
      timePassed = timePassed += 1;
      timer.innerHTML = "Timer: " + timerFunction(timeRemaining);
    }, 1000)
    timeoutId = setTimeout(function () {
      alert("Time's Up! You Lost");
      endGame();
    }, 17000)
  }
}

end.addEventListener('click', function () {
  endGame();
  clearTimeout(timeoutId);
});

function endGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  clearInterval(interId);
  timePassed = 0;
  timeRemaining = gameTime;
  timer.innerHTML = '';
  start.classList.remove('hidden');
  end.classList.add('hidden');
  cardsFlipped = 0;
  noClicking = false;
}

function timerFunction(time) {
  let seconds = time % 60;
  return seconds;
}
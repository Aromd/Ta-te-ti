// VARIABLES

const boxArray = Array.from(document.querySelectorAll(".box"));
// const [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix, boxSeven, boxEight, boxNine] = boxArray;
const scoreCounter = document.querySelector(".counter").children[1];
const firstTurn = document.querySelector(".turn").children[1];
const [choicex, choiceo] = Array.from(document.querySelectorAll(".btn"));
const computerArray = [];
const startButton = document.querySelector(".start");

let userFigure;
let computerFigure;
let score = 0;
let userName;
let turn;
let gameStatus = "gameover";
let userPlays = [];
let computerPlays = [];

// FUNCIONES

/* Te pide tu nombre (Está hecha con tanta malicia que te come toda la RAM hasta que le ponés nombre) */
function elegirNombre () {
    while(userName === "" || userName === undefined){
        let userName1 = prompt("Introducí tu nombre por favor");
        userName = userName1.trim();
    }
};

elegirNombre();

/*Eleccion de la figura del usuario*/
function choiceFigure () {
    if (gameStatus !== "playing") {
choicex.addEventListener("click", () => {
    choicex.classList.add("select");
    choiceo.classList.remove("select");
    return userFigure = "X", computerFigure = "O";
});

choiceo.addEventListener("click", () => {
    choiceo.classList.add("select");
    choicex.classList.remove("select");
    return userFigure = "O", computerFigure= "X";
});
    }
};

choiceFigure();

/* Boton "Comenzar a jugar" */
startButton.addEventListener('click', () => {
    if (gameStatus === "gameover" && userFigure !== undefined) {
        startButton.textContent = "Jugando...";
        firstTurnAssign();
        userPrint();
        return gameStatus = "playing";
    } else return alert("elegí una figura");
})

/*sorteo del primer turno*/
function firstTurnAssign() {
    let randomNumber = Math.floor(Math.random()*10);
    if (randomNumber >= 5) {
        firstTurn.textContent = `${userName}`;
        return turn = "player";
    } else {
        firstTurn.textContent = "Computer";
        return turn = "computer";}
}

/*cambio de turno*/
function nextTurn () {
    if (turn === "computer") {
        firstTurn.textContent = `${userName}`;
        return turn = "player";
    } else {firstTurn.textContent = `Computer`;
        return turn = "computer";
    };
}

/*imprime figura del usuario*/
function userPrint () {
boxArray.forEach(box => {
    box.addEventListener('click', () => {
        if(box.dataset.status !== "taken" && turn === "player" && gameStatus === "playing"){
        box.textContent = `${userFigure}`;
        box.dataset.status = "taken";
        userPlays.push(boxArray.indexOf(box));
        winnerChecker(userPlays);
        nextTurn();
        computerPrint();
    } else return setTimeout(computerPrintDelay(computerPrint), 1000);;
    })
});
}

/* imprime figura de la computadora */
function computerPrintDelay(print) {
    setTimeout(print, 1000);
}

function computerPrint () {
    let i = Math.floor(Math.random()*9);
    let box = boxArray[i];
    if (box.dataset.status !== "taken" && turn === "computer" && gameStatus === "playing"){
    box.textContent= `${computerFigure}`;
    box.dataset.status = "taken";
    computerPlays.push(boxArray.indexOf(box));
    winnerChecker(computerPlays);
    nextTurn();
    userPrint();
    } else return userPrint();
}

/* verifica si los numeros se encuentran dentro del array */
function containsAll (arr, ...nums) {
    for (let num of nums) {
        if (arr.indexOf(num) === -1) {
            return false;
        }
    }
    return true;
}

/* chequea si se cumple alguna jugada ganadora */
function winnerChecker(arraytocheck) {
    if ((containsAll(arraytocheck, 0, 1, 2) || containsAll(arraytocheck, 3, 4, 5) || containsAll(arraytocheck, 6, 7, 8) || containsAll(arraytocheck, 0, 3, 6) ||
    containsAll(arraytocheck, 1, 4, 7) || containsAll(arraytocheck, 2,5,8) || containsAll(arraytocheck, 2,4,6) || containsAll(arraytocheck, 0, 4, 8))) {
        if (arraytocheck === userPlays) {
        alert(`${userName} gana!`);
        score ++;
        scoreCounter.textContent = `${score}`;
        return gameStatus = "gameover";
        } else if (arraytocheck === computerPlays) {
        alert(`computer gana!`);
        return gameStatus = "gameover";
        }
    }
}
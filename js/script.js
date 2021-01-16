// VARIABLES

const boxArray = Array.from(document.querySelectorAll(".box"));
// const [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix, boxSeven, boxEight, boxNine] = boxArray;
const scoreCounter = document.querySelector(".counter").children[1];
const scorePlayer = document.querySelector(".counter__players").children[1];
const scoreComputer = document.querySelector(".counter__players").children[3];
const firstTurn = document.querySelector(".turn").children[1];
const choicex = document.querySelector(".btnx");
const choiceo = document.querySelector(".btno");
const computerArray = [];
const startButton = document.querySelector(".start");

let userFigure;
let computerFigure;
let scoreCounterPlayer = 0;
let scoreCounterComputer = 0;
let userName;
let turn;
let gameStatus = "gameover";
let userPlays = [];
let computerPlays = [];
let generalPlays = 0

// FUNCIONES

/*  Ingresar el nombre de usuario */
elegirNombre();
function elegirNombre() {
    while (userName === "" || userName === undefined) {
        let userName1 = prompt("Introducí tu nombre por favor");
        userName = userName1.trim();
    }
};

/*Eleccion de la figura del usuario*/
/* Listeners para botones de seleccion */
function choiseFigure() {
    choicex.addEventListener('click', selectX);
    choiceo.addEventListener('click', selectO);
}

choiseFigure();

/* Selecciona X */
function selectX() {
    choicex.classList.add("select");
    choiceo.classList.remove("select");
    userFigure = "X",
        computerFigure = "O";
    /* Silencia los listeners */
    choicex.removeEventListener('click', selectX);
    choiceo.removeEventListener('click', selectO);
}

/* Selecciona O*/
function selectO() {
    choiceo.classList.add("select");
    choicex.classList.remove("select");
    userFigure = "O",
        computerFigure = "X";
    /* Silencia los listeners */
    choicex.removeEventListener('click', selectX);
    choiceo.removeEventListener('click', selectO);
}

/* Boton "Comenzar a jugar" */
startButton.addEventListener('click', () => {
    if (gameStatus === "gameover" && userFigure !== undefined) {
        startButton.textContent = "Jugando...";
        firstTurnAssign();
        userPrint();
        computerPrintDelay(computerPrint);
        return gameStatus = "playing";
    } else return alert("Elegí una figura antes de comenzar la partida");
})

/*sorteo del primer turno*/
function firstTurnAssign() {
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber >= 5) {
        firstTurn.textContent = `${userName}`;
        return turn = "player";
    } else {
        firstTurn.textContent = "Computer";
        return turn = "computer";
    }
}

/*cambio de turno*/
function nextTurn() {
    if (turn === "computer") {
        firstTurn.textContent = `${userName}`;
        return turn = "player";
    } else {
        firstTurn.textContent = `Computer`;
        return turn = "computer";
    };
}

/*imprime figura del usuario*/
function userPrint() {
    boxArray.forEach(box => {
        box.addEventListener('click', () => {
            if (box.dataset.status !== "taken" && turn === "player" && gameStatus === "playing") {
                box.textContent = `${userFigure}`;
                box.dataset.status = "taken";
                userPlays.push(boxArray.indexOf(box));
                generalPlays++;
                winnerChecker(userPlays);
                nextTurn();
                computerPrintDelay(computerPrint);
            } else return computerPrintDelay(computerPrint);
        })
    });
}

/* imprime figura de la computadora */
function computerPrintDelay(print) {
    setTimeout(print, 1000);
}

function computerPrint() {
    let i = Math.floor(Math.random() * 9);
    let box = boxArray[i];
    if (box.dataset.status !== "taken" && turn === "computer" && gameStatus === "playing") {
        box.textContent = `${computerFigure}`;
        box.dataset.status = "taken";
        computerPlays.push(boxArray.indexOf(box));
        generalPlays++;
        winnerChecker(computerPlays);
        nextTurn();
        userPrint();
    } else return userPrint();
}

/* verifica si los numeros se encuentran dentro del array */
function containsAll(arr, ...nums) {
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
        containsAll(arraytocheck, 1, 4, 7) || containsAll(arraytocheck, 2, 5, 8) || containsAll(arraytocheck, 2, 4, 6) || containsAll(arraytocheck, 0, 4, 8))) {
        if (arraytocheck === userPlays) {
            alert(`${userName} gana!`);
            scoreCounterPlayer++;
            scorePlayer.textContent = `${scoreCounterPlayer}`;
            return cleanBoard();
        } else if (arraytocheck === computerPlays) {
            alert(`La maquina gana!`);
            scoreCounterComputer++;
            scoreComputer.textContent = `${scoreCounterComputer}`;
            return cleanBoard();
        }
    } else if (generalPlays === 9) {
        alert('Empate');
        return cleanBoard();
    }
}

/* Reseat todas las condiciones de partida */

function cleanBoard() {
    /* Resetea la combinacion de jugadas de la maquina  */
    computerPlays = [];
    /* Resetea la combinacion de jugadas del usuario  */
    userPlays = [];
    /* Resetea el contador de jugadas  */
    generalPlays = 0;
    /* Resetea la seleccion de figura  */
    choicex.classList.remove("select");
    choiceo.classList.remove("select");
    userFigure = undefined;
    /* Resetea el boton de jugar  */
    startButton.textContent = "Comenzar a Jugar"
    /* Limpia las casillas del tablero  */
    boxArray.forEach(box => {
        box.textContent = "";
        box.dataset.status = "";
    })
    /* Vuelve a escuchar los botones de seleccion de figura  */
    choiseFigure();
    /* Resetea el estado de la partida  */
    gameStatus = "gameover";
}

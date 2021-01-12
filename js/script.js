// VARIABLES

const boxArray = Array.from(document.querySelectorAll(".box"));
const scoreCounter = document.querySelector(".counter").children[1];
const firstTurn = document.querySelector(".turn").children[1];
const [choicex, choiceo] = Array.from(document.querySelectorAll(".btn"));
const computerArray = [];
const startButton = document.querySelector(".start");

let userFigure = "X";
let computerFigure = "O";
let score = 0;
let winner;
let userName = "Nombre";
let turn;
let gameStatus = "gameover";
let userPlays = [];
let computerPlays = [];

// FUNCIONES

/*Eleccion de la figura del usuario*/
// function choiceFigure () {
//     if (gameStatus !== "playing") {
// choicex.addEventListener("click", () => {
//     choicex.classList.add("select");
//     choiceo.classList.remove("select");
//     return userFigure = "X", computerFigure = "O";
// });

// choiceo.addEventListener("click", () => {
//     choiceo.classList.add("select");
//     choicex.classList.remove("select");
//     return userFigure = "O", computerFigure= "X";
// });
//     }
// };

// choiceFigure();

/* Boton "Comenzar a jugar" */
startButton.addEventListener('click', () => {
    if (gameStatus === "gameover") {
        startButton.textContent = "Jugando...";
        firstTurnAssign();
        return gameStatus = "playing";
    };
})

/*sorteo del primer turno*/
function firstTurnAssign() {
    let randomNumber = Math.floor(Math.random()*10);
    if (randomNumber >= 5) {
        firstTurn.textContent = `${userName}`;
        userPrint();
        // return turn = "player";        
    } else {
        firstTurn.textContent = "Computer";
        computerPrintDelay(computerPrint);
        // return turn = "computer";
    }
}


/*cambio de turno*/
// function nextTurn () {
//     if (turn === "computer") {
//         firstTurn.textContent = `${userName}`;
//         return turn = "player";
//     } else {firstTurn.textContent = `Computer`;
//         return turn = "computer";
//     };
// }

/*imprime figura del usuario*/
function userPrint () {
boxArray.forEach(box => {
    box.addEventListener('click', () => {
        if(box.dataset.status !== "taken"){
        box.textContent = `${userFigure}`;
        userPlays.push(boxArray.indexOf(box));
        winnerChecker(userPlays);
        // nextTurn();
        if(gameStatus !== "gameover" ){
            computerPrintDelay(computerPrint);
        }
    };
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
    if (box.dataset.status !== "taken"){
    box.textContent= `${computerFigure}`;
    box.dataset.status = "taken";;
    computerPlays.push(boxArray.indexOf(box));
    winnerChecker(computerPlays);
    // nextTurn();
    if(gameStatus !== "gameover" ){
        userPrint();
    }
    };
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
        console.log(`${userName} gana!`);
        return gameStatus = "gameover";
        } else if (arraytocheck === computerPlays) {
        console.log(`computer gana!`);
        return gameStatus = "gameover";
        }
    }
}


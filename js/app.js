/*---------------------------- Variables (state) ----------------------------*/
let boardOptions;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const msgEl = document.getElementById('message'); 
const resetBtnEl = document.getElementById('reset');


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*-------------------------------- Functions --------------------------------*/
function reset () {
    init();
    resetBtnEl.style.backgroundColor = 'black';
    resetBtnEl.style.color = 'yellow';

}


function checkForTie () {
    if(winner) 
        return;
    for (let i = 0; i < boardOptions.length; i++) {
        if (boardOptions[i] === '') {
            tie = false;
            console.log(tie);
        } 
        else {
            tie = true;
            console.log(tie);
        }
    }
}

function checkWinner () {
    for (let i = 0; i < winningCombos.length; i++) { 
        const winnerOp = winningCombos[i];
        const sq1 = boardOptions[winnerOp[0]];
        const sq2 = boardOptions[winnerOp[1]];
        const sq3 = boardOptions[winnerOp[2]];

        if (sq1 !== '' || sq2 !== '' || sq3 !== '') {
            if (sq1 === sq2 && sq1 === sq3) {
                winner = true;
                msgEl.textContent = `${turn} won`;
                return;
            }
        }
    }
}

function placePiece (index) {
    boardOptions[index] = turn;
}

function handleClick(event) {
    const sqIdx = event.target.id;
    if (boardOptions[sqIdx] === 'X' || boardOptions[sqIdx] === 'O' && winner === true) {
        return; 
    }

    placePiece(sqIdx);
    checkWinner();
    checkForTie ()
    render();
}

function updateMessage () {
    if (winner === false && tie === false) {
        turn = (turn === 'X') ? 'O' : 'X';
        msgEl.textContent = `${turn}'s turn`;
    } 
    else if (winner === false && tie === true) {
        msgEl.textContent = 'Its a tie. Play Again';
    } 
    else if (winner === true && tie === false) {
        msgEl.textContent = `${turn} won`;
    } 
}


function updateBoard () {
    boardOptions.forEach((i, idx) => {
        const squareEl = squareEls[idx];
        squareEl.textContent = i;
    })
}

function render () {
    updateBoard();
    updateMessage();
}

function init () {
    boardOptions = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();

    
}
init()
/*----------------------------- Event Listeners -----------------------------*/



squareEls.forEach((El) => {
    El.addEventListener('click', handleClick)
});
resetBtnEl.addEventListener('click', reset)


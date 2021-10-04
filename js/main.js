'use strict';

var gBoard = [];



const MINE = '💣';
const EMPTY_CELL = '';
const CELL = ''
var neighbors = 0;

const ROWS = 4;
const COLS = 4;

var gMines = [];
var flags = 1;

// const bombsArray = Array(bombAmount).fill('bomb')
// const emptyArray = Array(width*width - bombAmount).fill('valid')
// const shuffledArray = gameArray.sort(() => Math.random() -0.5)


var gCellObject = {
    isShown: false,
    cellShown: CELL,
    cellContain: EMPTY_CELL,
    numberOfMines: 0
};

var gCell = {
    // cellContain: '',
    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: false,
    // cellShown: CELL,
    isRightClicked: false
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function init() {
    console.log('init');
    gBoard = createBoard(4, 4);
    setMinesNegsCount();
    renderBoard(gBoard);
    console.log(gBoard);
}


function createBoard(rows, cols) {
    var board = [];

    for (var i = 0; i < rows; i++) {
        // board.push([]);
        board[i] = [];
        for (var j = 0; j < cols; j++) {
            board[i][j] = gCell;
        }
    }
    // board[0][0].cellContain = MINE;
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    var minesLocations = mines();
    var minesIdx = 0;
    console.log(minesLocations);
    
    for (var i = 0; i < board.length && minesIdx < gLevel.MINES; i++) {
        var row = board[i];
        strHTML += '<tr>\n';

        for (var j = 0; j < row.length; j++) {
            // console.log(('i j',minesLocations[i].i,minesLocations[i].j));
            // console.log(minesLocations[0]);
            // console.log(minesLocations[1]);
            // console.log(minesLocations[2]);

            var cell = row[j];
            // console.log('cell', cell.cellContain);
            // figure class name
            var cellClass = getClassName({
                i: i,
                j: j
            });
            // if(cell.cellContain === EMPTY_CELL) cellClass+=' hiddenCell';
            var className = 'cell';

            // minesIdx = i;
            // if ((minesLocations[minesIdx].i === i) && (minesLocations[minesIdx].j === j)) {
            //     className = 'mine';
            //     minesIdx++
            // }
            if(isThere(minesLocations[i],i,j))

            var tdId = `cell-${i}-${j}`;
            strHTML += `<td id="${tdId}" class="${className}"
             onclick="cellClicked(this, ${i} , ${j} )"></td>`
        }

        // ${cell.cellShown}</td>`
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = strHTML;

    // for (var i = 0; i < board.length; i++) {
    //     var totalMines = 0;
    //     for (var j = 0; j < board[i].length; j++) {
    //         // if ()

    //     }
    // }
}

function mines() {
    var minesIdx = []
    for (var i = 0; i < gLevel.MINES; i++) {
        minesIdx[i] = getRandomMineLocation();
    }

    minesIdx.sort();
    console.log(minesIdx);
    return minesIdx;
}

function cellClicked(elCell, i, j) {
    console.log(elCell);
    var currentId = elCell.id
    // if (isGameOver) return
    if (elCell.classList.contains('checked')) return
    if (elCell.classList.contains('bomb')) {
        //   gameOver(square)
    } else {
        if (elCell.classList.contains('cell')) {
            elCell.classList.remove('cell');
        }
        var total = elCell.getAttribute('data')
        if (total != 0) {
            elCell.classList.add('checked')
            if (total == 1) elCell.classList.add('one')
            if (total == 2) elCell.classList.add('two')
            if (total == 3) elCell.classList.add('three')
            if (total == 4) elCell.classList.add('four')
            elCell.innerHTML = total
            return
        }
        checkSquare(elCell, currentId)
    }
    elCell.classList.add('checked')







    // var el = document.getElementById(elCell.id);
    // var cell = document.querySelector('#' + elCell.id)
    // var str = gBoard[i][j].cellContain;
    // console.log('clicked');

    // if (isGameOver) return
    // if (!elCell.classList.contains('checked')) {
    //   if (!elCell.classList.contains('flag')) {
    //     elCell.classList.add('flag')
    //     elCell.innerHTML = ' 🚩'
    //     flags ++
    //     flagsLeft.innerHTML = bombAmount- flags
    //     // checkForWin()
    //   } else {
    //     elCell.classList.remove('flag')
    //     elCell.innerHTML = ''
    //     flags --
    //     flagsLeft.innerHTML = bombAmount- flags
    //   }
    // }


}
function isThere(mines,i,j){

    for(var i = 0;i < mines.length;i++){
        if(mines[i].i===i && mines[i].j ===j){
            return true;
        }
    }

}

function setMines(numsOfMines) {
    for (var idx = 0; idx < 2; idx++) {


        var i = getRandomIntInt(0, 4);
        var j = getRandomIntInt(0, 4);

        var mine = {
            location: {
                i: i,
                j: j
            },
            isFlaged: false,
            cellContain: MINE,
            cellShown: EMPTY_CELL
        };

        gBoard[i][j] = mine;
    }

}

function setMinesNegsCount(board) {

    for (var idx = 0; idx < 2; idx++) {


        var i = getRandomIntInt(0, 4);
        var j = getRandomIntInt(0, 4);

        var mine = {
            location: {
                i: i,
                j: j
            },
            isFlaged: false,
            cellContain: MINE,
            cellShown: EMPTY_CELL
        };

        gBoard[i][j] = mine;
    }

    // for(var i = 0; i < board.length;i++){
    //     var numOfNeg = 0;
    //     for(var j = 0; j < board[i]; j++){

    //     }
    // }



    // gBoard[0][0] = gCellObject;
    // gBoard[0][0].cellContain=MINE
    // for (var idx = 0; idx < 2; idx++) {
    //     var i = getRandomIntInt(0, 4);
    //     var j = getRandomIntInt(0, 4);
    //     console.log('k',gBoard[i][j].cellContain);
    //     board[i][j].cellContain = MINE;
    //     console.log('i j ',i,j);
    // }



    // for(var i = 0 ; i < gBoard.length;i++){
    //     for(var j = 0; j < gBoard[0];j++){


    //     }
    // }
}

function getRandomMineLocation() {
    var location = {
        i: getRandomIntInt(0, gLevel.SIZE),
        j: getRandomIntInt(0, gLevel.SIZE)
    };
    return location;
}

function renderCell() {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}



function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;

    return cellClass;
}

function getRandomIntInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function neg(gBoard) {

    for (var i = 0; i < gBoard.length; i++) {
        var board = gBoard[i];
        var totalMines = 0;
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].classList.contains('mine')) {


                //left ccorner , right corner , first line
                if (i === 0 && j === 0) {

                    if (gBoard[i + 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i + 1][j + 1].classList.contains('mine')) totalMines++;
                } else if (i === 0 && j === gBoard.length - 1) {
                    if (gBoard[i + 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j - 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i + 1][j - 1].classList.contains('mine')) totalMines++;
                } else if (i === 0) {
                    if (gBoard[i + 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i + 1][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j - 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i + 1][j - 1].classList.contains('mine')) totalMines++;
                }

                //

                if (i === gBoard.length - 1 && j === 0) {

                    if (gBoard[i - 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i - 1][j + 1].classList.contains('mine')) totalMines++;
                } else if (i === gBoard.length - 1 && j === gBoard.length - 1) {
                    if (gBoard[i - 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j - 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i - 1][j - 1].classList.contains('mine')) totalMines++;
                } else if (i === gBoard.length - 1) {
                    if (gBoard[i - 1][j].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i - 1][j + 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i][j - 1].classList.contains('mine')) totalMines++;
                    if (gBoard[i - 1][j - 1].classList.contains('mine')) totalMines++;
                }


                if ((0 < i && i < gBoard.length - 1) && (0 < j && j < gBoard.length - 1)) {

                    if (gBoard[i - 1][j - 1].classList.contains('mine')) totalMines++; //LEFT UP CORNER
                    if (gBoard[i - 1][j].classList.contains('mine')) totalMines++; // UP
                    if (gBoard[i - 1][j + 1].classList.contains('mine')) totalMines++; // UP right corner
                    if (gBoard[i][j + 1].classList.contains('mine')) totalMines++; // RIGHT
                    if (gBoard[i + 1][j + 1].classList.contains('mine')) totalMines++; // DOWN RIGHT CORNER
                    if (gBoard[i + 1][j].classList.contains('mine')) totalMines++; //DOWN
                    if (gBoard[i + 1][j - 1].classList.contains('mine')) totalMines++; //DOWN LEFT CORNERS
                    if (gBoard[i][j - 1].classList.contains('mine')) totalMines++; //LEFT
                }
                board[i][j].minesAroundCount = total;
                board[i][j].setAttribute('data', total)
            }
            totalMines = 0;
        }
    }


}
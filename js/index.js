import { rock, knight, bishop, king, queen,pawn } from './allAssests.js';

const ChessBoard = document.querySelector(".chess-board");

const chessPices = [
    rock,knight,bishop,queen,king,bishop,knight,rock,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rock,knight,bishop,queen,king,bishop,knight,rock
]


function createChessBoard(){
    chessPices.forEach((piece,i)=>{
        const onePiece = document.createElement("div");
        onePiece.innerHTML = piece;
        onePiece.classList.add("chess-board-box");
        
        const _row = Math.floor(i/8);
        onePiece.classList.add(`piece-color-${_row  <= 1 ? "1" : "2"}`);
        if (i%2 === 0) {
            onePiece.classList.add(`box-bg-${_row%2 ===0 ? "1" : "2"}`);
        } else {
            onePiece.classList.add(`box-bg-${_row%2 ===0 ? "2" : "1"}`);
        }
        ChessBoard.append(onePiece)
    })
}

createChessBoard()
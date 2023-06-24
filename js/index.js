import { rock, knight, bishop, king, queen,pawn } from './allAssests.js';

let playerGo = "black"; // 0 => black

const ChessBoard = document.querySelector("#chess-board");

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
        onePiece.setAttribute("chess-box-id", i);
        onePiece.classList.add("chess-board-box");
        onePiece.firstChild?.setAttribute("draggable", true)
        const _row = Math.floor(i/8);
        if (_row <=1 ) {
            onePiece.firstChild.firstChild.classList.add(`black`);
        } else if(_row >= 6) {
            onePiece.firstChild.firstChild.classList.add(`white`);
        }
        if (i%2 === 0) {
            onePiece.classList.add(`box-bg-${_row%2 ===0 ? "1" : "2"}`);
        } else {
            onePiece.classList.add(`box-bg-${_row%2 ===0 ? "2" : "1"}`);
        }
        ChessBoard.append(onePiece)
    })
}

createChessBoard()




let dragStartElement;
let dragStartBoxIndex;

const boxDragStart = (e) => {
    console.log("dragStart");
    dragStartElement = e.target;
    dragStartBoxIndex = e.target.parentNode;
    // console.log("dragStart",e.target.parentNode.getAttribute(""));
}

const onBoxDragOver = (e) => {
    e.preventDefault()
}

const onBoxDrop = (e) => {
    e.stopPropagation()
    console.log("drop",e.target);
    if (e.target.classList.contains("chess-piece")) {
        e.target.parentNode.append(dragStartElement)
        e.target.remove()
    } else {
        e.target.append(dragStartElement)
    }
    changePlayer();
}

const allChessBoardBoxes = document.querySelectorAll("#chess-board .chess-board-box");
allChessBoardBoxes.forEach((box)=>{
    box.addEventListener("dragstart", boxDragStart)
    box.addEventListener("dragover", onBoxDragOver)
    box.addEventListener("drop", onBoxDrop)
})

function changePlayer(){
    if (playerGo === "black") {
        playerGo = "white";
        reversBoxIds()
    } else {
        playerGo = "black";
        reversBoxIds(true)
    }
}

const reversBoxIds = (revert = false) => {
    const allChessBoxs = document.querySelectorAll(".chess-board-box");
    allChessBoxs.forEach((box,i)=>{
        if (revert) {
            box.setAttribute("chess-box-id", i);
        } else {
            box.setAttribute("chess-box-id", 63 - i);
        }
    })
}
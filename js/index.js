import { rock, knight, bishop, king, queen,pawn } from './allAssests.js';

let playerGo = "black"; // 0 => black
const playGoElement = document.querySelector("#playerGo");

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
    playGoElement.innerHTML = playerGo;

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
    dragStartBoxIndex = e.target.parentNode.getAttribute("chess-box-id");
    // console.log("dragStart",e.target.parentNode.getAttribute(""));
}

const onBoxDragOver = (e) => {
    e.preventDefault()
}

const onBoxDrop = (e) => {
    e.stopPropagation()
    const correctGo = dragStartElement.firstChild.classList.contains(playerGo);
    // const taken = e.target.classList.contains("chess-piece");
    // const valid = isMoveValid(e.target);
    // const opponentGo = playerGo === "black" ? "white" : "black";
    // const takenByOpponent = e.target.firstChild?.classList?.contains(opponentGo);
    // console.log("correctGo",correctGo);
    // console.log("taken",taken);
    // console.log("opponentGo",opponentGo);
    // console.log("takenByOpponent",takenByOpponent);

    if (correctGo) {   
        if (e.target.classList.contains("chess-piece")) {
            e.target.parentNode.append(dragStartElement)
            e.target.remove()
        } else {
            e.target.append(dragStartElement)
        }
        changePlayer();
    }
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
    playGoElement.innerHTML = playerGo;
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

const isMoveValid = (target) => {
    const piece = dragStartElement.id;
    const startId = Number(dragStartBoxIndex);
    const targetId = Number(target.getAttribute("chess-box-id")) || Number(target.parentNode.getAttribute("chess-box-id"))
    console.log("currentPiece",piece);
    console.log("startId", startId);
    console.log("targetId", targetId);

    switch(piece) {
        case "pawn":
            const goingOneStep = targetId === startId + 8;
            const goingTwoStep = targetId === startId + 16;
            const goingSideLeft = targetId === startId + 7;
            const goingSideRight = targetId === startId + 9;
            const isThereElementOnTarget = Boolean(document.querySelector(`[chess-box-id="${targetId}"]`).firstChild)
            if (7 <= startId <= 15) {
                if(((goingOneStep || goingTwoStep) || !isThereElementOnTarget)) {
                    return true
                } else {
                    return false
                }
            } else {
                if( (goingOneStep && !isThereElementOnTarget ) || (( goingSideLeft )||( goingSideRight )&&isThereElementOnTarget)) {
                    return true
                } else {
                    return false
                }
            }

    }
}
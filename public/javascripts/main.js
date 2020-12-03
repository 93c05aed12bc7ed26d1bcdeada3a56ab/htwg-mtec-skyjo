function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        $.get('/newPlayer/' + element);
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
console.log("entered uncover");
    $.get('/uncover/' + x + '/' + y + '/' + player);
    console.log("blub1");
    getGameBoardFromJson();
}

function drawCard() {
    $.get("/drawCard");
    getGameBoardFromJson();
}

function tradeCard() {
    $.get("/tradeCard");
    getGameBoardFromJson();
}

function newGame() {
    $.get("/newGame");
    getGameBoardFromJson();
}

function undo() {
    $.get("/undo");
    getGameBoardFromJson();
}

function redo() {
    $.get("/redo");
    getGameBoardFromJson();
}

function about(){
    $.get("/about");
}

function registerClickListener(json) {
    let y = 0;
    let x = 0;
    for (let i=0; i<json.gameBoard.numPlayer; i++){
        for (let j=0; j<12; j++) {
            console.log("j: "+ j+ " x: "+x+" y: "+ y+ " i: "+i);
            $("#player"+j+i).click(function() {uncover(x, y, i)});
            x++;
            if (x === 4) {
            x = 0;
            y++;
            }
        }
    }
}

function updateGameBoard(json){
    console.log(json);
    console.log("entered updateGameBoard");
    for (let i=0; i<json.gameBoard.numPlayer; i++){
        for (let j=0; j<12; j++) {
            if (json.gameBoard.player[0][i].hand[0].card.isUncovered === true){
                $("#player"+j+i).html(json.gameBoard.player[0][i].hand[j].card.value);
            }
            else
                $("#player"+j+i).html("#");
        }
    }
}

function getGameBoardFromJson(){
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            updateGameBoard(result);
            registerClickListener(result)
        }
    });
}

$( document ).ready(function() {
    console.log( "Document is ready, filling grid" );
    getGameBoardFromJson();
});
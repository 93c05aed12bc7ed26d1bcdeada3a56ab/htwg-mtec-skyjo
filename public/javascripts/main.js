function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        $.get('/newPlayer/' + element);
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
    $.get('/uncover/' + x + '/' + y + '/' + player);
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
    for (let i=0; i<json.gameBoard.numPlayer; i++){
        for (let j=0; j<12; j++) {
            if (x > 4)
                var x = j/4;
            else
                var x = j;
            var y = j%4;
            $("#player"+j+i).click(function() {uncover(x, y, i)});
        }
    }
}

function updateGameBoard(json){

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
            registerClickListener(json)
        }
    });
}

$( document ).ready(function() {
    console.log( "Document is ready, filling grid" );
    getGameBoardFromJson()
});
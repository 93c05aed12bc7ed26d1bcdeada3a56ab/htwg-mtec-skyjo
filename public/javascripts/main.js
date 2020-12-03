let jsonResult;

function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        $.get('/newPlayer/' + element);
        console.log("new player erstellt");
        newPlayerSet = true;
        window.location.reload(false);
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
    console.log("entered uncover with x:"+x+" y:"+y+" player:"+player);
    $.get('/uncover/' + x + '/' + y + '/' + player);
    getGameBoardFromJson();
}

function drawCard() {
    $.get("/drawCard");
}

function tradeCard() {
    $.get("/tradeCard");
}

function newGame() {
    $.get("/newGame");
}

function undo() {
    $.get("/undo");
}

function redo() {
    $.get("/redo");
}

function about(){
    $.get("/about");
}

function registerClickListener() {
    console.log("entered registerClickListener");

    $("#trade").click(function() {tradeCard()});
    $("#draw").click(function() {drawCard()});

    for (let i=0; i<jsonResult.gameBoard.numPlayer; i++){
            $("#player0"+i).click(function() {uncover(0, 0, i)});
            $("#player1"+i).click(function() {uncover(1, 0, i)});
            $("#player2"+i).click(function() {uncover(2, 0, i)});
            $("#player3"+i).click(function() {uncover(3, 0, i)});
            $("#player4"+i).click(function() {uncover(0, 1, i)});
            $("#player5"+i).click(function() {uncover(1, 1, i)});
            $("#player6"+i).click(function() {uncover(2, 1, i)});
            $("#player7"+i).click(function() {uncover(3, 1, i)});
            $("#player8"+i).click(function() {uncover(0, 2, i)});
            $("#player9"+i).click(function() {uncover(1, 2, i)});
            $("#player10"+i).click(function() {uncover(2, 2, i)});
            $("#player11"+i).click(function() {uncover(3, 2, i)});
    }
}

function updateGameBoard(){
    console.log("entered updateGameBoard");
    console.log(jsonResult);
    $("#trade").html(jsonResult.gameBoard.deck.discardPile[jsonResult.gameBoard.numDiscardPile-1][1].value);

    for (let i=0; i<jsonResult.gameBoard.numPlayer; i++){
        for (let j=0; j<12; j++) {
            if (jsonResult.gameBoard.player[0][i].hand[j].card.isUncovered === true){
                $("#player"+j+i).html(jsonResult.gameBoard.player[0][i].hand[j].card.value);
            }
            else
                $("#player"+j+i).html("#");
        }
    }
}

function getGameBoardFromJson(){
    console.log("json daten holen");
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            jsonResult = result;
            updateGameBoard();
            registerClickListener();
        }
    });
}

$( document ).ready(function() {
    console.log( "Document is ready" );
    getGameBoardFromJson();
});
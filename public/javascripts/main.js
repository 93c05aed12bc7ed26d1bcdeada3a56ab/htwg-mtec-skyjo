let jsonResult;

function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        $.ajax({
                method: "GET",
                url: "/newPlayer/"+element,
                dataType: "json"
                });
        console.log("new player erstellt");
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
    console.log("entered uncover with x:"+x+" y:"+y+" player:"+player);
    $.get('/uncover/' + x + '/' + y + '/' + player);
}

function newGame() {
    console.log("Neues Spiel gestartet")
    $.get("/newGame");
}

function drawCard() {
    console.log("Karte gezogen")
    $.get("/drawCard");
}

function tradeCard() {
    console.log("Karte tauschen aktiv")
    $.get("/tradeCard");
}

function undo() {
    console.log("Spielzug rückgängig")
    $.get("/undo");
}

function redo() {
    console.log("Spielzug wiederholen")
    $.get("/redo");
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

    $("#playerBoard").html("");

    for(let i=0; i<jsonResult.gameBoard.numPlayer; i++){
        $("#playerBoard").append(`
           <div class="container-fluid player-table">
            <div class="row player-row">
                <div class="col player-name">${jsonResult.gameBoard.player[0][i].name}</div>
            </div>
            <div class="row player-row">
                <div id="player0${i}" class="col-3 player-col"></div>
                <div id="player1${i}" class="col-3 player-col"></div>
                <div id="player2${i}" class="col-3 player-col"></div>
                <div id="player3${i}" class="col-3 player-col"></div>
            </div>
            <div class="row player-row">
                <div id="player4${i}" class="col-3 player-col"></div>
                <div id="player5${i}" class="col-3 player-col"></div>
                <div id="player6${i}" class="col-3 player-col"></div>
                <div id="player7${i}" class="col-3 player-col"></div>
            </div>
            <div class="row player-row">
                <div id="player8${i}" class="col-3 player-col"></div>
                <div id="player9${i}" class="col-3 player-col"></div>
                <div id="player10${i}" class="col-3 player-col"></div>
                <div id="player11${i}" class="col-3 player-col"></div>
            </div>
        </div>
        `);
    }

    for (let i=0; i<jsonResult.gameBoard.numPlayer; i++){
        for (let j=0; j<12; j++) {
            if (jsonResult.gameBoard.player[0][i].hand[j].card.isUncovered === true){
                $("#player"+j+i).html(jsonResult.gameBoard.player[0][i].hand[j].card.value);
            }
            else
                $("#player"+j+i).append(`
                     <p>
                         <img height="70" src="assets/images/Karte.jpg" width="50">
                     </p>
                `);
        }
    }

}

let dp = [];
let skyjoScore = [];
let gameBoardEmpty = [false];

function getGameBoardFromJson(){
    console.log("json daten holen (GET /json)");
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            jsonResult = result;
            dp.length = 0;
            dp.push(jsonResult.gameBoard.deck.discardPile[0][1].value);

            skyjoScore.length = 0;
            for(let i=0; i<jsonResult.gameBoard.numPlayer; i++){
                skyjoScore.push({name: jsonResult.gameBoard.player[0][i].name, points: jsonResult.gameBoard.player[0][i].points});
            }
            gameBoardEmpty.length = 0;
            if(jsonResult.gameBoard.numPlayer > 0){
                gameBoardEmpty.push(true);
            }else {
                gameBoardEmpty.push(false);
            }

            updateGameBoard();
            registerClickListener();
        }
    });
}

function connectWebSocket(){
    var websocket = new WebSocket("wss://skyjo-htwg.herokuapp.com/websocket");
    websocket.setTimeout

    websocket.onopen = function(event) {
        console.log("Connected to Websocket")
    }

    websocket.onclose = function () {
        console.log("Connection with Websocket Closed!");
        connectWebSocket()
    }

    websocket.onerror = function (error) {
        console.log("Error in Websocket Occured: " + error);
    }

    websocket.onmessage = function (e) {
        if(typeof e.data === "string") {
            console.log("Retrieve json from Server")
            jsonResult = JSON.parse(e.data);
            dp.length = 0;
            dp.push(jsonResult.gameBoard.deck.discardPile[0][1].value);
            skyjoScore.length = 0;

            for(let i=0; i<jsonResult.gameBoard.numPlayer; i++){
                skyjoScore.push({name: jsonResult.gameBoard.player[0][i].name, points: jsonResult.gameBoard.player[0][i].points});
            }
            gameBoardEmpty.length = 0;
            if(jsonResult.gameBoard.numPlayer > 0){
                gameBoardEmpty.push(true);
            }else {
                gameBoardEmpty.push(false);
            }

            updateGameBoard();
            registerClickListener();
        }
    };
}


$( document ).ready(function() {
    console.log( "Document is ready" );
    getGameBoardFromJson();
    connectWebSocket();

});

function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        $.get('/newPlayer/' + element)
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
    $.get('/uncover/' + x + '/' + y + '/' + player)
}

function drawCard() {
    $.get("/drawCard")
}

function tradeCard() {
    $.get("/tradeCard")
}

function newGame() {
    $.get("/newGame")
}

function undo() {
    $.get("/undo")
}

function redo() {
    $.get("/redo")
}

function about(){
    $.get("/about")
}

function updateGameBoard(){

}

$( document ).ready(function() {
    console.log( "Document is ready, filling grid" );
    loadJson();
});
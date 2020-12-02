function setNewPlayer() {
    let element = document.getElementById("newplayername").value;
    if (element != "") {
        location.href='/newPlayer/' + element;
    } else
        alert("Please input Player Name");
}

function uncover(x, y, player) {
    //location.href='/uncover/' + x + '/' + y + '/' + player;
    let obj = {uncover:"", player:player, x:x, y:y};
    let myJson = JSON.stringify(obj);
    $.post("/uncover", myJson)
}

function drawCard() {
    $.get("/drawCard")
}

function tradeCard() {
    $.get("/tradeCard")
}
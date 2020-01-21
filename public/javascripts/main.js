function setNewPlayer() {
    let element = document.getElementById("newplayername").value;

    if (element !== "") {
        $.ajax({
            method: "GET",
            url: "/newPlayer/" + element,
            dataType: "html",
        })
    } else {
        alert("Please input Player Name");
    }
}
function skyjo() {
    document.getElementById("New Game");
    $.ajax({
        method: "GET",
        url: "/",
        dataType: "json",
        async: false,
        })
}

function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",
        async: false,

        success: function(result) {
            skyjo();
        }
    });
}

function uncover(x, y, player) {
    $.ajax(
        {
            method: "GET",
            url: "/uncover/" + x + "/" + y + "/" + player,
            dataType: "html"
        }
    )
    //location.href='/uncover/' + x + '/' + y + '/' + player;
}

function connectWebSocket() {
    var websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout = -1;

    websocket.onopen = function (event) {
        console.log("Connected to Websocket");
        websocket.send("connect");
    };

    websocket.onclose = function () {
        console.log("Connection with Websocket closed!");
        connectWebSocket();
    };

    websocket.onerror = function (error) {
        console.log("Error in Websocket Occurred: " + error);
        connectWebSocket();
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            let json = JSON.parse(e.data);
        }
    };
}

$(document).ready(function() {
    skyjo();
    new newGame();
    loadJson();
});



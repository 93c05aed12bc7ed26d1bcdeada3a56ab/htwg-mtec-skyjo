function setNewPlayer() {
    let element = document.getElementById("newplayername").value;

    if (element !== "") {
        $.ajax({
            method: "GET",
            url: "/newPlayer/" + element,
            dataType: "html",

            success:
                alert("New Player created: " + element),

       });
    } else {
        alert("Please input Player Name");
    }
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



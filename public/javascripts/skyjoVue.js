let skyjoScore =[{name: "", points: ""}]
for(let i=0; i<jsonResult.gameBoard.numPlayer; i++){
    skyjoScore.push({name: jsonResult.gameBoard.player[0][i].name, points: jsonResult.gameBoard.player[0][i].points})
}


$( document ).ready(function() {
    var scoreboard = new Vue({
        el: '#skyjo-game',
    })
});


Vue.component('skyjo-scoreboard', {
    template:`
        <div id="scoreboard" class="col scoreboard">
            <div class="scoreboard-head">Scoreboard</div>
            <div v-for="p in scoreboardPlayers" class="scoreboard-player">{{ p.name }} {{ p.points }}</div>
        </div>
    `,
    data: function () {
        return {
            scoreboardPlayers: skyjoScore
        }
    }
})
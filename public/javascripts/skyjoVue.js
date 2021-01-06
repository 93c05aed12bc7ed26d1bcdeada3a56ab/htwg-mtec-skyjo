
$( document ).ready(function() {
    var skyjo = new Vue({
        el: '#skyjo-game',
        data: {
            isDefined: gameBoardEmpty
        }
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

Vue.component('skyjo-gamedeck', {
    template:`
        <div class="row head-table">
            <div id="trade" class="col deckAndPile">{{ discardPileValue }}</div>
            <div id="draw" class="col deckAndPile">
                #
            </div>
        </div>
    `,
    data: function () {
        return {
            discardPileValue: discardPile
        }
    }
})
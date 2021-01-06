$( document ).ready(function() {
    var scoreboard = new Vue({
        el: '#scoreboard',
        data: {
            name: jsonResult.gameBoard.player[0][0].name
        }
    })
})


Vue.component('sudoku-highlight-button-bar', {
    template:`
        <div class="buttonbarcontainer">
            <label>
                Highlight
            </label>
            <div  class=" btn-group" >
                <a v-for="item in menuItems" v-bind:href="item.link" class="btn btn-primary"> {{item.text}} </a>
            </div>
        </div>
    `,
    data: function () {
        return {
            menuItems: sudokuHighlightButtons
        }
    }

})
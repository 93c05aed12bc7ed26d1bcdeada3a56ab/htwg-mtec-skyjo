<template>
  <div id="scoreboard" class="col scoreboard">
    <div class="scoreboard-head">Scoreboard</div>
    <div v-for="p in scoreboardPlayers" class="scoreboard-player" :key="p">
      {{ p.name }} {{ p.points }}
    </div>
  </div>
</template>

<script>
export default {
  name: "skyjo-scoreboard",
  data: () => ({
    scoreboardPlayers: []
  })
};
</script>

<style lang="scss">
.scoreboard {
    font-size: 24px;
    margin-top: 15px;
}
.scoreboard-head {
    /*text-decoration: underline;*/
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 2px solid black;
}
.scoreboard-player {
    padding: 0;
    margin: 0;
}
</style>

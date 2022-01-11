<script lang="ts">

  export let letter: string;
  export let rightWord: string;
  export let idx: number;
  export let showColor: boolean;
  export let active: boolean;

  let status: string;

  $: {
    if(rightWord[idx] === letter) {
      status = "right";
    } else if(rightWord.indexOf(letter) != -1) {
      status = "wrong-place";
    } else if(letter) {
      status = "wrong";
    }
  }

</script>

<div class="cell {showColor ? status : ''}" class:active>
  {letter ?? ''}
</div>

<style lang="scss">
  .cell {
    width: 64px;
    height: 64px;
    border-radius: 10px;
    margin: 0 auto;

    color: white;
    font-size: 2em;
    font-weight: bold;
    background-color: #615458;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    border: 5px solid #615458;
    background: none;
  }

  .wrong {
    background-color: #312a2c;
  }

  .right {
    background-color: #3aa394;
  }

  .wrong-place {
    background-color: #d3ad69;
  }
</style>
<script lang="ts">

  import { confirm } from 'promise-bs-dialogs';

  // TODO: improve the word list
  import words from '../assets/words.json';

  import Cell from "./Cell.svelte";

  let rows = [
    '',
    '',
    '',
    '',
    '',
    '',
  ]
  let status: 'playing' | 'won' | 'lost';
  let rightWord: string;
  let currentRow = 0;

  function handleEnter() {
    if(rows[currentRow].length < 5) return;

    if(rows[currentRow] === rightWord) {
      status = 'won';
      confirm({
        title: 'You won!',
        message: 'You found the word ' + rightWord,
        cancelText: 'Close',
        confirmText: 'Play again',
      }).then(result => {
        if(result) startGame();
      });
    }

    if (currentRow < rows.length - 1) {
      currentRow++;
    } else {
      status = 'lost';
      confirm({
        title: 'You lost!',
        message: `The word was ${rightWord}`,
        cancelText: 'Close',
        confirmText: 'Play again',
      }).then(result => {
        if(result) startGame();
      });  
    }
  }

  function handleKeyDown(e: KeyboardEvent) {

    if(status !== 'playing') return;
  
    if(e.code.startsWith('Key') && rows[currentRow].length < 5) {
      rows[currentRow] += removeSpecialChars(e.key.toUpperCase());

    } else if (e.code === 'Backspace') {
      rows[currentRow] = rows[currentRow].slice(0, -1);

    } else if (e.code === 'Enter') {
      handleEnter();
    }

  }

  function removeSpecialChars(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  function startGame() {
    status = 'playing';
    currentRow = 0;
    rightWord = removeSpecialChars(words[Math.floor(Math.random() * words.length)].toUpperCase());
    console.log(rightWord);
    rows = [
      '',
      '',
      '',
      '',
      '',
      '',
    ]
  }

  startGame();

</script>

<svelte:window on:keydown={handleKeyDown}/>

<div class="d-flex flex-column align-items-center">
  <div class="grid mb-3">
    {#each rows as word, rowIdx}
      {#each [...word].concat(new Array(5 - word.length)) as letter, letterIdx}
        <Cell 
          {letter} 
          {rightWord} 
          idx={letterIdx} 
          showColor={rowIdx < currentRow}
          active={rowIdx === currentRow && status === 'playing'}
        />
      {/each}
    {/each}
  </div>
  
  {#if status !== 'playing'}
    <button class="btn btn-secondary" on:click={startGame}>Play again</button>
  {/if}
</div>

<style lang="scss">
  .grid {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 10px;
    
    max-width: 450px;
    margin: 0 auto;
  }
</style>
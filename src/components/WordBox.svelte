<script>
  import { wordBox, wordDrag } from "$lib/store.svelte";
  import { onMount } from "svelte";

  let dictionaryWords = [];


  // onMount(async () => {
  //   const response = await fetch('/words_dictionary.json');
  //   const data = await response.json();
  //   dictionaryWords = Object.keys(data);
  // });

  onMount(async () => {
    const response = await fetch('/words.txt');
    const data = await response.text();
    dictionaryWords = data
      .split(/\r?\n/)
      .map(word => word.trim())
      .filter(word => word.length > 0);
    console.log(dictionaryWords);
  });



  function addWordBox() {
    const newWord = {
      word: wordBox.current.input
    };
    wordBox.current.collection.push(newWord);
    console.log(wordBox.current.collection);
    wordBox.current.input = '';
  }

  function dragging(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const draggedWord = {
      id: index,
      word: wordBox.current.collection[index].word
    };
    wordBox.current.wordDrag = draggedWord;
  }

  function deleteWord(e) {
    e.preventDefault(); 
    const index = parseInt(e.target.getAttribute('data-index'));
    wordBox.current.collection.splice(index, 1);
  }

  function generateRandomWords(count) {
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * dictionaryWords.length);
      const randomWord = dictionaryWords[randomIndex];
      wordBox.current.collection.push({ word: randomWord });
    }
  }

  function shuffle() {
    for (let i = wordBox.current.collection.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordBox.current.collection[i], wordBox.current.collection[j]] = [wordBox.current.collection[j], wordBox.current.collection[i]];
    }
  }

  function emptyArray() {
    wordBox.current.collection = [];
  }
</script>

<div class="encapsulation">
  <p class="heading">Word Box</p>
  <div class="word-box">
    
    <div class="words">
      {#each wordBox.current.collection as item, index}
        <div 
          class="word" 
          data-index={index} 
          draggable="true" 
          on:drag={dragging} 
          on:contextmenu={deleteWord}
        >
          {item.word}
        </div>
      {/each}
      <input
        type="text"
        class="word-box-input"
        bind:value={wordBox.current.input}
        placeholder="Enter word"
        on:keypress={(e) => {
          if (e.key === 'Enter') {
            addWordBox();
          }
        }}
      >
    </div>
  </div>
  <div class="controls">
    <div class="random-word-generator">
      <div class="text-random">Add Random Words</div>
      <div class="number-of-words">
        <div class="number" on:click={generateRandomWords(1)}> <div> 1 </div></div>
        <div class="number" on:click={generateRandomWords(5)}><div> 5 </div></div>
        <div class="number" on:click={generateRandomWords(10)}><div> 10 </div></div>
        <div class="number" on:click={generateRandomWords(20)}><div> 20 </div></div>
      </div>
    </div>
    <div class="shuffle" on:click={shuffle}> <svg class="shuffle-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg> </div>
    <div class="delete" on:click={emptyArray}> <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> </div>
  </div>
</div>

<style>
  .encapsulation {
      border: 2.5px solid #b2b2b2;
      width: clamp(36rem, 14.462rem + 28.72vw, 50rem);
      height: clamp(26rem, 1.385rem + 32.82vw, 42rem);
      position: relative;
      border-radius: 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
  }
  .heading {
      font-size: clamp(2rem, 0.462rem + 2.05vw, 3rem);
      margin-left: 3rem;
      margin-top: 1.5rem;
      color: #d40094;
  } 
  .word-box {
      display: flex;
      flex-wrap: wrap;
      margin-top: -6rem;
      margin-bottom: 8rem;
      overflow-y: scroll;
  }

  .words {
      
      margin-top: 3rem;
      margin-left: 3rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width:fit-content;
  }

  .word {
      font-size: clamp(1.25rem, 0.096rem + 1.54vw, 2rem);
      margin-right: 1rem;
      text-align: center;
      margin-top: 1rem;
      background-color: #F0F8FF;
      color: #161616;
      padding: 1rem;
      border-radius: clamp(1.5rem, 0.731rem + 1.03vw, 2rem);
      cursor: pointer;
  }

  .word:hover {
      background-color: #d40094;
      color: #F0F8FF;
  }

  input {
      background-color: #161616;
      padding-top: 2rem;
      padding-bottom: 0.75rem;
      border: none;
      border-radius: 1rem;
      color: #F0F8FF;
      text-align: left;
      font-size: clamp(1.25rem, 0.096rem + 1.54vw, 2rem);
      font-family: "Annie Use Your Telescope", cursive;
      font-weight: 400;
      font-style: normal;
  }

  input:focus {
      outline: none;
  }

  .controls {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      width: 100%;
      font-size: clamp(2rem, 0.462rem + 2.05vw, 3rem);
      padding: 1rem 0;
      display: flex;
      /* justify-content: center;
      align-items: center; */
      gap: clamp(1rem, -0.538rem + 2.05vw, 2rem);
  }

  .random-word-generator {
    display: flex;
    margin-left: 1rem;
  }

  .text-random {
    background: #F0F8FF;
    color: #161616;
    padding-top: 0.75rem;
    padding: 1rem;
    border-radius: 1.5rem 0 0 1.5rem;
    font-size: clamp(1rem, -0.538rem + 2.05vw, 2rem);
    text-align: center;
  }
  .number-of-words {
    display: flex;
  }

  .number {
    padding-left: 1rem;
    padding-right: 1rem;
    border: 1px solid #F0F8FF;
    width: 3rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: clamp(1.25rem, -0.673rem + 2.56vw, 2.5rem);
    padding-top: 0.5rem;
    cursor: pointer;
  }
  
  .shuffle {
    cursor: pointer;
    /* padding-left: 2rem; */
    align-content: center;
  }

  .shuffle-icon {
    width: clamp(1.75rem, -0.173rem + 2.56vw, 3rem);
    height: auto;
    padding-top: 1rem;
  }

  .delete {
    cursor: pointer;
    /* padding-left: 2rem; */
  }

  .delete-icon {
    width: clamp(1.75rem, -0.173rem + 2.56vw, 3rem);
    height: auto;
    padding-top: 1rem;
    color: red;
  }
</style>

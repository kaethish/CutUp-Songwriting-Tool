<script>
  import { wordBox, lyrics } from "$lib/store.svelte";

  let dragHighlightContainer = false;
  let dropTarget = null;

  function enterDrag() {
    dragHighlightContainer = true;
  }
  function leaveDrag() {
    dragHighlightContainer = false;
    dropTarget = null;
  }

  function wordDrop(e, targetRowIndex) {
    e.preventDefault();
    if (wordBox.current.wordDrag) {
      const { rowIndex: sourceRowIndex, wordIndex, word } = wordBox.current.wordDrag;
      if (sourceRowIndex !== undefined && lyrics.current.rows[sourceRowIndex]) {
        lyrics.current.rows[sourceRowIndex].words.splice(wordIndex, 1);
      } else {
        wordBox.current.collection.splice(wordBox.current.wordDrag.id, 1);
      }
      lyrics.current.rows[targetRowIndex].words.push(word);
      wordBox.current.wordDrag = null;
      dropTarget = null;
    }
  }

  function wordDropAtPoint(e, targetRowIndex, targetWordIndex) {
    e.preventDefault();
    e.stopPropagation();
    if (wordBox.current.wordDrag) {
      const { rowIndex: sourceRowIndex, wordIndex, word } = wordBox.current.wordDrag;
      if (sourceRowIndex !== undefined && lyrics.current.rows[sourceRowIndex]) {
        lyrics.current.rows[sourceRowIndex].words.splice(wordIndex, 1);
      } else {
        wordBox.current.collection.splice(wordBox.current.wordDrag.id, 1);
      }
      lyrics.current.rows[targetRowIndex].words.splice(targetWordIndex, 0, word);
      wordBox.current.wordDrag = null;
      dropTarget = null;  
    }
  }

  function deleteWord(e, rowIndex, wordIndex) {
    e.preventDefault();
    lyrics.current.rows[rowIndex].words.splice(wordIndex, 1);
  }

  function dragging(e, rowIndex, wordIndex) {
    const draggedWord = {
      rowIndex,
      wordIndex,
      word: lyrics.current.rows[rowIndex].words[wordIndex]
    };
    wordBox.current.wordDrag = draggedWord;
    e.dataTransfer.setData("text/plain", draggedWord.word);
  }

  
  function handleDragOver(e, i, j) {
    e.preventDefault();
    dropTarget = { i, j };
  }

  
  function handleDragLeave(e, i, j) {
    if (dropTarget && dropTarget.i === i && dropTarget.j === j) {
      dropTarget = null;
    }
  }

  function addRow() {
    const newRow = {
      words: [],
    };

    lyrics.current.rows.push(newRow);
  }

  let lyricsForCopy = [];
  function copy() {
    for (let i = 0; i < lyrics.current.rows.length; i++) {
      let tempStrArr = lyrics.current.rows[i].words;
      let joinedStr = tempStrArr.join(' ');
      lyricsForCopy.push(joinedStr);
    }
    let finalLyrics = lyricsForCopy.join('\n');
    console.log(finalLyrics);
    navigator.clipboard.writeText(finalLyrics)
  }
</script>


<div
  class="encapsulation {dragHighlightContainer ? 'dragHighlightContainer' : ''}"
  on:dragenter={enterDrag}
  on:dragleave={leaveDrag}
>
  <div class="lyrics-heading">Lyrics
    <div class="copy"><svg class="copy-icon" on:click={copy} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></div>

  </div>
  <div class="lyrics">
    {#each lyrics.current.rows as row, i}
      


      <div
        class="row {row.words.length === 0 ? 'empty-row' : ''}"
        on:drop={(e) => wordDrop(e, i)}
        on:dragover={(e) => e.preventDefault()}
      >
        
        {#each row.words as word, j}
          <div class="words">
            <div
              class="word {dropTarget && dropTarget.i === i && dropTarget.j === j ? 'drop-highlight' : ''}"
              on:contextmenu={(e) => deleteWord(e, i, j)}
              on:drop={(e) => wordDropAtPoint(e, i, j)}
              on:dragover={(e) => handleDragOver(e, i, j)}
              on:dragleave={(e) => handleDragLeave(e, i, j)}
              draggable="true"
              on:dragstart={(e) => dragging(e, i, j)}
            >
              {word}
            </div>
          </div>
        {/each}
      </div>
    {/each}
    <div class="add-row" on:click={addRow}>Add Row</div>
  </div>
</div>


<style>
  .copy {
    margin-left: 7vw;
    margin-top: -5.5vh;
    font-size: clamp(1rem, 0.231rem + 1.03vw, 1.5rem);
    width: clamp(1.75rem, -0.173rem + 2.56vw, 3rem);
    height: auto;
    padding: 0.5rem;
  }

  .copy-icon {
    cursor: pointer;
  }

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
  /* .encapsulation.dragHighlightContainer {
    border: 3px solid #FF74D5;
  } */
  .lyrics {
    overflow: scroll;
    margin-top: -2rem;
  }
  .row {
    border-bottom: 1px solid #b2b2b2;
    margin: 0 2.5rem;
    display: flex;
    flex-wrap: wrap;
    min-height: 3rem;
    /* position: relative; */
  }

  .lyrics-heading {
    font-size: clamp(2rem, 0.462rem + 2.05vw, 3rem);
    margin-left: 3rem;
    margin-top: 1.5rem;
    color: #d40094;
    padding-bottom: clamp(2rem, 0.462rem + 2.05vw, 3rem);
  }

  .empty-row {
    padding-top: clamp(2rem, 0.462rem + 2.05vw, 3rem);
  }
  .words {
    display: flex;
    padding-bottom: 0.5rem;
  }
  .word {
    margin: 1rem 1rem 0 0;
    font-size: clamp(1.25rem, 0.096rem + 1.54vw, 2rem);
    text-align: center;
    background-color: #F0F8FF;
    color: #161616;
    padding: 1rem;
    border-radius: clamp(1.5rem, 0.731rem + 1.03vw, 2rem);
    position: relative;
    cursor: pointer;
  }
  
  .word.drop-highlight::before {
    content: "";
    position: absolute;
    left: -0.5rem;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: pink;
  }
  .word:hover {
    background-color: #d40094;
    color: #F3F3F3;
  }

  .add-row {
    text-align: center;
    background-color: #F3F3F3;
    font-size: clamp(1.75rem, 0.596rem + 1.54vw, 2.5rem);
    color: #161616;
    cursor: pointer;
    
  }
</style>

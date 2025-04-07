<script>
    import { help, wordBox } from "$lib/store.svelte";
    function exitHelp() {
        wordBox.current.help = false;
    }
</script>

<div class="help">  
    <div class="controls-help">
        <div class="exit-help" on:click={exitHelp}>X</div>
        <h1>CONTROLS</h1>
        <ul>
            <li>Type a word/phrase and press ENTER to insert a word in the word-box.</li>
            <li>Drag and drop words from the word-box to the lyrics section.</li>
        </ul>
    </div>
    <div class="features">
        <h1>UPCOMING FEATURES</h1>
        <ul>
            <li>Saving/Loading functionality, so you can work on multiple projects.</li>
            <li>Ability to type and add words in the lyrics section.</li>
            <li>A better word collection for the random word generator.</li>
        </ul>
    </div>
</div>


<style>
    .exit-help {
        text-align: right;
        cursor: pointer;
    }

    .help {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        left: 50%;
        top: 57%;
        transform: translate(-50%, -50%);
        width: 50rem;
        height:35rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.75rem;
        backdrop-filter: blur(8px);
        z-index: 1000;
        transition: filter 0.5s ease-in;
        padding-bottom: 2rem;
    }
</style>
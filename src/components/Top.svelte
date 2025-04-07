<script>
    import { help } from "$lib/store.svelte";
    import { wordBox } from "$lib/store.svelte";
    function openHelp () {
        wordBox.current.help = true;
        console.log(wordBox.current.help);
    }
</script>

<div class="top">
    <div class="logo">The Cut Up Board</div>
    <div class="controls">
        <div class="help-button" on:click={openHelp}><svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#D9D9D9"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></div>
    </div>
    <!-- <div class="song-title">
        <input class="song-name">
    </div> -->
    
</div>


<style>
    .top {
        display: flex;
        margin-top: 5rem;
        gap:2rem;
    }

    .logo {
        font-size: 3.75rem;
        color: #d40094;
        text-align: left;
    }

    input {
        background-color: #161616;
        border: none;
        border-bottom: 2px solid #6a6a6a;
        color: #F0F8FF;
        text-align: center;
        font-size: 2.5rem;
        font-family: "Annie Use Your Telescope", cursive;
		font-weight: 400;
		font-style: normal;
    }

    input:focus {
        border: none;
        border-bottom: 2px solid #F0F8ff;
        color: #F0F8FF;
    }

    .controls {
        font-size: 2rem;
        padding-bottom: 0rem;
    }

    .help-button {
        cursor: pointer;
        padding-top: 1.5rem;
    }
</style>
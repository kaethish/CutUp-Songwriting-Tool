<script>
    import WordBox from "../components/WordBox.svelte";
    import Lyrics from "../components/Lyrics.svelte";
    import Top from "../components/Top.svelte";
    
</script>

<section class="encapsulation">
    <section class="top"> 
        <Top />
    </section>
    <section class="focal">
        <section class="Lyrics">
            <Lyrics />
        </section>
        <section class="wordBox">
            <WordBox />
        </section>
    </section>
</section>

<style>
    .encapsulation {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .focal {
        display: flex;
        align-items: center;
        gap: 5rem;
        margin-top: 3rem;
    }
</style>

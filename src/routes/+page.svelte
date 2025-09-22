<script>
    import WordBox from "../components/WordBox.svelte";
    import Lyrics from "../components/Lyrics.svelte";
    import Top from "../components/Top.svelte";
    import { help, wordBox } from "$lib/store.svelte";
    import Help from "../components/Help.svelte";
</script>

<section class="encapsulation">
    <section class="composition {wordBox.current.help ? 'blur' : ''}">
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
    {#if wordBox.current.help}
        <Help />
    {/if}
</section>

<div class="mobile">
    The Cut Up Board is available only on devices with resolutions 1366 x 768 and higher.
</div>

<style>
    .encapsulation {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 90vh;
        /* flex-wrap:wrap-reverse; */
        /* max-width: fit-content; */

        @media screen and (max-width: 1365px) {
            display: none;
        }
    }

    .composition {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: visible;
        flex-wrap: wrap;

    }
    .focal {
        display: flex;
        align-items: center;
        gap: clamp(1rem, -5.154rem + 8.21vw, 5rem);
        margin-top: 3rem;
        flex-wrap: wrap;
    }

    .blur {
        filter: blur(10px);
        -webkit-filter: blur(5px);
        transition: filter 0.3s ease;
        pointer-events: none;
        user-select: none; 
    }

    .mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 2rem;

        @media screen and (min-width: 1366px) {
            display: none;
        }
    }
</style>

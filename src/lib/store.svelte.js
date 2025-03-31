import { PersistentState } from '@friendofsvelte/state';
import { LocalStorage } from './storage.svelte';

export const wordBox = new LocalStorage ("wordBox", {
    input: '',
    collection: [],
    // toggle: false,
});

export const wordDrag = $state("");


export const lyrics = new LocalStorage ("lyrics", {
    rows: [
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    {
        words: [],
    },
    

],
})
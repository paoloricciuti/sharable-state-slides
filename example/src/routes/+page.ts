import { json } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load() {
    return {
        videos: [
            {
                "title": "Rich Harris - Rethinking reactivity",
                "channel": "You Gotta Love Frontend",
                "url": "https://www.youtube.com/embed/AdNJ3fydeao",
                "id": 0
            },
            {
                "title": "Svelte in 100 Seconds",
                "channel": "Fireship",
                "url": "https://www.youtube.com/embed/rv3Yq-B8qp4",
                "id": 1
            },
            {
                "title": "Rich Harris - Annoying Things About Svelte",
                "channel": "Svelte Society",
                "url": "https://www.youtube.com/embed/dB_YjuAMH3o&t=1400s",
                "id": 2
            },
            {
                "title": "Build your own Svelte",
                "channel": "lihautan",
                "url": "https://www.youtube.com/embed/mwvyKGw2CzU",
                "id": 3
            },
            {
                "title": "Make A Typing Game With Svelte",
                "channel": "Joy of Code",
                "url": "https://www.youtube.com/embed/kMz_Ba_OF2w",
                "id": 4
            },
            {
                "title": "SvelteKit Is Never Going To Be The Same",
                "channel": "Joy of Code",
                "url": "https://www.youtube.com/embed/eVFcGA-15LA&t=587s",
                "id": 5
            },
            {
                "title": "Learn How SvelteKit Works",
                "channel": "Joy of Code",
                "url": "https://www.youtube.com/embed/VizuTy3uSNE&t=725s",
                "id": 6
            },
            {
                "title": "SvelteKit For Beginners #1 - Introduction",
                "channel": "Joy of Code",
                "url": "https://www.youtube.com/embed/bLBHecY4-ak",
                "id": 7
            },
            {
                "title": "Svelte Origins: A JavaScript Documentary",
                "channel": "OfferZen Origins",
                "url": "https://www.youtube.com/embed/kMlkCYL9qo0",
                "id": 8
            },
            {
                "title": "The Future of Svelte (Interview with Rich Harris)",
                "channel": "Vercel",
                "url": "https://www.youtube.com/embed/uQntFkK8Z54",
                "id": 9
            },
            {
                "title": "Let's write a Client-side Routing Library with Svelte",
                "channel": "lihautan",
                "url": "https://www.youtube.com/embed/3foVDSknGEY",
                "id": 10
            },
            {
                "title": "Named Layouts",
                "channel": "lihautan",
                "url": "https://www.youtube.com/embed/UHX9TJ0BxZY",
                "id": 11
            },
            {
                "title": "Svelte Tutorial for Beginners - svelte:element",
                "channel": "lihautan",
                "url": "https://www.youtube.com/embed/J4MDq3By-mg",
                "id": 12
            },
            {
                "title": "Svelte Kit Form Actions 101 - New Svelte Kit API",
                "channel": "LevelUpTuts",
                "url": "https://www.youtube.com/embed/i5zdnv83mxY",
                "id": 13
            },
            {
                "title": "10 Awesome Svelte UI Component Libraries",
                "channel": "LevelUpTuts",
                "url": "https://www.youtube.com/embed/RkD88ARvucM&t=733s",
                "id": 14
            }
        ]
    };
}
---
record: true
title: 'Init'
titleTemplate: 'Sharable state - sveltekit-search-params'
favicon: /favicon.svg
highlighter: shiki
colorSchema: 'dark'
defaults:
    theme: default
    class: to-slate-800 text-slate-100 bg-gradient-to-br from-slate-900
---

<mdi-share-variant class="text-[45rem] opacity-15 absolute top-[-10rem] left-[-10rem]"/> 
<h1 class="text-right"><logos-svelte-icon />harable state</h1>
<div class="bg-white text-black rounded-full p-3 absolute w-full right-[-50%]"><mdi-lock /> https://my.app?v=1337</div>

---

# Very cool but...who are you?

<div class="flex justify-between">

- <twemoji-waving-hand /> I'm Paolo Ricciuti
- <twemoji-flag-italy /> Mostly proudly italian
- <twemoji-man-technologist /> Full stack developer
- <logos-svelte-icon /> Svelte lover

<div class="grid gap-8">
    <img src="/me.jpg" alt="photo of Paolo Ricciuti, the author" class="rounded-full ring ring-white ring-6">
    <div class="text-center">
        <logos-twitter /> @paoloricciuti | <logos-github-icon class="bg-white rounded-full"/> @paoloricciuti <span v-click>|<br /><logos-mastodon-icon/> @paoloricciuti@frontend.social</span>
    </div>
</div>
</div>

---
layout: cover
background: /share.jpg
title: Share?
class: text-center
---

# Share?
## Isn't that what stores are for?

<!--URL uniform resource locator-->

---
title: URL
---
<div class="grid place-items-center h-full gap-8">
<p class="text-center text-3xl w-full bg-white text-black block p-3 rounded-lg relative"><mdi-lock class="absolute left-1 top-1/2 -translate-y-1/2 transform"/><span class="relative">https<url-popover v-click >protocol</url-popover></span>://<span class="relative">youtube<url-popover v-click >domain</url-popover></span><span class="relative">.com<url-popover v-click >gTLD</url-popover>/</span><span class="relative">watch<url-popover v-click >path</url-popover></span>?<span class="relative">v=dQw4w9WgXcQ<url-popover v-click>query parameter</url-popover></span><span class="relative">#wink<url-popover v-click >hash</url-popover></span></p>
<a class="max-w-100 outline outline-offset-[1rem]" href="https://www.youtube.com/watch?v=0uejy9aCNbI">
<img src="/thumbnail.jpg" alt="youbtube thumbnail for live overflow video" />
</a>
</div>

<!--
protocols: http, https, ftp, file

gTLD: global top level domain

DNS domain name system

URL uniform resource locator

-->

---

# What do we care about?

- We can't really choose the protocol
- We can buy the domain + gTLD and than that's it
- SvelteKit <logos-svelte-icon /> helps us for the path with the file based routing

<h1 v-click class="text-center my-15">The most interesting part are the query params!</h1>
---
title: How query parameters work
---
<div class="grid place-items-center h-full">
<p class="text-center text-3xl w-full bg-white text-black block p-3 rounded-lg relative"><mdi-lock class="absolute left-1 top-1/2 -translate-y-1/2 transform"/>...?v=dQw4w9WgXcQ&userId=1234&noValue</p>

```typescript{1-2|3|4-5|6-7|8-9|10-11|12-13|all}
const search=window.location.search;
console.log(search); // "?v=dQw4w9WgXcQ&userId=1234&noValue"
const searchParams = new URLSearchParams(search);
const v = searchParams.get("v");
console.log(v); // "dQw4w9WgXcQ"
const userId = searchParams.get("userId");
console.log(userId); // "1234"
const nonPresent = searchParams.get("nonPresent");
console.log(nonPresent); // null
const noValue = searchParams.get("noValue");
console.log(noValue); // ""
searchParams.set("setted", "true");
console.log(searchParams.toString()); // "v=dQw4w9WgXcQ&userId=1234&noValue=&setted=true"
```


</div>

<!--They are all strings, nonpresent return null, present without value return empty string-->
---
layout: image-left
image: /lift.gif
---

# Why lift the state up to the url?

<v-clicks>

- <twemoji-counterclockwise-arrows-button /> Keep state between refreshes
- <mdi-share-variant class="bg-[#3B88C3] rounded-sm"/> Sharable link that carries information
- <twemoji-right-arrow-curving-up /> Global state without a hassle

</v-clicks>

<h2 v-click>When <strong class="underline text-red-500">not</strong> to lift the state to the url?</h2>

<v-clicks>

- <twemoji-person /> State it's unique to the user
- <twemoji-infinity /> There's too much state (urls have a limit)
- <twemoji-repeat-button /> You can easily get it on load

</v-clicks>

<!--
The limit of the url is 2048 characters
-->
---

# But it's not reactive!

It's all very cool but we are in a world where every variable is reactive and this thing it's not usable...

<v-click>

## OR IS IT?

SvelteKit developers are not joke so we actually have a reactive version of the search params!

<v-click>

```svelte
<script>
import { page } from "$app/stores";
</script>
```
</v-click>
</v-click>

---

# Show the value of a search params

<do-or-dont>

```svelte
<script>
import { page } from "$app/stores";
let username = $page.url.searchParams.get("username");
</script>

{username}
```
</do-or-dont>

<v-click>
<do-or-dont do>

```svelte
<script>
import { page } from "$app/stores";
</script>

{$page.url.searchParams.get("username")}
```
</do-or-dont>
</v-click>

<v-click>
<do-or-dont do>

```svelte
<script>
import { page } from "$app/stores";
$: username = $page.url.searchParams.get("username");
</script>

{username}
```
</do-or-dont>
</v-click>

---

<div class="grid grid-rows-[min-content,1fr] h-full">

# Update the state - The dont's
<div class="flex flex-col justify-evenly h-full">
<do-or-dont>

```svelte
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";
</script>

<button on:click={()=>{
    $page.url.searchParams.set("username", "rich_harris")
    //this will simply not work
}}>Update username</button>
```
</do-or-dont>

<v-click>
<do-or-dont>

```svelte
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";
</script>

<button on:click={()=>{
    goto("?username=rich harris");
    //this will delete the other state
}}>Update username</button>
```
</do-or-dont>
</v-click>
</div>

</div>

---

<div class="grid grid-rows-[min-content,1fr] h-full">

# Update the state - The dont's
<div class="flex flex-col justify-evenly h-full">
<do-or-dont>

```svelte
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";
</script>

<button on:click={()=>{
    const oldQuery=new URLSearchParams($page.url.search);
    oldQuery.set("username", "rich harris");
    goto(oldQuery.toString());
    //ops you forgot to add the ? before toStringing
}}>Update username</button>
```
</do-or-dont>

<v-click>
<do-or-dont>

```svelte
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";
$: username = $page.url.searchParams.get("username");
</script>
<!--This will not work-->
<input bind:value={username} />
```
</do-or-dont>
</v-click>
</div>

</div>

---

# How to properly do it

<do-or-dont do>

```svelte
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";

$: username = $page.url.searchParams.get("username");
</script>

<input value={username} on:input={(e)=>{
    const oldQuery=new URLSearchParams($page.url.search);
    oldQuery.set("username", e.target.value);
    goto(`?${oldQuery.toString()}`, { keepFocus: true, noScroll: true });
}} />
```
</do-or-dont>

## But even then

<v-clicks>

- It's a lot of boilerplate for every new piece of state
- Every value it's a string (and it's also typed as a string)

</v-clicks>

<h2 v-click class="text-center">It doesn't have to be that way!</h2>

---
title: Drumroll
layout: cover
background: /drumroll.gif
---

<h1 class="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-800">DRUM ROLL!</h1>

---
layout: cover
title: Presenting sveltekit-search-params
background: /confetti.gif
---

<h1 class="text-center">
Presenting<br /><code>sveltekit-search-params</code><br />🎉🎉🎉</h1>
---

# What is sveltekit-search-params?

The easiest way to read an WRITE to the query params

- <twemoji-gear /> Customizable
- <logos-svelte-icon /> Reactive
- <twemoji-man-technologist /> Dev friendly
- <logos-typescript-icon /> Built with Typescript in mind
- <twemoji-pinching-hand /> Teeny tiny less than 1kb bundle

---

# How to use it?
Installation and usage

Simply install with 

`npm install sveltekit-search-params -D`

<v-click>

update your `vite.config.js` to include the ssp plugin

```typescript
import { sveltekit } from "@sveltejs/kit/vite";
import { ssp } from "sveltekit-search-params/plugin";

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [ssp(), sveltekit()],
};

export default config;
```
</v-click>
---

# How to use it? - Simple use case

```typescript
<script lang="ts">
import { queryParam } from "sveltekit-search-params";
//username is of type string
const username = queryParam("username"); 
</script>

<input bind:value={$username} />
<hr />
Username: {$username}
```
<v-click>

```typescript
<script lang="ts">
import { queryParam } from "sveltekit-search-params";
//count is of type number
const count = queryParam("count", {
    encode: (value: number) => value.toString(),
    decode: (value: string | null) => value ? parseInt(value) : null,
});
</script>

<button on:click={()=>{
    $count++;
}}>Count: {$count}</button>
```
</v-click>

---

# How to use it? - Encode/Decode helpers

```typescript
<script lang="ts">
import { ssp ,queryParam } from "sveltekit-search-params";
//isPresent is of type boolean
const isPresent = queryParam("isPresent", ssp.boolean()); 
</script>

<input type="checkbox" bind:checked={$isPresent} /> {$isPresent.toString()}
```
<v-click>

```typescript
<script lang="ts">
import { ssp ,queryParam } from "sveltekit-search-params";
//user is of type {name: string, last_name: string}
const user = queryParam("user", ssp.object<{name: string, last_name: string}>());
//$user. <- this will get autocompleted with name and last_name
</script>

{JSON.stringify($user)}
<hr />
{#if $user}
    <input bind:value={$user.name} />
    <input bind:value={$user.last_name} />
{/if}
```
</v-click>

---

# ssp - Helpers

There are six helpers all exported as functions on the object ssp.

#### object

To map from a query parameter to an object. An url like this `/?obj={"isComplex":%20true,%20"nested":%20{"field":%20"value"}}` will be mapped to

```typescript
$obj.isComplex; //true
$obj.nested; // {field: "value"}
$obj.nested.value; // "value"
```

<v-click>

#### array

To map from a query parameter to an array. An url like this `/?arr=[1,2,3,4]` will be mapped to

```typescript
$arr[0]; //1
$arr[1]; //2
$arr[2]; //3
$arr[3]; //4
```
</v-click>

---

# ssp - Helpers


#### number

To map from a query parameter to a number. An url like this `/?num=1` will be mapped to

```typescript
$num; //1
```
<v-click>

#### boolean

To map from a query parameter to a boolean. An url like this `/?bool=true` will be mapped to

```typescript
$bool; //true
```

an url like this `/?bool=false` will be mapped to

```typescript
$bool; //false
```

just like an url like this `/`

</v-click>
---

# ssp - Helpers

#### string

This is exported mainly for readability since all query parameters are already strings.

<v-click>

#### lz

To map any JSON serializable state to his lz-string representation. This is a common way to store state in query parameters that will prevent the link to directly show the state.

An url like this `/?state=N4IgbghgNgrgpiAXCAsgTwAQGMD2OoYCO8ATpgA4QkQC2cALnCSAL5A` will map to

```typescript
$state.value; //My cool query parameter
```
</v-click>

---

# Multiple query Parameters

You can also use the exported function `queryParameters` that takes an object in which the keys are the expected query parameters. This will return an object in which every key will either be the query parameter or null if the query parameter is not present. In the object there will also be every existent query parameter.

```typescript
<script lang="ts">
import { queryParameters } from "sveltekit-search-params";
const params = queryParameters({
    username: true,
});
//$params. <- will autocomplete with username of type string but you can
//also access every other query parameter present as string
</script>
```

<v-click>

```typescript
<script lang="ts">
import { ssp , queryParameters } from "sveltekit-search-params";
const params = queryParameters({
    isPresent: ssp.boolean(),
});
//$params. <- will autocomplete with isPresent of type boolean but you can
//also access every other query parameter present as string
</script>
```

</v-click>

---
layout: image
image: /coding.gif
---

---

# Thanks for your time

<div>You can find all the code for the examples and the slides at<h1 class="my-5"><logos-github-icon class="bg-white rounded-full mr-3" /><a href="https://github.com/paoloricciuti/sharable-state-slides">paoloricciuti/sharable-state-slides</a></h1></div>

<div>or a live slideshow <h1 class="my-5"><logos-netlify class="mr-3" /><a href="https://sharable-state-slides.netlify.app">https://sharable-state-slides.netlify.app</a></h1></div>

---
layout: image
image: /bow.gif
---

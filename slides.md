---
record: true
title: 'Init'
titleTemplate: 'Sharable state - sveltekit-search-params'
favicon: /favicon.svg
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
background: ./share.jpg
title: Share?
class: text-center
---

# Share?
## Isn't that what stores are for?

<!--URL uniform resource locator-->

---
title: URL
---
<div class="grid place-items-center h-full">
<p class="text-center text-3xl w-full bg-white text-black block p-3 rounded-lg relative"><mdi-lock class="absolute left-1 top-1/2 -translate-y-1/2 transform"/><span class="relative">https<url-popover v-click >protocol</url-popover></span>://<span class="relative">youtube<url-popover v-click >domain</url-popover></span><span class="relative">.com<url-popover v-click >gTLD</url-popover>/</span><span class="relative">watch<url-popover v-click >path</url-popover></span>?<span class="relative">v=dQw4w9WgXcQ<url-popover v-click>query parameter</url-popover></span><span class="relative">#wink<url-popover v-click >hash</url-popover></span></p>
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
image: https://media.giphy.com/media/xT8qBdemIGlrdIEr1S/giphy.gif
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

```typescript
<script>
import { page } from "$app/stores";
</script>
```
</v-click>
</v-click>

---

# Show the value of a search params

<do-or-dont>

```typescript
<script>
import { page } from "$app/stores";
let username = $page.url.searchParams.get("username");
</script>

{username}
```
</do-or-dont>

<v-click>
<do-or-dont do>

```typescript
<script>
import { page } from "$app/stores";
</script>

{$page.url.searchParams.get("username")}
```
</do-or-dont>
</v-click>

<v-click>
<do-or-dont do>

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
<script>
import { page } from "$app/stores";
import { goto } from "$app/navigation";

$: username = $page.url.searchParams.get("username");
</script>

<input value={username} on:input={(e)=>{
    const oldQuery=new URLSearchParams($page.url.search);
    oldQuery.set("username", e.target.value);
    goto(`?${oldQuery.toString()}`);
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
background: https://media.giphy.com/media/GBvkxysAR8Svm/giphy.gif
---

<h1 class="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-800">DRUM ROLL!</h1>

---
layout: cover
title: Presenting sveltekit-search-params
background: https://media.giphy.com/media/PMV7yRpwGO5y9p3DBx/giphy.gif
---

<h1 class="text-center">
Presenting<br /><code>sveltekit-search-params</code><br />🎉🎉🎉</h1>
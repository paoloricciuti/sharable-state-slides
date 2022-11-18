<script lang="ts">
  import Modal from "../lib/components/Modal.svelte";
  import type { PageData } from "./$types";
  import { ssp, queryParam } from "sveltekit-search-params";
  import { onMount } from "svelte";

  export let data: PageData;
  type State = {
    search: string;
    selectedId: number | null;
    showVideo: boolean;
    sort: string;
  };
  let state = queryParam("state", ssp.lz<State>());
  $: videos = data.videos
    .filter((video) =>
      video.title.toLowerCase().includes($state?.search?.toLowerCase() ?? "")
    )
    .sort((videoA, videoB) => {
      const [key, desc] = $state?.sort?.split(":") ?? "title";
      if (key === "title" || key === "channel") {
        return videoA[key].localeCompare(videoB[key]) * (!!desc ? -1 : 1);
      }
      return 0;
    });
  $: selectedVideo = videos.find((video) => video.id === $state?.selectedId);

  onMount(() => {
    if (!$state) {
      $state = {
        search: "",
        showVideo: false,
        sort: "",
        selectedId: null,
      };
    }
  });
</script>

<h1>Awesome Svelte videos!</h1>
{#if $state}
  <section>
    <input bind:value={$state.search} type="search" placeholder="search..." />
    <table>
      <thead>
        <th
          ><button
            on:click={() => {
              if ($state?.sort?.startsWith("title")) {
                if ($state?.sort === "title") {
                  $state.sort = "title:desc";
                } else {
                  $state.sort = "title";
                }
              } else {
                if ($state) $state.sort = "title";
              }
            }}
            >Title
            {#if $state?.sort?.startsWith("title")}
              {#if $state?.sort === "title"}
                🔼
              {:else}
                🔽
              {/if}
            {/if}
          </button></th
        >
        <th
          ><button
            on:click={() => {
              if ($state?.sort?.startsWith("channel")) {
                if ($state?.sort === "channel") {
                  $state.sort = "channel:desc";
                } else {
                  $state.sort = "channel";
                }
              } else {
                if ($state) $state.sort = "channel";
              }
            }}
            >Channel
            {#if $state?.sort?.startsWith("channel")}
              {#if $state?.sort === "channel"}
                🔼
              {:else}
                🔽
              {/if}
            {/if}
          </button></th
        >
      </thead>
      <tbody>
        {#each videos as video}
          <tr>
            <td>
              <button
                on:click={() => {
                  if ($state) $state.selectedId = video.id;
                }}
              >
                {video.title}
              </button>
            </td>
            <td>
              {video.channel}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <Modal
    open={$state.selectedId !== null}
    on:close={async () => {
      if ($state) {
        $state.showVideo = false;
        $state.selectedId = null;
      }
    }}
  >
    <div class="modal-details">
      <p>Title:</p>
      <p>{selectedVideo?.title}</p>
      <p>Channel name:</p>
      <p>{selectedVideo?.channel}</p>
      <button
        style="text-align: start;"
        on:click={() => {
          if ($state) $state.showVideo = !$state?.showVideo;
        }}
      >
        {#if $state?.showVideo}
          Hide video
        {:else}
          Show video
        {/if}
      </button>
      <div class="video-zone">
        {#if $state?.showVideo}
          <iframe
            src={selectedVideo?.url}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        {/if}
      </div>
    </div>
  </Modal>
{/if}

<style>
  table,
  tr,
  td {
    border-collapse: collapse;
  }
  h1 {
    text-align: center;
    margin: 3rem;
  }
  section {
    width: 80vw;
    margin: auto;
  }
  input {
    display: block;
    margin-left: auto;
    padding: 0.5rem;
    border: 0;
    background-color: #555;
    color: white;
    width: 50%;
    outline: 0;
    font-size: 1rem;
  }
  input:focus-visible {
    box-shadow: 0 -0.3rem 1rem 0 rgb(255 255 255 / 0.1);
  }
  table {
    width: 80vw;
    box-shadow: 0 1rem 2rem 0 rgb(0 0 0 / 0.7);
    table-layout: fixed;
  }
  thead {
    background-color: #555;
  }
  th {
    text-align: start;
    padding: 1rem 0.5rem;
  }
  tr {
    border-bottom: 1px solid;
  }
  td {
    padding: 0.5rem;
  }
  button {
    border: 0;
    background-color: transparent;
    text-decoration: underline;
    color: #eee;
    cursor: pointer;
    font-size: 1rem;
  }
  .modal-details {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(3, min-content) 1fr;
    gap: 1rem;
    height: 100%;
  }
  .video-zone {
    border: 10px dashed;
    grid-column: 1/-1;
    height: 100%;
    border-radius: 1rem;
    position: relative;
  }
  .video-zone:empty::after {
    content: "video zone";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }
  .video-zone > * {
    width: 100%;
    height: 100%;
  }
</style>

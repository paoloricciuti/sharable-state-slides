<script lang="ts">
  export let open: boolean;
  let dialog: HTMLDialogElement;
  $: {
    if (dialog) {
      if (open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }
</script>

<dialog on:close bind:this={dialog}>
  <slot />
</dialog>

<style>
  dialog {
    margin: auto;
    min-width: 50vw;
    height: 50vh;
    border-radius: 0.5rem;
    border: 0;
    background-color: #333;
    box-shadow: 0 0 1rem 0 rgb(0 0 0 / 0.7);
    color: white;
    padding: 1rem;
  }
  ::backdrop {
    background-color: #0007;
  }
</style>

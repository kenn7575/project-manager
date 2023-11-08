<script>
  import { errorStore } from "../stores/errorStore";
</script>

{#if $errorStore && $errorStore.length > 0}
  <div class="absolute left-0 right-0 z-50 p-4 flex flex-col gap-2">
    {#each $errorStore as error, index}
      <div class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>{error.message}</span>
        <div>
          <button
            class="btn btn-ghost"
            on:click={() => {
              const newList = $errorStore.filter((_, i) => i !== index);
              $errorStore = newList;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24
          "
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              /></svg
            >
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}

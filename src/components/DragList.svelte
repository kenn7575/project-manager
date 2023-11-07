<script lang="ts">
  import { dropzone, draggable } from "../functions/dragAndDrop";
  export let data: any;
  const priorityColors = ["success", "info", "warning", "error"];
  import Task from "./Task.svelte";
</script>

<ul class="list-none m-0 px-8 flex gap-4 box-border">
  {#each data.columns as column}
    {@const cards = data.cards.filter((c) => c.column === column.id)}
    <li
      class="column p-4 w-1/4 h-96 max-h-full bg-base-200 rounded-lg border border-neutral-300 outline-info"
      use:dropzone={{
        on_dropzone(card_id) {
          const card = data.cards.find((c) => c.id === card_id);
          card.column = column.id;
          data = data;
        },
      }}
    >
      <h2 class="mb-4 font-bold">{column.label}</h2>
      {#if cards.length > 0}
        <ul class="cards flex flex-col gap-2">
          {#each cards as card}
            <li
              class={`p-4 bg-neutral rounded-lg border border-neutral-300 bg-[${
                priorityColors[card.priority]
              }]`}
              use:draggable={card.id}
            >
              <Task {card} />
            </li>
          {/each}
        </ul>
      {:else}
        <p>No Cards...</p>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .column:global(.droppable) {
    outline-style: dashed;
    outline-width: 2px;
    outline-offset: 4px;
  }
  .column:global(.droppable) * {
    pointer-events: none;
  }
</style>

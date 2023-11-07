<script lang="ts">
  const priorityColors = ["success", "info", "warning", "error"];
  export let card: TaskType;
  import type { TaskType } from "../types/task";
  import { draggable } from "../functions/dragAndDrop";
</script>

<div class="flex flex-col">
  {card.title}
  <div class="flex items-center gap-1">
    <p>Priority</p>
    <div class="dropdown">
      {#if card.priority == 0}
        <label tabindex="0" class={`btn btn-success m-1`}>Low</label>
      {:else if card.priority == 1}
        <label tabindex="0" class={`btn btn-warning m-1`}>Medium</label>
      {:else if card.priority == 2}
        <label tabindex="0" class="btn btn-warning bg-orange-400 m-1"
          >High</label
        >
      {:else if card.priority == 3}
        <label tabindex="0" class="btn btn-error m-1">Very High</label>
      {/if}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            on:click={() => {
              card.priority = 0;
            }}
            >Low
          </button>
        </li>
        <li>
          <button
            on:click={() => {
              card.priority = 1;
            }}
            >Medium
          </button>
        </li>
        <li>
          <button
            on:click={() => {
              card.priority = 2;
            }}
            >High
          </button>
        </li>
        <li>
          <button
            on:click={() => {
              card.priority = 3;
            }}
            >Very High
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

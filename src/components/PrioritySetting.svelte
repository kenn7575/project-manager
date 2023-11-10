<script lang="ts">
  import type { TaskType } from "../types/task";
  export let task;
</script>

<div class="flex justify-between !m-0">
  <p>Priority</p>
  <div class="dropdown">
    {#if task.priority == -1}
      <label tabindex="0" class={`btn w-28 btn-sm btn-ghost m-1`}>None</label>
    {:else if task.priority == 0}
      <label tabindex="0" class={`btn w-28 btn-sm btn-success m-1`}>Low</label>
    {:else if task.priority == 1}
      <label tabindex="0" class={`btn w-28 btn-sm btn-warning m-1`}
        >Medium</label
      >
    {:else if task.priority == 2}
      <label
        tabindex="1"
        class="btn w-28 btn-sm btn-warning bg-orange-400 m-1 border-orange-400 hover:bg-orange-400 hover:border-orange-400"
        >High</label
      >
    {:else if task.priority == 3}
      <label tabindex="0" class="btn w-28 btn-sm btn-error m-1">Very High</label
      >
    {/if}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
    >
      <li>
        <button
          class=""
          on:click={() => {
            task.priority = -1;
          }}
          >None
        </button>
        <button
          class="text-success"
          on:click={() => {
            task.priority = 0;
          }}
          >Low
        </button>
      </li>
      <li>
        <button
          class="text-warning"
          on:click={() => {
            task.priority = 1;
          }}
          >Medium
        </button>
      </li>
      <li>
        <button
          class="text-orange-400"
          on:click={() => {
            task.priority = 2;
          }}
          >High
        </button>
      </li>
      <li>
        <button
          class="text-error"
          on:click={() => {
            task.priority = 3;
          }}
          >Very High
        </button>
      </li>
    </ul>
  </div>
</div>

<script lang="ts">
  const priorityColors = ["success", "info", "warning", "error"];
  export let task: TaskType;
  import type { TaskType } from "../types/task";
  import { draggable } from "../functions/dragAndDrop";
</script>

<div class="flex flex-col w-full">
  {task.title}
  <div class="flex items-center gap-1">
    <p>Priority</p>
    <div class="dropdown">
      {#if task.priority == 0}
        <label tabindex="0" class={`btn btn-success m-1`}>Low</label>
      {:else if task.priority == 1}
        <label tabindex="0" class={`btn btn-warning m-1`}>Medium</label>
      {:else if task.priority == 2}
        <label tabindex="0" class="btn btn-warning bg-orange-400 m-1"
          >High</label
        >
      {:else if task.priority == 3}
        <label tabindex="0" class="btn btn-error m-1">Very High</label>
      {/if}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li>
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
</div>

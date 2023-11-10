<script lang="ts">
  export let task: TaskType;
  import type { TaskType } from "../types/task";
</script>

<div class="flex flex-col w-full">
  {task.title}
  <div class="flex items-center justify-between gap-1">
    <p>Priority</p>

    {#if task.priority == -1}
      <div class="badge gap-2">None</div>
    {:else if task.priority == 0}
      <div class="badge badge-success gap-2">Low</div>
    {:else if task.priority == 1}
      <div class="badge badge-warning gap-2">Medium</div>
    {:else if task.priority == 2}
      <div
        class="badge badge-warning bg-orange-400 m-1 border-orange-400 hover:bg-orange-400 hover:border-orange-400 gap-2"
      >
        High
      </div>
    {:else if task.priority == 3}
      <div class="badge badge-error gap-2">Very High</div>
    {/if}
  </div>
</div>

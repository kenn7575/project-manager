<script lang="ts">
  import type { TaskType } from "../types/task";

  export let modal;

  export let task: TaskType;

  let shadowTask = { ...task };

  import PrioritySetting from "./PrioritySetting.svelte";

  //create event dispatcher
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  //displatch delete column enevt
  function update() {
    task = { ...shadowTask };
    if (task.title == "") task.title = "Untitled";
    dispatch("update", task.id);
  }

  function deleteTask() {
    dispatch("delete", task.id);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  id={task.id + "_editModal"}
  class="modal"
  bind:this={modal}
  on:click={(e) => e.target == modal && modal?.close()}
>
  <div class="modal-box w-4/5 h-3/5 p-16 relative">
    {#if shadowTask.title != ""}
      <h3 class="font-bold text-lg">{shadowTask.title}</h3>
    {:else}
      <h3 class="font-bold text-lg opacity-40">Untitled</h3>
    {/if}

    <div class="modal-action w-full flex flex-col">
      <div class="flex justify-start flex-col items-center">
        <p class="text-start w-full mb-2">Name</p>
        <input
          bind:value={shadowTask.title}
          type="text"
          placeholder="Title"
          class="input input-bordered w-full placeholder:opacity-50"
        />
      </div>

      <div class="flex justify-start items-center flex-col !ml-0 mt-4">
        <p class="text-start w-full mb-2">Description</p>
        <input
          bind:value={shadowTask.description}
          type="text"
          placeholder="Description"
          class="input input-bordered w-full placeholder:opacity-50"
        />
      </div>
      <div class="divider my-4" />
      <PrioritySetting bind:task={shadowTask} />
      <div class="flex" />
    </div>
    <form method="dialog" class="absolute right-1/2 translate-x-1/2 bottom-4">
      <div class="join">
        <button
          class="btn btn-outline join-item"
          on:click={() => (shadowTask = { ...task })}>Cancel</button
        >
        <button class="btn btn-error join-item" on:click={deleteTask}>
          Delete
        </button>
        <button class="btn btn-primary join-item" on:click={update}
          >Update</button
        >
      </div>
    </form>
  </div>
</dialog>

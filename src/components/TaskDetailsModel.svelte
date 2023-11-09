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
    dispatch("update", task.id);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  id="my_modal_1"
  class="modal"
  bind:this={modal}
  on:click={(e) => e.target == modal && modal?.close()}
>
  <div class="modal-box w-4/5 h-3/6 p-16">
    <h3 class="font-bold text-lg">{shadowTask.title}</h3>

    <div class="modal-action w-full flex flex-col">
      <div class="flex justify-between items-center">
        <p>Name</p>
        <input
          bind:value={shadowTask.title}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="divider my-4" />
      <PrioritySetting bind:task={shadowTask} />
      <div class="flex" />
    </div>
    <form method="dialog" class="flex gap-5">
      <button
        class="btn btn-error mt-8 mr-4"
        on:click={() => (shadowTask = { ...task })}>Cancel</button
      >
      <button class="btn btn-primary mt-8" on:click={update}>Update</button>
    </form>
  </div>
</dialog>

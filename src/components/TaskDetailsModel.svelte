<script lang="ts">
  import type { TaskType } from "../types/task";

  export let modal;

  export let task: TaskType;

  //create event dispatcher
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  //displatch delete column enevt
  function update() {
    dispatch("update", task.id);
  }
</script>

<dialog id="my_modal_1" class="modal" bind:this={modal}>
  <div class="modal-box w-4/5 h-3/6 p-16">
    <h3 class="font-bold text-lg">{task.title}</h3>
    <p>Edit task</p>
    <div class="modal-action w-full justify-center flex">
      <div class="flex justify-between w-full">
        <p>Priority</p>
        <div class="dropdown">
          {#if task.priority == 0}
            <label tabindex="0" class={`btn w-28 btn-sm btn-success m-1`}
              >Low</label
            >
          {:else if task.priority == 1}
            <label tabindex="0" class={`btn w-28 btn-sm btn-warning m-1`}
              >Medium</label
            >
          {:else if task.priority == 2}
            <label
              tabindex="0"
              class="btn w-28 btn-sm btn-warning bg-orange-400 m-1 border-orange-400 hover:bg-orange-400 hover:border-orange-400"
              >High</label
            >
          {:else if task.priority == 3}
            <label tabindex="0" class="btn w-28 btn-sm btn-error m-1"
              >Very High</label
            >
          {/if}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <button
                class="text-success"
                on:click={() => {
                  task.priority = 0;
                  update();
                }}
                >Low
              </button>
            </li>
            <li>
              <button
                class="text-warning"
                on:click={() => {
                  task.priority = 1;
                  update();
                }}
                >Medium
              </button>
            </li>
            <li>
              <button
                class="text-orange-400"
                on:click={() => {
                  task.priority = 2;
                  update();
                }}
                >High
              </button>
            </li>
            <li>
              <button
                class="text-error"
                on:click={() => {
                  task.priority = 3;
                  update();
                }}
                >Very High
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

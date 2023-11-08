<script lang="ts">
  import { dropzone, draggable } from "../functions/dragAndDrop";
  import type { ProjectType } from "../types/project";
  export let data: ProjectType;
  let EditModeColumn: string;
  let newLabel: string;

  import { setDocument } from "../functions/firebase";
  function isProjectDataValid(dataToUpdate: ProjectType) {
    if (!dataToUpdate.title) return false;
    if (!dataToUpdate.dateCreated) return false;
    if (!dataToUpdate.tasks) return false;
    if (dataToUpdate.tasks?.length == 0) return false;
    if (!dataToUpdate.columns) return false;
    if (dataToUpdate.columns?.length == 0) return false;
    if (!dataToUpdate.users) return false;
    if (dataToUpdate.users?.length == 0) return false;
    return true;
  }
  // Add a new document in collection "cities"
  async function update(dataToUpdate) {
    if (!isProjectDataValid(dataToUpdate)) {
    }
    await setDocument("projects/" + data.id, {
      title: dataToUpdate.title,
      dateCreated: dataToUpdate.dateCreated,
      tasks: dataToUpdate.tasks,
      columns: dataToUpdate.columns,
      users: dataToUpdate.users,
    });
  }
  // $: updateDocument("projects", removeRef(data));
  $: console.log("updating"), data;
  $: update(data);

  function addColumn() {
    //find last id
    const lastId = data.columns[data.columns.length - 1].id;
    data.columns.push({
      id: lastId + 1,
      label: "Untitled",
      dateCreated: new Date(),
    });
    data = data;
  }
  function removeColumn(id) {
    //check if there are tasks in the column
    const tasks = data.tasks.filter((c) => c.columnId == id);
    if (tasks.length > 0)
      return alert(
        "There are tasks in this column, please move them before deleting the column"
      );
    //remove column
    data.columns = data.columns.filter((c) => c.id != id);
    data = data;
  }

  const priorityColors = ["success", "info", "warning", "error"];
  import Task from "./Task.svelte";
</script>

<ul class="list-none m-0 px-8 flex gap-4 box-border items-start">
  {#each data.columns as column}
    {@const tasks = data.tasks.filter((c) => c.columnId == column.id)}
    <li
      class="column p-4 w-72 h-96 max-h-full bg-base-200 rounded-lg border border-neutral-300 outline-info relative group"
      use:dropzone={{
        on_dropzone(task_id) {
          const task = data.tasks.find((c) => c.id == task_id);
          task.columnId = column.id;
          data = data;
        },
      }}
    >
      <div
        class="dropdown dropdown-bottom dropdown-end dropdown-hover absolute right-0 top-0 opacity-0 group-hover:opacity-100 duration-500 z-50"
        class:hidden={EditModeColumn == column.id}
      >
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn m-1"
          ><i class="fa-solid fa-ellipsis" /></label
        >
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
        >
          <li>
            <button
              class="text-error hover:bg-error hover:text-error-content"
              on:click={() => {
                removeColumn(column.id);
              }}
            >
              <i class="fa-solid fa-trash" /> Delete
            </button>
          </li>
          <li>
            <button
              class="hover:bg-info hover:text-info-content"
              on:click={() => {
                EditModeColumn = column.id;
                newLabel = column.label;
              }}
            >
              <i class="fa-solid fa-pen" /> Rename
            </button>
          </li>
        </ul>
      </div>
      {#if EditModeColumn != column.id}
        <h2 class="mb-4 font-bold">{column.label}</h2>
      {:else}
        <form
          on:submit={() => {
            EditModeColumn = null;
            column.label = newLabel;
          }}
        >
          <div class="join">
            <input
              class="input input-bordered mb-4 join-item"
              type="text"
              placeholder="New project"
              bind:value={newLabel}
            />
            <button type="submit" class="btn join-item btn-neutral">
              <i class="fa-solid fa-pen" />
            </button>
          </div>
        </form>
      {/if}
      {#if tasks.length > 0}
        <ul class="cards flex flex-col gap-2">
          {#each tasks as task (task.id)}
            <li
              class={`p-4 bg-neutral rounded-lg border border-neutral-300 bg-[${
                priorityColors[task.priority]
              }]`}
              use:draggable={task.id}
            >
              <Task bind:task />
            </li>
          {/each}
        </ul>
      {:else}
        <p>No Tasks...</p>
      {/if}
    </li>
  {/each}
  <button class="" on:click={addColumn}>add column</button>
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

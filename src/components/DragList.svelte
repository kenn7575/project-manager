<script lang="ts">
  import { dropzone, draggable } from "../functions/dragAndDrop";
  import type { ProjectType } from "../types/project";
  export let data: ProjectType;
  import { errorStore } from "../stores/errorStore";
  import { setDocument } from "../functions/firebase";
  let EditModeColumn: string;
  let newLabel: string;
  import TaskDetailsModel from "./TaskDetailsModel.svelte";
  let taskDetailsModal;

  $: update(data);

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
    if (tasks.length > 0) {
      errorStore.update((e) => {
        const message = [
          ...e,
          { message: "You can't delete a column with tasks in it" },
        ];

        return message;
      });
      return;
    }

    //remove column
    data.columns = data.columns.filter((c) => c.id != id);
    data = data;
  }
  function removeTask(id) {
    data.tasks = data.tasks.filter((c) => c.id != id);
    data = data;
  }
  function addTask(columnId) {
    //find last id
    const lastId = data.tasks[data.tasks.length - 1].id;
    data.tasks.push({
      id: lastId + 1,
      title: "Untitled",
      columnId,
      priority: 0,
      dateCreated: new Date(),
      description: "",
    });
    data = data;
  }

  const priorityColors = ["success", "info", "warning", "error"];
  import Task from "./Task.svelte";
  import ColumnMenu from "./ColumnMenu.svelte";
</script>

<ul class="list-none m-0 px-8 flex gap-4 box-border items-start p-2">
  {#each data.columns as column}
    {@const tasks = data.tasks.filter((c) => c.columnId == column.id)}
    <li
      class="column p-4 w-72 min-h-[24rem] min-w-[18rem] bg-base-200 rounded-lg border border-neutral-300 outline-info relative group"
      use:dropzone={{
        on_dropzone(task_id) {
          const task = data.tasks.find((c) => c.id == task_id);
          task.columnId = column.id;
          data = data;
        },
      }}
    >
      <ColumnMenu
        bind:EditModeColumn
        bind:column
        on:deleteColumn={() => {
          removeColumn(column.id);
        }}
        on:renameColumn={(e) => {
          newLabel = e.detail.label;
          EditModeColumn = e.detail.id;
        }}
      />
      <!-- show col name or text field to edit it -->
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
            <!-- uses to show details for a specific task when clicked -->
            <TaskDetailsModel bind:modal={taskDetailsModal} bind:task />

            <li
              class={` bg-neutral relative rounded-lg border border-neutral-300 bg-[${
                priorityColors[task.priority]
              }]`}
              use:draggable={task.id}
            >
              <button
                class="p-4 w-full"
                on:click={() => taskDetailsModal.showModal()}
              >
                <Task bind:task />
              </button>
            </li>
          {/each}
        </ul>
      {/if}
      <button
        class="w-full btn-ghost p-1 rounded-md text-start font-light text-base-content/80 mt-2"
        on:click={() => {
          addTask(column.id);
        }}
      >
        <i class="fa-solid fa-plus" />
        New
      </button>
    </li>
  {/each}
  <div class="flex flex-col">
    <div class="divider m-0 items-start" />
    <button
      class="min-w-[18rem] text-start font-light text-base-content/80"
      on:click={addColumn}
    >
      <i class="fa-solid fa-plus" />
      Add column</button
    >
  </div>
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

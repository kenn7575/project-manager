<script lang="ts">
  import { dropzone, draggable } from "../functions/dragAndDrop";
  import type { ProjectType } from "../types/project";
  export let data: ProjectType;
  import { db } from "../functions/firebase";
  import { setDocument } from "../functions/firebase";

  import { doc, setDoc } from "firebase/firestore";

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
  $: console.log(data);
  $: try {
    update(data);
  } catch (error) {
    console.log(error);
  }

  const priorityColors = ["success", "info", "warning", "error"];
  import Task from "./Task.svelte";
</script>

<ul class="list-none m-0 px-8 flex gap-4 box-border">
  {#each data.columns as column}
    {@const tasks = data.tasks.filter((c) => c.columnId == column.id)}
    <li
      class="column p-4 w-1/4 h-96 max-h-full bg-base-200 rounded-lg border border-neutral-300 outline-info"
      use:dropzone={{
        on_dropzone(task_id) {
          const task = data.tasks.find((c) => c.id == task_id);
          task.columnId = column.id;
          data = data;
        },
      }}
    >
      <h2 class="mb-4 font-bold">{column.label}</h2>
      {#if tasks.length > 0}
        <ul class="cards flex flex-col gap-2">
          {#each tasks as task (task.id)}
            <li
              class={`p-4 bg-neutral rounded-lg border border-neutral-300 bg-[${
                priorityColors[task.priority]
              }]`}
              use:draggable={task.id}
            >
              <Task {task} />
            </li>
          {/each}
        </ul>
      {:else}
        <p>No Tasks...</p>
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

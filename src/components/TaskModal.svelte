<script lang="ts">
  import TaskDetailsModel from "./TaskDetailsModel.svelte";
  import Task from "./Task.svelte";

  import { draggable } from "../functions/dragAndDrop";
  import type { TaskType } from "../types/task";
  import type { ProjectType } from "../types/project";
  import { updateDocument } from "../functions/firebase";

  let editModal;
  const priorityColors = ["success", "info", "warning", "error"];

  export let task: TaskType;
  export let project: ProjectType;
  let shadowProject = { ...project };

  function update(task) {
    const index = shadowProject.tasks.findIndex((t) => t.id == task.id);
    shadowProject.tasks[index] = task;
    updateDocument("projects/" + project.id, shadowProject);
  }
  function deleteTask(task) {
    const index = shadowProject.tasks.findIndex((t) => t.id == task.id);
    shadowProject.tasks.splice(index, 1);
    updateDocument("projects/" + project.id, shadowProject);
  }
</script>

<TaskDetailsModel
  bind:modal={editModal}
  bind:task
  on:update={() => {
    update(task);
    editModal.close();
  }}
  on:delete={() => {
    deleteTask(task);
    editModal.close();
  }}
/>

<li
  class={` bg-neutral relative rounded-lg border hover:bg-slate-600 border-neutral-300 bg-[${
    priorityColors[task.priority]
  }]`}
  use:draggable={task.id}
>
  <button class="p-4 w-full" on:click={() => editModal.showModal()}>
    <Task bind:task />
  </button>
</li>

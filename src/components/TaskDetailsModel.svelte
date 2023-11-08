<script lang="ts">
  import type { TaskType } from "../types/task";

  export let modal;

  export let task: TaskType;
</script>

<dialog id="my_modal_1" class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">{task.title}</h3>
    <p>Edit task</p>
    <div class="modal-action w-full justify-center flex">
      <!-- todo: add edit content here -->
      <button class="btn btn-primary">edit something</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

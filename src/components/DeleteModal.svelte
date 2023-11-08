<script>
    export let modal
    export let project

    import { deleteDocument } from '../functions/firebase'
</script>

<dialog id="editModal" class="modal" bind:this={modal}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{project.title}</h3>
    <p>Er du sikker på at du vil slette {project.title}?</p>
    <div class="modal-action">
      <form method="dialog" class="flex gap-5">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
        <button on:click={() => deleteDocument(`projects/${project.id}`)} class="btn btn-error">Delete</button>
      </form>
    </div>
  </div>
</dialog>
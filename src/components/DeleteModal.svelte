<script>
    export let modal
    export let project
</script>

<dialog id="editModal" class="modal" bind:this={modal}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{project.title}</h3>
    <p>Er du sikker på at du vil slette {project.title}?</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
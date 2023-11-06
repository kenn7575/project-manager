<script>
    export let modal
    export let project
</script>

<dialog id="editModal" class="modal" bind:this={modal}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{project.title}</h3>
    <input type="text" class="input input-bordered" placeholder="Project title" value={project.title} />
    <input type="text" class="input input-bordered" placeholder="Project description" value={project.description ?? null} />
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<script lang="ts">
    import { updateDocument } from "../functions/firebase"
    import type { ProjectType } from "../types/project"

    export let modal: HTMLDialogElement
    export let project: ProjectType
</script>

<dialog id="editModal" class="modal" bind:this={modal}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{project.title}</h3>
    <input type="text" class="input input-bordered" placeholder="Project title" bind:value={project.title} />
    <input type="text" class="input input-bordered" placeholder="Project description" bind:value={project.description} />
    <li>
      {#each project.users as user}
        <p>{user}</p>
      {/each}
    </li>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
        <button on:click={() => updateDocument("projects/" + project.id, project)} class="btn btn-info">Confirm</button>
      </form>
    </div>
  </div>
</dialog>

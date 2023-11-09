<script lang="ts">
    import { updateDocument } from "../functions/firebase"
    import type { ProjectType } from "../types/project"

    export let modal: HTMLDialogElement
    export let project: ProjectType

  import { getCollection } from "../functions/firebase";
</script>

<dialog id="editModal" class="modal" bind:this={modal}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{project.title}</h3>
    <input type="text" class="input input-bordered" placeholder="Project title" bind:value={project.title} />
    <input type="text" class="input input-bordered" placeholder="Project description" bind:value={project.description} />
    <li class="flex gap-3">
      {#await getCollection('users')}
        <p>Loading</p>
        {:then users}
          {#each users as user}
            {#if project.users.includes(user.id)}
              <div class="badge badge-neutral flex gap-2">
                <p>{user.name}</p>
                <button on:click={() => {
                  project.users = project.users.filter((u) => u !== user.id)
                }}><i class="fas fa-x fa-2xs" /></button>
              </div>
            {/if}
          {/each}
      {/await}
    </li>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
        <button on:click={() => updateDocument("projects/" + project.id, project)} class="btn btn-info">Confirm</button>
      </form>
    </div>
  </div>
</dialog>

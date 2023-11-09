<script lang="ts">
    import { deleteDocument, updateDocument } from "../functions/firebase"
    import type { ProjectType } from "../types/project"

    export let modal: HTMLDialogElement
    export let project: ProjectType
    let projectChanges = {...project}

  import { getCollection } from "../functions/firebase";

  function updateProject() {
    if (projectChanges.users.length <= 0) deleteDocument("projects/" + project.id)
    else updateDocument("projects/" + project.id, projectChanges)
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog id="editModal" class="modal backdrop-blur-sm" bind:this={modal} on:click={(e) => e.target == modal && modal?.close()}>
  <div class="modal-box flex flex-col gap-5">
    <h3 class="font-bold text-lg">{projectChanges.title}</h3>
    <input type="text" class="input input-bordered" placeholder="Project title" bind:value={projectChanges.title} />
    <input type="text" class="input input-bordered" placeholder="Project description" bind:value={projectChanges.description} />
    <li class="flex gap-3">
      {#await getCollection('users')}
        <p>Loading</p>
        {:then users}
          {#each users as user}
            {#if projectChanges.users.includes(user.id)}
              <div class="badge badge-neutral flex gap-2">
                <p>{user.name}</p>
                <button on:click={() => {
                  projectChanges.users = projectChanges.users.filter((u) => u !== user.id)
                }}><i class="fas fa-x fa-2xs" /></button>
              </div>
            {/if}
          {/each}
      {/await}
    </li>
    <div class="modal-action">
      <form method="dialog">
        <button on:click={() => projectChanges = {...project}} class="btn">Cancel</button>
        <button on:click={updateProject} class="btn btn-info">Confirm</button>
      </form>
    </div>
  </div>
</dialog>

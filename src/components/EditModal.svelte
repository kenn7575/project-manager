<script lang="ts">
    import { deleteDocument, updateDocument } from "../functions/firebase"
    import type { ProjectType } from "../types/project"

    export let modal: HTMLDialogElement
    export let project: ProjectType
    let projectChanges = { ...project }

    import { getCollection } from "../functions/firebase"

    function updateProject() {
        if (projectChanges.users.length <= 0)
            deleteDocument("projects/" + project.id)
        else {
            if (projectChanges.title == "") projectChanges.title = "Untitled"
            updateDocument("projects/" + project.id, projectChanges)
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    id="editModal"
    class="modal"
    bind:this={modal}
    on:click={(e) => e.target == modal && modal?.close()}
>
    <!-- class="modal backdrop-blur-sm" -->
    <div class="modal-box flex flex-col gap-5">
        {#if projectChanges.title != ""}
            <h3 class="font-bold text-lg">{projectChanges.title}</h3>
        {:else}
            <h3 class="font-bold text-lg opacity-40">Untitled</h3>
        {/if}
        <input
            type="text"
            class="input input-bordered placeholder:opacity-50"
            placeholder="Project title"
            bind:value={projectChanges.title}
        />
        <input
            type="text"
            class="input input-bordered placeholder:opacity-50"
            placeholder="Project description"
            bind:value={projectChanges.description}
        />
        <div class="flex gap-6 text-sm font-medium mt-2">
            <div class="indicators">
                <div class="badge badge-info" />
                <p>Tilføjet</p>
            </div>
            <div class="indicators">
                <div class="badge badge-neutral" />
                <p>Kan tilføjes</p>
            </div>
        </div>
        <li class="flex flex-wrap gap-3">
            {#await getCollection("users")}
                <p>Loading</p>
            {:then users}
                {#each users as user}
                    {#if projectChanges.users.includes(user.id)}
                        <div class="badge badge-info flex gap-2">
                            <p>{user.name}</p>
                            <button
                                on:click={() => {
                                    projectChanges.users =
                                        projectChanges.users.filter(
                                            (u) => u !== user.id
                                        )
                                }}
                                ><i class="fas fa-x fa-2xs" />
                            </button>
                        </div>
                    {:else}
                        <div class="badge badge-neutral flex gap-2">
                            <p>{user.name}</p>
                            <button
                                on:click={() => {
                                    projectChanges.users = [
                                        ...projectChanges.users,
                                        user.id,
                                    ]
                                }}
                                ><i class="fas fa-plus fa-2xs" />
                            </button>
                        </div>
                    {/if}
                {/each}
            {/await}
        </li>
        <div class="modal-action mt-4">
            <form method="dialog" class="flex gap-5">
                <button
                    on:click={() => (projectChanges = { ...project })}
                    class="btn">Cancel</button
                >
                <button on:click={updateProject} class="btn btn-info"
                    >Confirm</button
                >
            </form>
        </div>
    </div>
</dialog>

<style>
    .indicators {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .indicators > div {
        @apply border-base-content badge-xs;
    }
</style>
